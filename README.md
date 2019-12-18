# @ask-utils/game

GitHub Template repository to create a npm package by using TypeScript.

## Badges

[![NPM](https://nodei.co/npm/@ask-utils/game.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@ask-utils/game/)  
[![npm version](https://badge.fury.io/js/@ask-utils/game.svg)](https://badge.fury.io/js/@ask-utils/game)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/hideokamoto/@ask-utils/game/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/hideokamoto/@ask-utils/game/test_coverage)
[![Build Status](https://travis-ci.org/hideokamoto/@ask-utils/game.svg?branch=master)](https://travis-ci.org/hideokamoto/@ask-utils/game)

## Prepare

```
$ git clone git@github.com:ask-utils/game.git
$ cd game

// Put your GitHub Personal Access Token
$ mv .envrc.example .envrc
$ vim .envrc
export CONVENTIONAL_GITHUB_RELEASER_TOKEN=PUT_YOUR_GITHUB_ACCESS_TOKEN

// Install
$ yarn
or
$ npm install
```

### GitHub Personal Access Token Scope

If the project is private -> `repo`
If the project is public -> `public_repo`

## Commit message rule

The repository runs commitlint.
We have to follow "Conventional Commit" to make a commit message.

https://www.conventionalcommits.org/en/v1.0.0-beta.4/

```bash
$ git commit -m "<type>[optional scope]: <description>

[optional body]

[optional footer]"
```

## Contribution

```bash
// clone
$ git clone git@github.com:ask-utils/game.git
$ cd game

// setup
$ yarn

// Unit test
$ yarn test
or
$ yarn run test:watch

// Lint
$ yarn run lint
or
$ yarn run lint --fix

// Build
$ yarn run build

// Rebuild docs
$ yarn run doc
```