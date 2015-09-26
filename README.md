[![Build Status](https://travis-ci.org/zrrrzzt/html-validator-cli.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator-cli)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/html-validator-cli/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/html-validator-cli?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# html-validator-cli
CLI for validating html using [validator.w3.org/nu](http://validator.w3.org/nu/)

## Installation

```sh
$ npm install html-validator-cli -g
```

## Usage

```sh
$ html-validator <url>
```

With file

```sh
$ html-validator --file=path-to-file
```

Optional pass in format for returned data.

Valid options: json, html, xhtml, xml, gnu and text (default).

```sh
$ html-validator <url> --format=gnu
```

Optional pass in another validator.

It needs to expose the same REST interface.

```sh
$ html-validator <url> --validator='http://html5.validator.nu'
```

## Related

- [html-validator](https://github.com/zrrrzzt/html-validator) API for this module