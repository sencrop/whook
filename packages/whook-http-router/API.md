# API
## Functions

<dl>
<dt><a href="#initErrorHandler">initErrorHandler(services)</a> ⇒ <code>Promise</code></dt>
<dd><p>Initialize an error handler for the
HTTP router</p>
</dd>
<dt><a href="#initHTTPRouter">initHTTPRouter(services)</a> ⇒ <code>Promise</code></dt>
<dd><p>Initialize an HTTP router</p>
</dd>
<dt><a href="#flattenSwagger">flattenSwagger(API)</a> ⇒ <code>Object</code></dt>
<dd><p>Flatten the inputed Swagger file
 object</p>
</dd>
<dt><a href="#getSwaggerOperations">getSwaggerOperations(API)</a> ⇒ <code>Array</code></dt>
<dd><p>Return a Swagger operation in a more
 convenient way to iterate onto its
 operations</p>
</dd>
</dl>

<a name="initErrorHandler"></a>

## initErrorHandler(services) ⇒ <code>Promise</code>
Initialize an error handler for the
HTTP router

**Kind**: global function  
**Returns**: <code>Promise</code> - A promise of a function to handle errors  

| Param | Type | Description |
| --- | --- | --- |
| services | <code>Object</code> | The services the server depends on |
| [services.ENV] | <code>Object</code> | The services the server depends on |
| [services.DEBUG_NODE_ENVS] | <code>Array</code> | The environnement that activate debugging  (prints stack trace in HTTP errors responses) |
| [services.STRINGIFYERS] | <code>Object</code> | The synchronous body stringifyers |

<a name="initErrorHandler..errorHandler"></a>

### initErrorHandler~errorHandler(transactionId, responseSpec, err) ⇒ <code>Promise</code>
Handle an HTTP transaction error and
map it to a serializable response

**Kind**: inner method of [<code>initErrorHandler</code>](#initErrorHandler)  
**Returns**: <code>Promise</code> - A promise resolving when the operation
 completes  

| Param | Type | Description |
| --- | --- | --- |
| transactionId | <code>String</code> | A raw NodeJS HTTP incoming message |
| responseSpec | <code>Object</code> | The response specification |
| err | <code>HTTPError</code> | The encountered error |

<a name="initHTTPRouter"></a>

## initHTTPRouter(services) ⇒ <code>Promise</code>
Initialize an HTTP router

**Kind**: global function  
**Returns**: <code>Promise</code> - A promise of a function to handle HTTP requests.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| services | <code>Object</code> |  | The services the server depends on |
| services.API | <code>Object</code> |  | The Swagger definition of the API |
| services.HANDLERS | <code>Object</code> |  | The handlers for the operations decribe  by the Swagger API definition |
| [services.ENV] | <code>Object</code> |  | The services the server depends on |
| [services.DEBUG_NODE_ENVS] | <code>Array</code> |  | The environnement that activate debugging  (prints stack trace in HTTP errors responses) |
| [services.BUFFER_LIMIT] | <code>String</code> |  | The maximum bufferisation before parsing the  request body |
| [services.PARSERS] | <code>Object</code> |  | The synchronous body parsers (for operations  that defines a request body schema) |
| [services.STRINGIFYERS] | <code>Object</code> |  | The synchronous body stringifyers (for  operations that defines a response body  schema) |
| [services.ENCODERS] | <code>Object</code> |  | A map of encoder stream constructors |
| [services.DECODERS] | <code>Object</code> |  | A map of decoder stream constructors |
| [services.QUERY_PARSER] | <code>Object</code> |  | A query parser with the `strict-qs` signature |
| [services.log] | <code>function</code> | <code>noop</code> | A logging function |
| services.httpTransaction | <code>function</code> |  | A function to create a new HTTP transaction |

<a name="flattenSwagger"></a>

## flattenSwagger(API) ⇒ <code>Object</code>
Flatten the inputed Swagger file
 object

**Kind**: global function  
**Returns**: <code>Object</code> - The flattened Swagger definition  

| Param | Type | Description |
| --- | --- | --- |
| API | <code>Object</code> | An Object containing a parser Swagger JSON |

<a name="getSwaggerOperations"></a>

## getSwaggerOperations(API) ⇒ <code>Array</code>
Return a Swagger operation in a more
 convenient way to iterate onto its
 operations

**Kind**: global function  
**Returns**: <code>Array</code> - An array of all the Swagger operations  

| Param | Type | Description |
| --- | --- | --- |
| API | <code>Object</code> | The flattened Swagger defition |

**Example**  
```js
getSwaggerOperations(API)
.map((operation) => {
   const { path, method, operationId, parameters } = operation;

  // Do something with that operation
});
```