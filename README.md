picknmix-api
============

The backend of the Pick &amp; Mix Project

## API Methods

All responses are returned in JSON.

### GET /v1/user/:id/searches
Gets a list of sections which the user has added for their account.

Returns an array of objects, each object may contain the following fields (if applicable):
* *term*: An identifier for the section
* *label*: A description of the section to display to users


### POST /v1/user/:id/searches/:term
Posts a search term to a user's saved searches for their acccount.

Returns Status 204

### DELETE /v1/user/:id/searches/:term
Deletes a saved search term from a user's saved searches.

Returns Status 204

### /v1/search/:term
Gets a list of articles in a given section

Returns an array of objects, each object may contain the following fields (if applicable):
* *uuid*: the article's unique identifier
* *url*: A link to the article on ft.com
* *title*: The article's headline
* *summary*: A short snippet from the article
* *image*: The url of the article's image

### /v1/suggest/:query
Gets a list of suggested sections for a given query

Returns an array of objects, each object may contain the following fields (if applicable):
* *term*: An identifier for the section
* *title*: A description of the section to display to users
* *image*: A url for an image illustating the section



## Examples
* http://api.ft-mix.com/v1/search/London
* http://api.ft-mix.com/v1/user/7/searches
* http://api.ft-mix.com/v1/suggest/Obama

## Disaster recovery if the server goes down.

- ssh hack@10.119.133.193
- (see email)
- cd picknmix-api/
- node app.js

If you get the following error - it means it's still running:-

```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
    at errnoException (net.js:884:11)
    at Server._listen2 (net.js:1022:14)
    at listen (net.js:1044:10)
    at Server.listen (net.js:1110:5)
    at Object.<anonymous> (/hack/picknmix-api/app.js:36:24)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
-bash-4.1$ 
```

Also, Sam says: "Just make sure it's running with 'redis-server /etc/redis.conf'".
