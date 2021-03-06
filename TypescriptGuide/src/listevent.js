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
            this.element.on('click', 'li', function (e) { return _this.toggleList(e); });
        }
        // expand/collapse li elements
        ListEvent.prototype.toggleList = function (e) {
            e.stopPropagation();
            var liElement = $(e.target);
            if (liElement.attr("data-list-type") === "folder") {
                this.toggleIconFolder(liElement.children("img"));
            }
            else {
                this.toggleArrow(liElement);
            }
            if (this.treeView.settings.animation) {
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
//# sourceMappingURL=listevent.js.map