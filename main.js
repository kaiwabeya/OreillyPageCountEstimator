// ==UserScript==
// @name         Oreilly_Section_word_conter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://learning.oreilly.com/library/view/*
// @icon         https://www.google.com/s2/favicons?domain=oreilly.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==
'use strict';

const CHARS_IN_A_PAGE = 1800;

const countChar = function (section) {
    const pTags = section.getElementsByTagName("p");
    let count = 0;
    for (const p of pTags) {
        count += p.textContent.length;
    }
    return count;
};

const getTitle = function (section) {
    const targets = ["h1", "h2", "h3", "h4"]; // h2: chapter 1, h3: 1.1 xxxx, h4: 1.1.1 yyyy, h5~: each small topic
    //const targets = ["h2", "h3"]; // h2: chapter 1, h3: 1.1 xxxx, h4: 1.1.1 yyyy, h5~: each small topic
    for (const target of targets) {
        const title = section.getElementsByTagName(target);
        if (title.length > 0) {
            const formattedTitle = title[0].textContent.replace(/\r?\n\s*/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, '');
            return formattedTitle;
        }
    }
    return undefined; // ignored due to too small section
};

const createSectionInfoTree = function (section, level) {
    let sectionInfoTree = [];
    let subsections = [];
    for (const child of section.children) {
        if (child.tagName.toLowerCase() === "section") {
            subsections.push(child);
        }
    }

    if (subsections.length !== 0) {
        for (const subsection of subsections) {
            const subsectionInfoTree = createSectionInfoTree(subsection, level + 1);
            if (subsectionInfoTree !== undefined) {
                sectionInfoTree = sectionInfoTree.concat(subsectionInfoTree);
            }
        }
    } else {
        if (section.getElementsByTagName("section").length !== 0) {
            for (const child of section.children) {
                sectionInfoTree = sectionInfoTree.concat(createSectionInfoTree(child, level));
            }
            return sectionInfoTree;
        }
    }


    const title = getTitle(section);
    if (title === undefined) { // Skip small section
        return undefined;
    }
    const count = countChar(section);

    let charsInAllChilds = 0;
    for (const child of sectionInfoTree) {
        charsInAllChilds += child.chars;
    }
    const parentCount = count - charsInAllChilds;
    const parentPages = (parentCount / CHARS_IN_A_PAGE).toFixed(1);
    sectionInfoTree.unshift({"title": title, "pages": parentPages, "chars": parentCount, "level": level});

    return sectionInfoTree;
}

const calc = function(content){
    const sections = content.getElementsByTagName("section"); // Get all sections
    const level = 0;
    const sectionInfoTree = createSectionInfoTree(sections[0], level);
    console.log("Greasemonkey Script: Oreilly_Section_word_conter");
    console.log("Title, pages, char_count");
    return sectionInfoTree;
}

setTimeout(() => {
    const content = document.querySelector("#sbo-rt-content"); // Get contents body
    const results = calc(content);
    console.log(results.map(x => "    ".repeat(x.level) + "\"" + x.title + "\", " + x.pages + ", " + x.chars.toString()).join("\n"));
    console.log("done");
}, 3000);

// Copy above code and paste user script form of Tampermonkey or Greasemonkey
// !! Following line is unnecessary for user script, but is necessary for unit test !!
module.exports.calc = calc;
