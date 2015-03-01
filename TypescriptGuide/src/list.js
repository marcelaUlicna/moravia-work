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
//# sourceMappingURL=list.js.map