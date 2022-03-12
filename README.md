[![codecov](https://codecov.io/gh/kaiwabeya/OreillySectionWordConter/branch/main/graph/badge.svg?token=SV4H2L0NAV)](https://codecov.io/gh/kaiwabeya/OreillySectionWordConter)

# Oreilly e-Book Page count estimator

The app estimates how many pages each O'Reilly ebook page is if it's a paper book.

## How to use

1. Install Tampermonkey or Greasemonkey extension on your browser
2. Register `main.js` to Tampermonkey or Greasemonkey as a new user script (except for `module.exports line` that is a final line)
3. Open developer mode of your browser (short cut key may be F12 if you use Firefox and Chrome) and click "Console" tab
4. Open e-Book page on O'Reilly Online
5. See "Console" tab

You may see like this (Fundamentals of Software Architecture);

```
Title, pages, char_count Oreilly_Section_word_conter.user.js:82:13
Title, pages, char_count ch01.html:13:1037
Chapter 1. Introduction, 2.8, 5054
    Defining Software Architecture, 2.2, 3906
    Expectations of an Architect, 0.5, 843
        Make Architecture Decisions, 0.9, 1578
        Continually Analyze the Architecture, 0.7, 1271
        Keep Current with Latest Trends, 0.4, 700
        Ensure Compliance with Decisions, 0.7, 1309
        Diverse Exposure and Experience, 0.7, 1298
        Have Business Domain Knowledge, 0.7, 1236
        Possess Interpersonal Skills, 0.8, 1364
        Understand and Navigate Politics, 1.6, 2806
    Intersection of Architecture and…, 1.4, 2557
        Engineering Practices, 4.9, 8731
        Operations/DevOps, 1.0, 1740
        Process, 1.1, 1963
        Data, 0.5, 895
    Laws of Software Architecture, 0.9, 1678
```

First column is a section name, second column is the number of estimated pages, and third column is the number of characters within `<p>` tag.

 ## Test

```
npm install
npm test
```
