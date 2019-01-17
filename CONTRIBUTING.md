# Contributing to Mercury Parser

Thank you for your interest in contributing to Mercury Parser! It's people like you that make Mercury such a parsefull tool to use. the below guidelines will help answer any questions you may have about the contribution process. We are looking forward to receive contributions from you — our community!

*Please read the [Code of Conduct]() before you participate in community.*

## Contents

*   [Ways to Contribute](#ways-to-contribute)
*   [Reporting a Bug](#reporting-a-bug)
*   [Requesting a Feature](#requesting-a-feature)
*   [Development Workflow](#development-workflow)
*   [Writing Documentation](#writing-documentation)
*   [Submitting a Pull Request](#submitting-a-pull-request)
*   [Helpful Links and Information](#helpful-links-and-information)

## Ways to Contribute

There are many ways you can contribute to the Mercury community. We value each type
of contribution and appreciate your help.

Here are a few examples of what we consider a contribution:

*   Updates to source code
*   For Answering questions and chatting, contact us on [mercury@postlight.com](mailto:mercury@postlight.com)
*   Filing, organizing, and commenting on issues in the [issue tracker](https://github.com/postlight/mercury-parser/issues)
*   Teaching others how to use Mercury
*   Community building and outreach

## Reporting a Bug

While bugs are unfortunate, they're a reality in software. We can't fix what we
don't know about, so please report liberally. If you're not sure if something is
a bug or not, feel free to file a bug anyway.

If you have the chance, before reporting a bug, please search existing issues,
as it's possible that someone else has already reported your error. This doesn't
always work, and sometimes it's hard to know what to search for, so consider
this extra credit. We won't mind if you accidentally file a duplicate report.

Opening an issue is as easy as following [this link](https://github.com/postlight/mercury-parser/issues/new)
and filling out the fields.

### Security

If you find a security bug in Mercury, send an email with a descriptive subject line
to [mercury+security@postlight.com](mailto:mercury+security@postlight.com). If you think
you’ve found a serious vulnerability, please do not file a public issue.

Your report will go to Mercury's core development team. You will receive
acknowledgement of the report in 24-48 hours, and what our next steps will be to
release a fix. If you don’t get a report acknowledgement in 48 hours, contact
[Adam Pash](mailto:adam.pash@postlight.com) directly.

A working list of public, known security-related issues can be found in the
[issue tracker](https://github.com/postlight/mercury-parser/issues?q=is%3Aopen+is%3Aissue+label%3Asecurity).

## Requesting a Feature

To request a change to the way that Mercury works, please open an issue in the RFCs
repository rather than this one. New features and other significant API changes
must go through the RFC process. For more information about the RFC process, head
over to the [mercury-rfcs repository](https://github.com/postlight/mercury-rfcs).

## Development Workflow

This section of the document outlines how to build, run, and test Mercury locally.

### Building

To build the required modules for local development, execute the following commands:

```bash
# Clone this repository from GitHub.
git clone https://github.com/postlight/mercury-parser.git

# Navigate into the root of this repository.
cd mercury-parser

# Install local dependencies.
yarn install

# Run the build tools.
yarn build:web
```

### Testing

Mercury is a test driven application, each component has its own jest test file. To run a test, execute the following command:

```bash
# Run the test from the root of this repository.
# e.g. of a test file mercury.test.js
yarn watch:test <test_file>
```

### Code Style

#### JavaScript

We use a slightly modified version of the Airbnb JavaScript [Style Guide](https://github.com/airbnb/javascript).
To enforce this, all pull requests must pass [ESLint](http://eslint.org/) before
they can merge.

### Node.js Version Requirements

Mercury is built against Node `>= v6`. Since this is the latest LTS release and the
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
sources for the official documentation are generated from source code comments
and markdown files that live in this repository.

## Submitting a Pull Request

Want to make a change to Mercury? Submit a pull request! We use the "fork and pull"
model [described here](https://help.github.com/articles/creating-a-pull-request-from-a-fork).

**Before submitting a pull request**, please make sure:

*   [X] You have added tests for modifications you made to the codebase.
*   [X] You have updated any documentation in the source code comments for APIs
that you may have changed.
*   [X] You have no linter errors to correct after running `yarn lint`.
*   [X] You have run the test suite via `yarn test` and it passed.

### Commit Style

Commit messages should follow the format outlined below:

`prefix: message in present tense`

 Prefix      | Description
------------:|:-------------------------------------------------------------------------
       chore | does not effect the production version of the app in any way.
        deps | add, update, or remove a dependency.
        docs | add, update, or remove documentation. no code changes.
          dx | improve the development experience of lux core.
        feat | a feature or enhancement. can be incredibly small.
         fix | a bug fix for something that was broken.
        perf | add, update, or fix a test.
    refactor | change code, but not functionality.
       style | change code style, like removing whitespace. no functional code changes.
        test | add, update, or fix a test.

### Code Reviews

Once you have submitted a pull request, a member of the core team must review it
before it is merged. We try to review pull requests within 3 days but sometimes
fall behind. Feel free to reach out to someone in the community if you have not received a review after 3 days.

## Helpful Links and Information

Some useful places to look for information are:

*   
*   
*   

*Adapted from [Contributing to Node.js](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md)
and [ThinkUp Security and Data Privacy](http://thinkup.readthedocs.io/en/latest/install/security.html#thinkup-security-and-data-privacy).*
