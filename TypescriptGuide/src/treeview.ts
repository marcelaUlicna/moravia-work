/**
 * Created by Marcela on 1. 3. 2015.
 */

///<reference path="list.ts" />
///<reference path="../typing/jquery.d.ts" />

module AwesomeTreeView {

    export interface ITreeView {
        icon: boolean;
        expandAll: boolean;
        checkboxes: boolean;
        uniqueOnOpen: boolean;
        animation: boolean;
        branches: boolean;
    }

    export class TreeView implements ITreeView{
        element: JQuery;

        // implement interface
        icon: boolean = true;
        expandAll: boolean = false;
        checkboxes: boolean = false;
        uniqueOnOpen: boolean = false;
        animation: boolean = true;
        branches: boolean = false;

        constructor(element: JQuery, options: ITreeView){
            this.element = element;
            this.element.addClass("awesome-tree-view");
            $.extend(this, options);

            var list = new List(this);
        }
    }
}
