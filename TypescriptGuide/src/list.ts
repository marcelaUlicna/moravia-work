/**
 * Created by Marcela on 1. 3. 2015.
 */

///<reference path="treeview.ts" />
///<reference path="listevent.ts" />
///<reference path="../typing/jquery.d.ts" />

module AwesomeTreeView {

    /*
    * This class is responsible for modifying unordered DOM list
    * according to settings, adding expanding and collapsing identificators
    * and registering event handlers
    * */
    export class List {
        element: JQuery;
        treeView: TreeView;

        constructor(treeView: TreeView) {
            this.treeView = treeView;
            this.element = this.treeView.element;
            this.render();

            // add event handlers
            var events = new ListEvent(this.element, this.treeView);
        }

        // render list items for each list element and set initial state
        // (only root elements are shown, other elements are hidden)
        render(): void {
            this.element.each((id, it) => this.renderList(it));
            this.initialState();
        }

        // render each li element, set icon or arrow indicator for expanding and collapsing
        renderList(item: Element): void {
            $(item).find("li").each((index, item) => {
                var $item = $(item),
                    parentLevel: number = Number($item.parent().parent().attr("data-level")) || 0,
                    level = ++parentLevel;

                $item.attr("data-level", level);

                var childrenLi = $item.find("> ul > li");
                if(this.treeView.icon) {
                    this.renderIcon($item, childrenLi.length);
                } else if (childrenLi.length) {
                    this.renderArrow($item);
                }

                if(childrenLi.length) {
                    childrenLi.each((id, it) => {
                        this.renderList(it);
                    });
                }
            });
        }

        // render arrow indication
        renderArrow(item: JQuery): void {
            item.find(".fa").remove();
            item.prepend($("<i class='fa fa-angle-right'></i>"));
        }

        // render icon
        renderIcon(item: JQuery, children: number): void {
            item.find("img").remove();

            var baseIcon = "<img src='/../icon/{{icon}}.png'/>",
                icon = children ? baseIcon.replace("{{icon}}", "directory") : baseIcon.replace("{{icon}}", "file");

            item.prepend($(icon));
            item
                .attr("data-list-type", children ? "folder" : "file")
                .find("img")
                .addClass("state-close");
        }

        // collapse all li element but element on the first level (root elements)
        initialState(): void {
            this.element.find("li[data-level!=1]").css({ "display": "none" });
        }
    }
}
