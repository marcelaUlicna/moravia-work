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
            var baseIcon = "<img src='/../icon/{{icon}}.png'/>", icon = children ? baseIcon.replace("{{icon}}", "directory") : baseIcon.replace("{{icon}}", "file");
            item.prepend($(icon));
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
//# sourceMappingURL=list.js.map