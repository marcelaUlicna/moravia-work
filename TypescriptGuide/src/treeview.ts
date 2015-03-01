/**
 * Created by Marcela on 1. 3. 2015.
 */

///<reference path="list.ts" />
///<reference path="../typing/jquery.d.ts" />

module AwesomeTreeView {

    /*
    * Interface for user options (defaults in jQuery plugin)
    * */
    export interface ITreeView {
        icon: boolean;
        expandAll: boolean;
        checkboxes: boolean;
        uniqueOnOpen: boolean;
        animation: boolean;
        branches: boolean;
    }

    /*
    * This class is responsible for initializing plugin,
    * setting defaults and custom options
    * and rendering plugin component
    * */
    export class TreeView implements ITreeView{
        element: JQuery;

        // implement interface and set defaults
        icon: boolean = true;
        expandAll: boolean = false;
        checkboxes: boolean = false;
        uniqueOnOpen: boolean = false;
        animation: boolean = true;
        branches: boolean = false;

        constructor(element: JQuery, options: ITreeView){
            this.element = element;
            this.element.addClass("awesome-tree-view");

            // merge custom settings with plugin defaults
            $.extend(this, options);

            // call List class to render tree view
            var list = new List(this);
        }
    }
}
