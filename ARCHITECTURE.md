[//]: # ( )
[//]: # (This file is automatically generated by the `jsarch`)
[//]: # (module. Do not change it elsewhere, changes would)
[//]: # (be overriden.)
[//]: # ( )
# Architecture Notes



## Server initialization

Whook exposes a `runServer` function to programmatically spawn
 its server.

[See in context](./src/index.js#L21-L24)



## Port detection

If no `PORT` configuration is specified in dependencies nor in ENV,
 this service detects a free port automagically.

[See in context](./src/services/PORT.js#L5-L8)



## IP detection

If no `HOST` configuration is specified in dependencies nor in ENV,
 this service detects the machine host automagically.

[See in context](./src/services/HOST.js#L5-L8)



### Root injections

* We need to inject `httpServer` and `process` to bring life to our
 *  server. We also inject `log` for logging purpose and custom other
 *  injected name that were required upfront.

[See in context](./src/index.js#L35-L39)



## Server environment

The Whook `prepareServer` function aims to provide the complete
 server environment without effectively running it. It allows
 to use that environment for CLI or build purposes. It also
 provides a chance to override some services/constants
 before actually running the server.

[See in context](./src/index.js#L49-L55)



### `PWD` env var

The Whook server heavily rely on the process working directory
 to dynamically load contents. We are making it available to
 the DI system as a constant.

[See in context](./src/index.js#L64-L68)



### `NODE_ENV` env var

Whook has different behaviors depending on the `NODE_ENV` value
 consider setting it to production before shipping.

[See in context](./src/index.js#L72-L75)



### Logging

Whook's default logger write to the NodeJS default console
 except for debugging messages where it use the `debug`
 module so that you can set the `DEBUG` environment
 variable to `whook` and get debug messages in output.

[See in context](./src/index.js#L79-L84)



### Initializers

Whook's embed a few default initializers proxied from
 `common-services`, `swagger-http-router` or it own
 `src/services` folder. It can be wrapped or overriden
 at will.

[See in context](./src/index.js#L98-L103)



## Environment service

The `ENV` service add a layer of configuration over just using
 node's `process.env` value. Beware that `PWD` and `NODE_ENV` are
 guaranteed to be the exact same than the injected constants.
 It is up to you to decide upstream if you set them via the
 `process.env.NODE_ENV` and `process.cwd()` values or not.

[See in context](./src/services/ENV.js#L7-L13)



### Environment isolation

Per default, Whook takes the process environment as is
 but since it could lead to leaks when building for
 AWS Lambda or Google Cloud Functions one can isolate
 the process env when building.

[See in context](./src/services/ENV.js#L44-L49)



### `.env.NODE_ENV` files

You may need to keep some secrets out of your Git
 history. Whook uses `dotenv` to provide your such
 ability.

[See in context](./src/services/ENV.js#L55-L59)



## `

$autoload` service
The default Whook autoloader provides a simple way to
 load the constants, services and handlers of a Whook
 project.

[See in context](./src/services/_autoload.js#L9-L13)



### Configuration auto loading

Loading the configuration files is done according to the `NODE_ENV`
 environment variable. It basically requires a configuration hash
 where the keys are Knifecycle constants.

Let's load the configuration files as a convenient way
 to create constants on the fly

[See in context](./src/services/_autoload.js#L58-L65)



### Wrappers auto loading

We cannot inject the `WRAPPERS` in the auto loader when
 it is dynamically loaded so doing during the auto loader
 initialization if needed.

[See in context](./src/services/_autoload.js#L76-L80)



### API auto loading

We cannot inject the `API` in the auto loader since
 it is dynamically loaded so doing during the auto loader
 initialization.

[See in context](./src/services/_autoload.js#L93-L97)



### Constants

First of all the autoloader looks for constants in the
 previously loaded configuration.

[See in context](./src/services/_autoload.js#L134-L137)



### Handlers map

Here, we build the handlers map by injecting every handler required
 by the API.

[See in context](./src/services/_autoload.js#L146-L149)



### Service/handler loading

Finally, we either require the handler/service module if
 none of the previous strategies applyed.

[See in context](./src/services/_autoload.js#L176-L179)
