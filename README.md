
# vsf-contentful-api

Extends the [Vue Storefront API](https://github.com/DivanteLtd/vue-storefront-api) witht the Contentful API

### Requirements
` npm -i contentful --save

### vsf-contentful-api Tech

vsf-contentful-api uses a number of open source projects to work properly:

* [contentful] - JavaScript SDK to retrieve entries from Contentful

### Installation

vsf-contentful-api requires [Contentful SDK](https://github.com/contentful/contentful.js) v7+ to run.

Install the dependencies.

```sh
$ cd vue-storefront-api
$ npm i contentful --save
```

Edit vue-storefront-api/config/local.json

```json
"registeredExtensions": [
	"contentful-api"
]
```

```json
"extensions": {
	"contentful": {
		"space": "YOUR-SPACE-ID",
		"accessToken": "YOUR-ACCESS-TOKEN"
	}
}
]
```

### Requests

```
/{apiEndPoint}/ext/contentful-api/entries
```

See: [https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/assets/assets-collection](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/assets/assets-collection)

```
/{apiEndPoint}/ext/contentful-api/entry
```

Accepts: by, id, slug, content_type
* by: default null, can be "slug"
* id: if by null query with id
* slug: if by slug query by slug
* content_type required when quering for slug

See: [https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entry](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entry)
