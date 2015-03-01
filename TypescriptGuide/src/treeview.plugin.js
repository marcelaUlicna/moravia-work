/**
 * Created by Marcela on 1. 3. 2015.
 */
///<reference path="treeview.ts" />
///<reference path="../typing/jquery.d.ts" />
var AwesomeTreeView;
(function (AwesomeTreeView) {
    var ListEvent = (function () {
        function ListEvent(element, treeView) {
            var _this = this;
            this.treeView = treeView;
            this.element = element;
            this.element.on('click', 'img,i.fa', function (e) { return _this.toggleList(e); });
        }
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
        ListEvent.prototype.toggleIconFolder = function (img) {
            img.toggleClass("state-open");
            img.toggleClass("state-close");
            if (img.hasClass("state-open")) {
                img.attr("src", "/icon/folder_open.png");
            }
            else {
                img.attr("src", "/icon/directory.png");
            }
        };
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
    var List = (function () {
        function List(treeView) {
            this.treeView = treeView;
            this.element = this.treeView.element;
            this.render();
            var events = new AwesomeTreeView.ListEvent(this.element, this.treeView);
        }
        List.prototype.render = function () {
            var _this = this;
            this.element.each(function (id, it) { return _this.renderList(it); });
            this.initialState();
        };
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
        List.prototype.renderArrow = function (item) {
            item.find(".fa").remove();
            item.prepend($("<i class='fa fa-angle-right'></i>"));
        };
        List.prototype.renderIcon = function (item, children) {
            item.find("img").remove();
            var baseIcon = "<img src='/icon/{{icon}}.png'/>", icon = children ? baseIcon.replace("{{icon}}", "directory") : baseIcon.replace("{{icon}}", "file");
            item.prepend($(icon));
            item.attr("data-list-type", children ? "folder" : "file").addClass("state-close");
        };
        List.prototype.initialState = function () {
            this.element.find("li[data-level!=1]").css({ "display": "none" });
        };
        return List;
    })();
    AwesomeTreeView.List = List;
})(AwesomeTreeView || (AwesomeTreeView = {}));
/**
 * Created by Marcela on 1. 3. 2015.
 */
///<reference path="list.ts" />
///<reference path="../typing/jquery.d.ts" />
var AwesomeTreeView;
(function (AwesomeTreeView) {
    var TreeView = (function () {
        function TreeView(element, options) {
            // implement interface
            this.icon = true;
            this.expandAll = false;
            this.checkboxes = false;
            this.uniqueOnOpen = false;
            this.animation = true;
            this.branches = false;
            this.element = element;
            this.element.addClass("awesome-tree-view");
            $.extend(this, options);
            var list = new AwesomeTreeView.List(this);
        }
        return TreeView;
    })();
    AwesomeTreeView.TreeView = TreeView;
})(AwesomeTreeView || (AwesomeTreeView = {}));
