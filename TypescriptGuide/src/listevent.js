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
//# sourceMappingURL=listevent.js.map