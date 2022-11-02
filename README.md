# Granblue Fantasy - Beautify Honors (Web)

![vue version](https://img.shields.io/badge/vue-2.6.14-brightgreen)
![bootstrap-vue version](https://img.shields.io/badge/bootstrap--vue-2.22.0-brightgreen)
![stage](https://img.shields.io/badge/stage-pre--alpha-brightgreen)
![license](https://img.shields.io/github/license/qq88976321/gbf-beautify-honors-web)

[Live demo](https://qq88976321.github.io/gbf-beautify-honors-web/)

A static web page to help you figure out how to beautify honors in the Guild War event. (古戦場の貢献度調整)

![demo_sample](demo_sample.png)

## Table of contents

- [Granblue Fantasy - Beautify Honors (Web)](#granblue-fantasy---beautify-honors-web)
  - [Table of contents](#table-of-contents)
  - [Notice](#notice)
  - [How it works](#how-it-works)
  - [How to develop](#how-to-develop)
    - [Project setup](#project-setup)
      - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
      - [Compiles and minifies for production](#compiles-and-minifies-for-production)
      - [Lints and fixes files](#lints-and-fixes-files)
      - [Unit test](#unit-test)
      - [Release](#release)
      - [Customize configuration](#customize-configuration)

## Notice

This project is made by vue2 and used to demonstrate beautifying honors using a static website. It is also a web version of my [gbf-beautify-honors cli](https://github.com/qq88976321/gbf-beautify-honors) python project.

However, I am new to front-end development, so the project is currently in early stage. There are still many things to improve and any issues are welcome!

## How it works

We can formulate this problem as an integer programming problem and solve it using the [glpk.js](https://github.com/jvail/glpk.js).

Is this case, we use an integer variable h<sub>i</sub> to represent the exact honor earned from battle `i` (`i` can be `Eyeball N`, `Meat Beast EX+`, ...).
And use another integer variable n<sub>i</sub> to represent the number of battles we need to fight for the battle `i`.

We want to get exact honors with minimum number of battles (more efficient), so the corresponding integer programming problem is:

<!-- Minimize\ \displaystyle\sum_{i} n_i -->

![formula](https://render.githubusercontent.com/render/math?math=Minimize%5C%20%5Cdisplaystyle%5Csum_%7Bi%7D%20n_i)

<!-- Subject\ to\ \displaystyle\sum_{i} h_i\times n_i -->

![formula](https://render.githubusercontent.com/render/math?math=Subject%5C%20to%5C%20%5Cdisplaystyle%5Csum_%7Bi%7D%20h_i%5Ctimes%20n_i%20%3D%20expected%5C_honor)

Additionally, we can add additional constraints to the integer variable n<sub>i</sub> to limit the maximum number of each battle. e.g.,

![formula](https://render.githubusercontent.com/render/math?math=0%E2%89%A4n_i%E2%89%A410)

## How to develop

### Project setup

```sh
npm install
npm run prepare
```

#### Compiles and hot-reloads for development

```sh
npm run serve
```

#### Compiles and minifies for production

```sh
npm run build
```

#### Lints and fixes files

```sh
npm run lint
```

#### Unit test

```sh
npm run test:unit
```

#### Release

```sh
npm run release -- --release-as patch
npm run release -- --release-as minor
npm run release -- --release-as major
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
