System.register(["codemirror", "@codemirror/lang-javascript"], function (exports_1, context_1) {
    "use strict";
    var codemirror_1, lang_javascript_1, editor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (codemirror_1_1) {
                codemirror_1 = codemirror_1_1;
            },
            function (lang_javascript_1_1) {
                lang_javascript_1 = lang_javascript_1_1;
            }
        ],
        execute: function () {
            exports_1("editor", editor = new codemirror_1.EditorView({
                doc: 'console.log("Hello world")',
                extensions: [
                    codemirror_1.basicSetup, lang_javascript_1.javascript()
                ],
                parent: document.querySelector("#codeeditor")
            }));
        }
    };
});
//# sourceMappingURL=code.js.map