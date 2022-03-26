const { JSDOM } = require("jsdom");
const { fromFile } = JSDOM;

describe("test suite", () => {

    async function import_test_page(file_name){
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
                { "title": "Chapter 1", "pages": "0.1", "chars": 140, "level": 0 },
                { "title": "1.1 hoge", "pages": "0.0", "chars": 10, "level": 1 },
                { "title": "1.1.1 Hoge", "pages": "0.0", "chars": 50, "level": 2 },
                { "title": "1.1.2 Huga hoge", "pages": "0.1", "chars": 110, "level": 2 },
            ]
        );
    });

    it("tests page count (test_page2.html)", async () => {
        await import_test_page("test_page2.html")
        const content = document.querySelector("#sbo-rt-content");
        const main = require("../main")
        result = main.calc(content);
        expect(result).toEqual(
            [
                { "title": "Chapter 3. Methodologies for Continuous Security", "pages": "0.0", "chars": 27, "level": 0 },
                { "title": "Version Control", "pages": "0.1", "chars": 223, "level": 1 },
                { "title": "Infrastructure as Code ( IaC )", "pages": "0.0", "chars": 10, "level": 1 },
                { "title": "Security as Code", "pages": "0.0", "chars": 50, "level": 2 },
                { "title": "Continuous Integration and Continuous Deployment (CI/CD)", "pages": "0.2", "chars": 331, "level": 1 },
                { "title": "Observability", "pages": "0.0", "chars": 27, "level": 1 },
                { "title": "Extensibility", "pages": "0.0", "chars": 40, "level": 2 },
                { "title": "Summary", "pages": "0.1", "chars": 150, "level": 1 },
            ]
        );
    });

    it("tests page count (test_page3.html)", async () => {
        await import_test_page("test_page3.html")
        const content = document.querySelector("#sbo-rt-content");
        const main = require("../main")
        result = main.calc(content);
        expect(result).toEqual(
            [
                { "title": "Chapter 1. Introduction", "pages": "0.1", "chars": 115, "level": 0 },
                { "title": "Defining Software Architecture", "pages": "0.1", "chars": 90, "level": 1 },
                { "title": "Expectations of an Architect", "pages": "0.0", "chars": 27, "level": 1 },
                { "title": "Make Architecture Decisions", "pages": "0.0", "chars": 0, "level": 2 },
                { "title": "Intersection of Architecture and", "pages": "0.0", "chars": 9, "level": 1 },
                { "title": "Engineering Practices", "pages": "0.2", "chars": 328, "level": 2 },
            ]
        );
    });
});
