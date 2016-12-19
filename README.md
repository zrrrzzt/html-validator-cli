[![Build Status](https://travis-ci.org/zrrrzzt/html-validator-cli.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator-cli)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/html-validator-cli/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/html-validator-cli?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# html-validator-cli
CLI for validating html using [validator.w3.org/nu](http://validator.w3.org/nu/)

Sends ```Page is valid```to ```STDOUT``` and exits with code 0 if page is valid.

Sends ```Page is not valid``` to ```STDOUT``` and exits with code 1 if page is not valid.

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
$ html-validator --file=<path-to-file>
```

With data

```sh
$ html-validator --data=data
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

Optional pass in strings to ignore

```bash
html-validator <url> --ignore='Error: Stray end tag “div”.' --ignore='Error: Stray end tag “body”.'
```

To get full result from validator use --verbose

```sh
$ html-validator <url> --verbose
```

## Related

- [html-validator](https://github.com/zrrrzzt/html-validator) API for this module

## License
[MIT](LICENSE)