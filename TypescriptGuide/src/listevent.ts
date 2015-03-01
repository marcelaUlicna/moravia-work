/**
 * Created by Marcela on 1. 3. 2015.
 */

///<reference path="treeview.ts" />
///<reference path="../typing/jquery.d.ts" />

module AwesomeTreeView {

    /*
    * This class implements expanding and collapsing events
    * */
    export class ListEvent {
        element: JQuery;
        treeView: TreeView;

        constructor(element: JQuery, treeView: TreeView) {
            this.treeView = treeView;
            this.element = element;
            this.element.on('click', 'img,i.fa', (e) => this.toggleList(e));
        }

        // expand/collapse li elements
        toggleList(e: JQueryEventObject): void {
            var $icon = $(e.target),
                liElement = $icon.parent();

            if(liElement.attr("data-list-type") === "folder") {
                this.toggleIconFolder($icon);
            } else {
                this.toggleArrow(liElement);
            }

            if(this.treeView.animation) {
                liElement.find("> ul > li").slideToggle();
            } else {
                liElement.find("> ul > li").toggle();
            }
        }

        // set appropriate icon
        toggleIconFolder(img: JQuery): void {
            img.toggleClass("state-open");
            img.toggleClass("state-close");

            if(img.hasClass("state-open")) {
                img.attr("src", "/../icon/folder_open.png");
            } else {
                img.attr("src", "/../icon/directory.png");
            }
        }

        // set appropriate arrow
        toggleArrow(element: JQuery): void {
            var arrow = element.find("> i.fa");
            if(arrow) {
                arrow.toggleClass("fa-angle-right");
                arrow.toggleClass("fa-angle-down");
            }
        }
    }
}