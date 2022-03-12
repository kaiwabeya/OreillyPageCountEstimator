const { JSDOM } = require("jsdom");
const { fromFile } = JSDOM;

describe("test suite", () => {
    beforeAll(async () => {
        console.log(__dirname + "/test_page.html");
        const jsdom = await fromFile(__dirname + "/test_page.html");
        // jestがglobalに定義してあるwindowのdocumentをoverrideする
        Object.defineProperty(window, "document", {
            writable: true,
            value: jsdom.window.document,
        });
    });

    it("tests page count", () => {
        const content = document.querySelector("#sbo-rt-content");
        const main = require("../main")
        result = main.calc(content);
        expect(result).toEqual(
            [
                { "title": "Chapter 1", "pages": "0.1", "chars": 140, "level": 0},
                { "title": "1.1 hoge", "pages": "0.0", "chars": 10, "level": 1 },
                { "title": "1.1.1 Hoge", "pages": "0.0", "chars": 50, "level": 2 },
                { "title": "1.1.2 Huga hoge", "pages": "0.1", "chars": 110, "level": 2 }
            ]
        );
        console.log(result);
    });
});
