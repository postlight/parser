# Contributing to Mercury Parser

Thank you for your interest in contributing to Mercury Parser! It's people like you that make Mercury such a useful tool. The below guidelines will help answer any questions you may have about the contribution process. We look forward to receiving contributions from you — our community!

_Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating._

## Contents

- [Contributing to Mercury Parser](#contributing-to-mercury-parser)
  - [Contents](#contents)
  - [Ways to Contribute](#ways-to-contribute)
  - [Reporting a Bug](#reporting-a-bug)
    - [Security](#security)
  - [Requesting a Feature](#requesting-a-feature)
  - [Development Workflow](#development-workflow)
    - [Building](#building)
    - [Testing](#testing)
    - [Code Style](#code-style)
      - [JavaScript](#javascript)
      - [Markdown](#markdown)
    - [Node.js Version Requirements](#nodejs-version-requirements)
  - [Writing Documentation](#writing-documentation)
  - [Submitting a Pull Request](#submitting-a-pull-request)
    - [Commit Style](#commit-style)
    - [Code Reviews](#code-reviews)
  - [Helpful Links and Information](#helpful-links-and-information)

## Ways to Contribute

There are many ways you can contribute to the Mercury community. We value each type
of contribution and appreciate your help.

Here are a few examples of what we consider a contribution:

- Updates to source code, including bug fixes, improvements, or [creating new custom site extractors](./src/extractors/custom/README.md)
- Answering questions and chatting with the community in the [Gitter](https://gitter.im/postlight/mercury) room
- Filing, organizing, and commenting on issues in the [issue tracker](https://github.com/postlight/mercury-parser/issues)
- Teaching others how to use Mercury
- Community building and outreach

## Reporting a Bug

While bugs are unfortunate, they're a reality in software. We can't fix what we
don't know about, so please report liberally. If you're not sure if something is
a bug or not, feel free to file a bug anyway.

If you have the chance, before reporting a bug, please search existing issues,
as it's possible that someone else has already reported the error. This doesn't
always work, and sometimes it's hard to know what to search for, so consider
this extra credit. We won't mind if you accidentally file a duplicate report.

Opening an issue is as easy as following [this link](https://github.com/postlight/mercury-parser/issues/new)
and filling out the template.

### Security

If you find a security bug in Mercury, send an email with a descriptive subject line
to [mercury+security@postlight.com](mailto:mercury+security@postlight.com). If you think
you’ve found a serious vulnerability, please do not file a public issue or share in the Mercury Gitter room.

Your report will go to Mercury's core development team. You will receive
acknowledgement of the report in 24-48 hours, and our next steps should be to
release a fix. If you don’t get a report acknowledgement in 48 hours, send an email to
[mercury@postlight.com](mailto:mercury@postlight.com).

A working list of public, known security-related issues can be found in the
[issue tracker](https://github.com/postlight/mercury-parser/issues?q=is%3Aopen+is%3Aissue+label%3Asecurity).

## Requesting a Feature

To request a change to the way that Mercury works, please open an issue in this repository named, "Feature Request: [Your Feature Idea]," followed by your suggestion.

## Development Workflow

This section of the document outlines how to build, run, and test Mercury locally.

### Building

To build the Mercury Parser locally, execute the following commands:

```bash
# Clone this repository from GitHub.
git clone https://github.com/postlight/mercury-parser.git

# Navigate into the root of this repository.
cd mercury-parser

# Install local dependencies.
yarn install

# Run the node release
yarn build

# Build the web release
yarn build:web
```

### Testing

Mercury is a test-driven application; each component has its own test file. Tests are run for both node and web builds. Our testing frameworks are:

- `Jest` for the node build
- `Karma` for the web build

For new code to be accepted, all tests must pass in both environments. To run the required tests for local development, execute the following commands:

```bash
# Run the full test suite once, for both node and the browser
yarn test

# Run the tests for node build only
yarn test:node

# Run the tests for web build only
yarn test:web

# Run the tests in node, then re-run tests on file changes.
# If an optional <test_file> string is passed, only tests
# matching that string will be re-run.
#
# E.g., `yarn watch:test nytimes` will run the tests for
# `./src/extractors/custom/www.www.nytimes.com/index.test.js`
yarn watch:test <test_file>
```

### Code Style

#### JavaScript

We use a slightly modified version of the Airbnb JavaScript [Style Guide](https://github.com/airbnb/javascript).
To enforce this, all pull requests must pass [ESLint](http://eslint.org/) before
they can merge.

All code is also formatted with [Prettier](https://github.com/prettier/prettier).
This is done automatically when you commit code, so whether or not you use Prettier
as you develop is up to you.

#### Markdown

In addition to enforcing a JavaScript style guide, we also require that Markdown
files pass [remarklint](https://github.com/wooorm/remark-lint) with the recommended
preset. This helps keep our Markdown tidy and consistent.

### Node.js Version Requirements

Mercury is built against Node `>= v8.10`. Since this is the
version we run in our CI environments, we recommend you use it when working on
the Mercury codebase.

If you use [nvm](https://github.com/creationix/nvm) to manage Node.js versions
and zsh (like [Oh-My-ZSH](https://github.com/robbyrussell/oh-my-zsh)), you can
have nvm switch to the correct Node.js version automatically when you cd into
this repository. To do so, add the following to your `~/.zshrc` file:

```bash
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" != "N/A" ] && [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm install
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Writing Documentation

Improvements to documentation are a great way to start contributing to Mercury. The
source for the official documentation are Markdown files that live in this repository.

## Submitting a Pull Request

Want to make a change to Mercury? Submit a pull request! We use the "fork and pull"
model [described here](https://help.github.com/articles/creating-a-pull-request-from-a-fork).

**Before submitting a pull request**, please make sure:

- [x] You have added tests for modifications you made to the codebase.
- [x] You have updated any documentation in the source code comments for APIs
      that you may have changed.
- [x] You have no linter errors to correct after running `yarn lint`.
- [x] You have run the test suite via `yarn test` and it passed.

### Commit Style

Commit messages should follow the format outlined below:

`prefix: message in present tense`

|   Prefix | Description                                                              |
| -------: | :----------------------------------------------------------------------- |
|    chore | does not effect the production version of the app in any way.            |
|     deps | add, update, or remove a dependency.                                     |
|      doc | add, update, or remove documentation. no code changes.                   |
|       dx | improve the development experience of mercury core.                      |
|     feat | a feature or enhancement. can be incredibly small.                       |
|      fix | a bug fix for something that was broken.                                 |
|     perf | add, update, or fix a test.                                              |
| refactor | change code, but not functionality.                                      |
|    style | change code style, like removing whitespace. no functional code changes. |
|     test | add, update, or fix a test.                                              |

### Code Reviews

Once you have submitted a pull request, a member of the core team must review it
before it is merged. We try to review pull requests within 3 days but sometimes
fall behind. Feel free to reach out to the core team if you have not received a review after 3 days.

## Helpful Links and Information

Some useful places to look for information are:

- The main [README](./README.md) for this repository.
- The Mercury Custom Parser [README](./src/extractors/custom/README.md).
- The postlight/mercury room on [Gitter](https://gitter.im/postlight/mercury)
- The Mercury Parser API [repository](https://github.com/postlight/mercury-parser-api).

_Adapted from [Contributing to Node.js](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md)
and [ThinkUp Security and Data Privacy](http://thinkup.readthedocs.io/en/latest/install/security.html#thinkup-security-and-data-privacy)._
