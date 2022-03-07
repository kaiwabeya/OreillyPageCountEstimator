const { JSDOM } = require("jsdom");
const { fromFile } = JSDOM;

describe("test suite", () => {

    async function import_test_page(file_name){
        console.log(__dirname + "/" + file_name);
        const jsdom = await fromFile(__dirname + "/" + file_name);
        // jestがglobalに定義してあるwindowのdocumentをoverrideする
        Object.defineProperty(window, "document", {
            writable: true,
            value: jsdom.window.document,
        });
    }

    it("tests page count (test_page.html)", async () => {
        await import_test_page("test_page.html")
        const content = document.querySelector("#sbo-rt-content");
        const main = require("../main")
        result = main.calc(content);
        expect(result).toEqual(
            [
                { "title": "Chapter 1", "pages": "-0.0", "chars": -20 },
                { "title": "1.1 hoge", "pages": "0.1", "chars": 170, "level": 1 },
                { "title": "1.1.1 Hoge", "pages": "0.0", "chars": 50, "level": 2 },
                { "title": "1.1.2 Huga hoge", "pages": "0.1", "chars": 110, "level": 2 }
            ]
        );
        console.log(result);
    });

    it("tests page count (test_page3.html)", async () => {
        await import_test_page("test_page3.html")
        const content = document.querySelector("#sbo-rt-content");
        const main = require("../main")
        result = main.calc(content);
        expect(result).toEqual(
            [
                { "title": "Chapter 1.", "pages": "-0.0", "chars": -20 },
                { "title": "1.1 hoge", "pages": "0.1", "chars": 170, "level": 1 },
                { "title": "1.1.1 Hoge", "pages": "0.0", "chars": 50, "level": 2 },
                { "title": "1.1.2 Huga hoge", "pages": "0.1", "chars": 110, "level": 2 }
            ]
        );
        console.log(result);
    });
});
