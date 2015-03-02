/**
 * Created by Marcela on 1. 3. 2015.
 */
///<reference path="list.ts" />
///<reference path="../typing/jquery.d.ts" />
var AwesomeTreeView;
(function (AwesomeTreeView) {
    /*
    * This class is responsible for initializing plugin,
    * setting defaults and custom options
    * and rendering plugin component
    * */
    var TreeView = (function () {
        function TreeView(element, options) {
            // implement interface and set defaults
            this.icon = true;
            this.expandAll = false;
            this.checkboxes = false;
            this.uniqueOnOpen = false;
            this.animation = true;
            this.branches = false;
            this.element = element;
            this.element.addClass("awesome-tree-view");
            // merge custom settings with plugin defaults
            $.extend(this, options);
        }
        // call List class to render tree view
        TreeView.prototype.render = function () {
            var list = new AwesomeTreeView.List(this);
        };
        return TreeView;
    })();
    AwesomeTreeView.TreeView = TreeView;
})(AwesomeTreeView || (AwesomeTreeView = {}));
(function ($) {
    $.fn.treeview = function () {
        var option = arguments[0], args = arguments;
        return this.each(function () {
            var $this = $(this), data = $this.data("jquery.treeview"), options = $.extend({}, $.fn.treeview.defaults, $this.data(), typeof option === 'object' && option);
            if (!data) {
                $this.data("jquery.treeview", (data = new AwesomeTreeView.TreeView($this, options)));
            }
            if (typeof option === 'string') {
                data[option](args[1]);
            }
            else {
                data.render();
            }
        });
    };
    $.fn.treeview.defaults = {};
})(jQuery);
/**
 * Created by Marcela on 1. 3. 2015.
 */
///<reference path="treeview.ts" />
///<reference path="../typing/jquery.d.ts" />
var AwesomeTreeView;
(function (AwesomeTreeView) {
    /*
    * This class implements expanding and collapsing events
    * */
    var ListEvent = (function () {
        function ListEvent(element, treeView) {
            var _this = this;
            this.treeView = treeView;
            this.element = element;
            this.element.on('click', 'img,i.fa', function (e) { return _this.toggleList(e); });
        }
        // expand/collapse li elements
        ListEvent.prototype.toggleList = function (e) {
            var $icon = $(e.target), liElement = $icon.parent();
            if (liElement.attr("data-list-type") === "folder") {
                this.toggleIconFolder($icon);
            }
            else {
                this.toggleArrow(liElement);
            }
            if (this.treeView.animation) {
                liElement.find("> ul > li").slideToggle();
            }
            else {
                liElement.find("> ul > li").toggle();
            }
        };
        // set appropriate icon
        ListEvent.prototype.toggleIconFolder = function (img) {
            img.toggleClass("state-open");
            img.toggleClass("state-close");
            if (img.hasClass("state-open")) {
                img.attr("src", "/../icon/folder_open.png");
            }
            else {
                img.attr("src", "/../icon/directory.png");
            }
        };
        // set appropriate arrow
        ListEvent.prototype.toggleArrow = function (element) {
            var arrow = element.find("> i.fa");
            if (arrow) {
                arrow.toggleClass("fa-angle-right");
                arrow.toggleClass("fa-angle-down");
            }
        };
        return ListEvent;
    })();
    AwesomeTreeView.ListEvent = ListEvent;
})(AwesomeTreeView || (AwesomeTreeView = {}));
/**
 * Created by Marcela on 1. 3. 2015.
 */
///<reference path="treeview.ts" />
///<reference path="listevent.ts" />
///<reference path="../typing/jquery.d.ts" />
var AwesomeTreeView;
(function (AwesomeTreeView) {
    /*
    * This class is responsible for modifying unordered DOM list
    * according to settings, adding expanding and collapsing identificators
    * and registering event handlers
    * */
    var List = (function () {
        function List(treeView) {
            this.treeView = treeView;
            this.element = this.treeView.element;
            this.render();
            // add event handlers
            var events = new AwesomeTreeView.ListEvent(this.element, this.treeView);
        }
        // render list items for each list element and set initial state
        // (only root elements are shown, other elements are hidden)
        List.prototype.render = function () {
            var _this = this;
            this.element.each(function (id, it) { return _this.renderList(it); });
            this.initialState();
        };
        // render each li element, set icon or arrow indicator for expanding and collapsing
        List.prototype.renderList = function (item) {
            var _this = this;
            $(item).find("li").each(function (index, item) {
                var $item = $(item), parentLevel = Number($item.parent().parent().attr("data-level")) || 0, level = ++parentLevel;
                $item.attr("data-level", level);
                var childrenLi = $item.find("> ul > li");
                if (_this.treeView.icon) {
                    _this.renderIcon($item, childrenLi.length);
                }
                else if (childrenLi.length) {
                    _this.renderArrow($item);
                }
                if (childrenLi.length) {
                    childrenLi.each(function (id, it) {
                        _this.renderList(it);
                    });
                }
            });
        };
        // render arrow indication
        List.prototype.renderArrow = function (item) {
            item.find(".fa").remove();
            item.prepend($("<i class='fa fa-angle-right'></i>"));
        };
        // render icon
        List.prototype.renderIcon = function (item, children) {
            item.find("img").remove();
            var $icon, baseIcon = "<img src='/../icon/{{icon}}.png'/>";
            if (children) {
                $icon = $(baseIcon.replace("{{icon}}", "directory"));
            }
            else {
                $icon = $(baseIcon.replace("{{icon}}", "file")).css({ "cursor": "default" });
            }
            item.prepend($icon);
            item.attr("data-list-type", children ? "folder" : "file").find("img").addClass("state-close");
        };
        // collapse all li element but element on the first level (root elements)
        List.prototype.initialState = function () {
            this.element.find("li[data-level!=1]").css({ "display": "none" });
        };
        return List;
    })();
    AwesomeTreeView.List = List;
})(AwesomeTreeView || (AwesomeTreeView = {}));
