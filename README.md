[![codecov](https://codecov.io/gh/kaiwabeya/OreillySectionWordConter/branch/main/graph/badge.svg?token=SV4H2L0NAV)](https://codecov.io/gh/kaiwabeya/OreillySectionWordConter)

# Oreilly e-Book Page count estimator

The app estimates how many pages each O'Reilly ebook page is if it's a paper book.

## How to use

1. Install Tampermonkey or Greasemonkey extension on your browser
2. Register `main.js` to Tampermonkey or Greasemonkey as a new user script (except for `module.exports line` that is a final line)
3. Open developer mode of your browser (short cut key may be F12 if you use Firefox and Chrome) and click "Console" tab
4. Open e-Book page on O'Reilly Online
5. See "Console" tab

You may see like this;

```
Title, pages, char_count Oreilly_Section_word_conter.user.js:82:13
Chapter 12, -31.1, -55940
    12.1 Background, 14.4, 25838
        12.1.1 Reasons, 2.1, 3797
        12.1.2 Effective Benchmarking, 2.4, 4274
        12.1.3 Benchmarking Failures, 9.8, 17661
    12.2 Benchmarking Types, 6.9, 12372
        12.2.1 Micro-Benchmarking, 2.2, 3978
        12.2.2 Simulation, 1.5, 2669
        12.2.3 Replay, 0.8, 1377
        12.2.4 Industry Standards, 2.2, 4014
```

 ## Test

```
npm install
npm test
```
