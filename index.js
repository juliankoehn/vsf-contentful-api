import { Router } from 'express'
import { apiStatus } from '../../../lib/util';
import request from 'request'
import * as Contentful from 'contentful'

module.exports = ({ config }) => {
  const api = Router ()

  const { space, accessToken } = config.extensions.contentful
  const client = Contentful.createClient({
    space: space,
    accessToken: accessToken
  })

  api.get('/entries', (req, res) => {
    const query = req.query
    client.getEntries({
      query
    }).then((result) => {
      apiStatus(res, result, 200)
    }).catch((err) => {
      apiStatus(res, err, 500)
    })
  })

  api.get('/entry', (req, res) => {
    const { by, id, slug, content_type } = req.query

    if (by === 'slug') {
      if (!content_type) {
        let error = 'content_type missing'
        apiStatus(res, error, 500)
        return
      }
      if (!slug) {
        let error = 'Filtering by: Slug but SLUG missing'
        apiStatus(res, error, 500)
        return
      }
      // making sure that content_type and slug is defined before query to contentful api
      client.getEntries({
        content_type: content_type,
        'fields.slug': slug
      }).then((result) => {
        apiStatus(res, result, 200);
      }).catch((err) => {
        apiStatus(res, err, 500);
      })
    } else {
      // no slug filter is defined so we are getting the post by ID
      // dev-note: 4ChsL8vVZdKa4L3uZ7WSz
      if (!id) {
        let error = 'no id provided'
        apiStatus(res, error, 500)
        return
      } else {
        // id is given, let's do the Request
        // reference: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entry
        client.getEntry(id)
          .then((entry) => apiStatus(res, entry, 200))
          .catch((err) => apiStatus(res, err, 500))
      }

    }
  })

  return api
}
