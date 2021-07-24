// ==UserScript==
// @name         Oreilly_Section_word_conter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://learning.oreilly.com/library/view/*
// @icon         https://www.google.com/s2/favicons?domain=oreilly.com
// @grant        none
// ==/UserScript==
'use strict';

const countChar = function (section) {
    const pTags = section.getElementsByTagName("p");
    let count = 0;
    for (const p of pTags) {
        count += p.textContent.length;
    }
    return count;
};

const getTitle = function (section) {
    const targets = ["h2", "h3", "h4"]; // h2: chapter 1, h3: 1.1 xxxx, h4: 1.1.1 yyyy, h5~: each small topic
    //const targets = ["h2", "h3"]; // h2: chapter 1, h3: 1.1 xxxx, h4: 1.1.1 yyyy, h5~: each small topic
    for (const target of targets) {
        const title = section.getElementsByTagName(target);
        if (title.length > 0) {
            return title[0].textContent;
        }
    }
    return undefined; // ignored due to too small section
};

/* calcurate Level(capter 1: Lv.0, 1.1: Lv.1, 1.1.1: Lv.2) for indents */
const calcLevel = function (section, levelMemo) {
    if (section.textContent in levelMemo) { // for Lv.0
        return levelMemo[section.textContent];
    }
    const parent = section.parentNode;
    let parentLevel = -100;
    if (parent.textContent in levelMemo) {
        parentLevel = levelMemo[parent.textContent];
    }
    else {
        parentLevel = calcLevel(parent, levelMemo);
    }
    levelMemo[section.textContent] = parentLevel+1;
    return parentLevel+1;
};

const main = function () {
    const CHARS_IN_A_PAGE = 1800;
    const content = document.querySelector("#sbo-rt-content"); // Get contents body
    const sections = content.getElementsByTagName("section"); // Get all sections
    const results = [];
    const levelMemo = {}; // results of calculated level for memoization
    levelMemo[sections[0].textContent] = 0;
    for (const section of sections) {
        const title = getTitle(section);
        if (title === undefined) { // Skip small section
            continue;
        }
        const count = countChar(section);
        const pages = (count / CHARS_IN_A_PAGE).toFixed(1);
        const level = calcLevel(section, levelMemo);
        results.push({ "title": title, "pages": pages, "chars": count, "level": level});
    }
    // Special Code for system performance 2nd edition
    // BEGIN-------------------------------------------
    let charsInAllChilds = 0;
    for (const child of results.slice(1)) {
        charsInAllChilds += child.chars;
    }
    const parentCount = results[0].chars - charsInAllChilds;
    const parentPages = (parentCount / 1800).toFixed(1);
    results[0] = { "title": results[0].title, "pages": parentPages, "chars": parentCount};
    // END---------------------------------------------
    console.log("Greasemonkey Script: Oreilly_Section_word_conter");
    console.log("Title, pages, char_count");
    console.log(results.map(x => "    ".repeat(x.level) + x.title + ", " + x.pages + ", " + x.chars.toString()).join("\n"));
    console.log("done");
};

main();

