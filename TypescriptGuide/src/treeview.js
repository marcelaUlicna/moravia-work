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
//# sourceMappingURL=treeview.js.map