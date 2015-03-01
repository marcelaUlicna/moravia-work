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
            // call List class to render tree view
            var list = new AwesomeTreeView.List(this);
        }
        return TreeView;
    })();
    AwesomeTreeView.TreeView = TreeView;
})(AwesomeTreeView || (AwesomeTreeView = {}));
//# sourceMappingURL=treeview.js.map