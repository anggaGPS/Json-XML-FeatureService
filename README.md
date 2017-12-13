convert web services into Features services arcgis using koop.js
<<<<<<< HEAD
# Koop-Craiglists
## A provider for the Craigslist Apartment search API

## How to use

You can use this as a plugin to an existing Koop server or use the default server or docker implementations.

## API Example

All data can be accessed at `http://103.85.14.102:81/bmkg/:province/:type/featureserver/0`

Cities follow the url subdomain for Craigslist (https://washingtondc.craigslist.org/)

e.g.
- Bali
- Indonesia
- JawaTimur
- DKIJakarta

Types:
- hu (humadity)
- wd (Wind Direction)
- ws (Wind Speed)
- t (temperature
- weather (weather)


## Test it out
Run server:
- `npm install`
- `npm start`

Example API Query:
- `curl http://103.85.14.102:81/bmkg/:province/:type/featureserver/0/query?returnCountOnly=true`

## With Docker

- `docker build -t koop-provider-craigslist .`
- `docker run -it -p 8080:8080 koop-provider-craigslist`

### In an existing Koop Server
```js
//clean shutdown
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the craigslist Provider
const craigslist = require('koop-craigslist')
koop.register(craigslist)

// Start listening for http traffic
const config = require('config')
const port = config.port || 8080
koop.server.listen(port)
console.log(`Koop Craigslist listening on ${port}`)
```
=======

