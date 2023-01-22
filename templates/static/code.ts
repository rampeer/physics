import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

export let editor = new EditorView({
    doc: 'console.log("Hello world")',
    extensions: [
        basicSetup, javascript()
    ],
    parent:  document.querySelector("#codeeditor")!
})
