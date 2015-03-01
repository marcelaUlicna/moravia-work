/**
 * Created by Marcela on 1. 3. 2015.
 */

///<reference path="treeview.ts" />
///<reference path="listevent.ts" />
///<reference path="../typing/jquery.d.ts" />

module AwesomeTreeView {

    export class List {
        element: JQuery;
        treeView: TreeView;

        constructor(treeView: TreeView) {
            this.treeView = treeView;
            this.element = this.treeView.element;
            this.render();

            var events = new ListEvent(this.element, this.treeView);
        }

        render(): void {
            this.element.each((id, it) => this.renderList(it));
            this.initialState();
        }

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

        renderArrow(item: JQuery): void {
            item.find(".fa").remove();
            item.prepend($("<i class='fa fa-angle-right'></i>"));
        }

        renderIcon(item: JQuery, children: number): void {
            item.find("img").remove();

            var baseIcon = "<img src='/icon/{{icon}}.png'/>",
                icon = children ? baseIcon.replace("{{icon}}", "directory") : baseIcon.replace("{{icon}}", "file");

            item.prepend($(icon));
            item.attr("data-list-type", children ? "folder" : "file").addClass("state-close");
        }

        initialState(): void {
            this.element.find("li[data-level!=1]").css({ "display": "none" });
        }
    }
}
