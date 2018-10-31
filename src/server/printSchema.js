/* eslint-disable no-console */
import { printSchema, introspectionQuery } from 'graphql/utilities'
import { graphql } from 'graphql'
import fs from 'fs'
import path from 'path'

import schema from './schema'
// eslint-disable-next-line
;(async function() {
  try {
    const cb = schemaPath => err => {
      if (err) {
        console.error(err)
      }
      console.log(`GraphQL schema was generated ${schemaPath}`)
    }

    const typeSchema = printSchema(schema)
    const typeSchemaPath = path.resolve(__dirname, '../../schema.graphql')
    fs.writeFile(typeSchemaPath, typeSchema, cb(typeSchemaPath))

    const jsonSchema = await graphql(schema, introspectionQuery)

    const jsonSchemaPath = path.resolve(__dirname, '../../graphql.schema.json')
    fs.writeFile(jsonSchemaPath, JSON.stringify(jsonSchema), cb(jsonSchemaPath))

    // eslint-disable-next-line no-underscore-dangle
    const filteredData = jsonSchema.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    )

    const fragmentTypes = {
      __schema: {
        types: filteredData,
      },
    }

    const fragmentTypesPath = path.resolve(
      __dirname,
      '../../fragmentTypes.json',
    )

    fs.writeFile(fragmentTypesPath, JSON.stringify(fragmentTypes), err => {
      if (err) console.error(err)
      else console.log(`Fragment Types file was generated ${fragmentTypesPath}`)
    })
  } catch (error) {
    console.error(error)
    console.error(error.stack)
  }
})()
