# API
## Functions

<dl>
<dt><a href="#initHTTPTransaction">initHTTPTransaction(services)</a> ⇒ <code><a href="#HTTPTransaction">Promise.&lt;HTTPTransaction&gt;</a></code></dt>
<dd><p>Instantiate the httpTransaction service</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#HTTPTransaction">HTTPTransaction</a></dt>
<dd></dd>
</dl>

<a name="initHTTPTransaction"></a>

## initHTTPTransaction(services) ⇒ [<code>Promise.&lt;HTTPTransaction&gt;</code>](#HTTPTransaction)
Instantiate the httpTransaction service

**Kind**: global function  
**Returns**: [<code>Promise.&lt;HTTPTransaction&gt;</code>](#HTTPTransaction) - A promise of the httpTransaction function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| services | <code>Object</code> |  | The services to inject |
| [services.TIMEOUT] | <code>Number</code> | <code>30000</code> | A number indicating how many ms the transaction  should take to complete before being cancelled. |
| [services.TRANSACTIONS] | <code>Object</code> | <code>{}</code> | A hash of every current transactions |
| [services.time] | <code>function</code> |  | A timing function |
| services.delay | <code>Object</code> |  | A delaying service |
| [services.log] | <code>function</code> |  | A logging function |
| [services.uniqueId] | <code>function</code> |  | A function returning unique identifiers |

**Example**  
```js
import initHTTPTransaction from '@whook/http-transaction';

const httpTransaction = await initHTTPTransaction({
  log: console.log.bind(console),
  time: Date.now.bind(Date),
});
```
<a name="initHTTPTransaction..httpTransaction"></a>

### initHTTPTransaction~httpTransaction(req, res) ⇒ <code>Array</code>
Create a new HTTP transaction

**Kind**: inner method of [<code>initHTTPTransaction</code>](#initHTTPTransaction)  
**Returns**: <code>Array</code> - The normalized request and the HTTP
transaction created in an array.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>HTTPRequest</code> | A raw NodeJS HTTP incoming message |
| res | <code>HTTPResponse</code> | A raw NodeJS HTTP response |

<a name="HTTPTransaction"></a>

## HTTPTransaction
**Kind**: global typedef  

* [HTTPTransaction](#HTTPTransaction)
    * [.id](#HTTPTransaction.id)
    * [.start](#HTTPTransaction.start) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.catch](#HTTPTransaction.catch) ⇒ <code>Promise</code>
    * [.end](#HTTPTransaction.end) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="HTTPTransaction.id"></a>

### HTTPTransaction.id
Id of the transaction

**Kind**: static property of [<code>HTTPTransaction</code>](#HTTPTransaction)  
<a name="HTTPTransaction.start"></a>

### HTTPTransaction.start ⇒ <code>Promise.&lt;Object&gt;</code>
Start the transaction

**Kind**: static property of [<code>HTTPTransaction</code>](#HTTPTransaction)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise to be resolved with the signed token.  

| Param | Type | Description |
| --- | --- | --- |
| buildResponse | <code>function</code> | A function that builds a response |

<a name="HTTPTransaction.catch"></a>

### HTTPTransaction.catch ⇒ <code>Promise</code>
Catch a transaction error

**Kind**: static property of [<code>HTTPTransaction</code>](#HTTPTransaction)  
**Returns**: <code>Promise</code> - A promise to be resolved with the signed token.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | A function that builds a response |

<a name="HTTPTransaction.end"></a>

### HTTPTransaction.end ⇒ <code>Promise.&lt;Object&gt;</code>
End the transaction

**Kind**: static property of [<code>HTTPTransaction</code>](#HTTPTransaction)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise to be resolved with the signed token.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | A response for the transaction |

