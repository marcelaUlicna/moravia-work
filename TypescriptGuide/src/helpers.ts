/**
 * Created by Marcela on 11. 3. 2015.
 */
module AwesomeTreeView {
    export interface IIconDictionary {
        [key: string]: string;
    }

    export class IconType {
        static defaultIcons(): IIconDictionary {
            return {
                "css": "../icon/css.png",
                "doc": "../icon/doc.png",
                "docx": "../icon/doc.png",
                "avi": "../icon/film.png",
                "mkv": "../icon/film.png",
                "mp4": "../icon/film.png",
                "html": "../icon/html.png",
                "java": "../icon/java.png",
                "mp3": "../icon/music.png",
                "wma": "../icon/music.png",
                "pdf": "../icon/pdf.png",
                "php": "../icon/php.png",
                "jpg": "../icon/picture.png",
                "jpeg": "../icon/picture.png",
                "bmp": "../icon/picture.png",
                "png": "../icon/picture.png",
                "ppt": "../icon/ppt.png",
                "psd": "../icon/psd.png",
                "txt": "../icon/txt.png",
                "xls": "../icon/xls.png",
                "xlsx": "../icon/xls.png",
                "zip": "../icon/zip.png",
                "js": "../icon/script.png",
                "ts": "../icon/script.png",
                "cs": "../icon/code.png",
                "exe": "../icon/application.png"
            };
        }
    }
}