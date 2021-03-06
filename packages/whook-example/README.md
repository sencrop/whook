[//]: # ( )
[//]: # (This file is automatically generated by a `metapak`)
[//]: # (module. Do not change it  except between the)
[//]: # (`content:start/end` flags, your changes would)
[//]: # (be overridden.)
[//]: # ( )
# @whook/example
> A basic Whook server

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nfroidure/whook/blob/master/packages/whook-example/LICENSE)
[![NPM version](https://badge.fury.io/js/%40whook%2Fexample.svg)](https://npmjs.org/package/@whook/example)


[//]: # (::contents:start)

This is a basic [Whook](https://github.com/nfroidure/whook)
 server demonstrating the various usages of the Whook framework to build
 REST APIs.

## Usage
To run the server in production:
```sh
npm it
NODE_ENV=production npm start
```

## Dev

Start the server in development mode:
```sh
npm run dev
```

List available commands:
```sh
npx whook ls
```

# Debug
Execute a handler in isolation:
```sh
npm run whook -- handler --name putEcho --parameters '{"body": { "echo": "YOLO!" }}'
```

Debug `whook` internals:
```sh
DEBUG=whook npm run dev
```

Debug `knifecycle` internals (dependency injections issues):
```sh
DEBUG=metapak npm run dev
```

[//]: # (::contents:end)

# Authors
- [Nicolas Froidure](http://insertafter.com/en/index.html)

# License
[MIT](https://github.com/nfroidure/whook/blob/master/packages/whook-example/LICENSE)
