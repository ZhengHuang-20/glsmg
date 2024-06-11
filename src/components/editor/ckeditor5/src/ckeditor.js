/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
//import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js';
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

import VideoUpload from "@visao/ckeditor5-video/src/videoupload.js";
import Video from "@visao/ckeditor5-video/src/video.js";
import VideoResize from "@visao/ckeditor5-video/src/videoresize.js";
import VideoToolbar from "@visao/ckeditor5-video/src/videotoolbar.js";
import VideoStyle from "@visao/ckeditor5-video/src/videostyle.js";


import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js'; // 1
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'; //1
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting.js';

import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter.js';
import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';



// https://blog.csdn.net/f826241061/article/details/120976668
// 定义上传文件插件

export default class ClassicEditor extends ClassicEditorBase {
}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    Essentials,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    CloudServices,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageToolbar,
    ImageStyle,
    ImageUpload,
    Indent,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    //TableColumnResize,
    TextTransformation,
    Alignment,


    Code,
    FileRepository,
    SourceEditing,

    TodoList,
    Underline,
    WordCount,
    HorizontalLine,
    Subscript,
    Superscript,
    Strikethrough,
    RemoveFormat,
    SimpleUploadAdapter,
    Mention,
    MediaEmbedToolbar,
    Markdown,
    LinkImage,
    ImageInsert,
    ImageResize,
    CodeBlock,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,


    Video,
    VideoToolbar,
    VideoUpload,
    VideoResize,
    VideoStyle,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading', // 1
            '|',
            'removeFormat',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'fontSize',
            'bulletedList',
            'numberedList',
            'todoList',
            'superscript',
            'subscript',
            '|',
            'horizontalLine',
            'outdent',
            'indent', //
            'alignment',
            '|',
            'blockQuote', //1
            'code',
            'codeBlock',
            'insertTable',
            '|',
            'link', // 1
            //'imageUpload',
            'imageInsert',
            'videoUpload',
            'mediaEmbed',
            '|',
            'undo',
            'redo',
            '|',
            'sourceEditing'
        ],
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
        ],
    },
    video: {
        upload: {
            types: ["mp4"],
            allowMultipleFiles: false,
        },
        styles: ["alignLeft", "alignCenter", "alignRight"],

        // Configure the available video resize options.
        resizeOptions: [
            {
                name: "videoResize:original",
                label: "Original",
                icon: "original",
            },
            {
                name: "videoResize:50",
                label: "50",
                icon: "medium",
            },
            {
                name: "videoResize:75",
                label: "75",
                icon: "large",
            },
        ],

        // You need to configure the video toolbar, too, so it shows the new style
        // buttons as well as the resize buttons.
        toolbar: [
            "videoStyle:alignLeft",
            "videoStyle:alignCenter",
            "videoStyle:alignRight",
            "|",
            "videoResize:50",
            "videoResize:75",
            "videoResize:original",
        ],
    },
    table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: "zh-cn",
};
