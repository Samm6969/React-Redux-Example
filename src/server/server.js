import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { printSchema } from 'graphql'
// import axios from 'axios'

import { logger, stream } from './logger'
import renderApp from './renderApp'
import schema from './schema'
import Context from './Context'

dotenv.config()
const { FNDC_NODE_PORT } = process.env
const app = express()
const staticFilesPath = path.join(__dirname, 'public')

delete process.env.HTTP_PROXY
delete process.env.HTTPS_PROXY

app.enable('trust proxy')
// setup the logger
app.use(morgan('combined', { stream }))
app.use(compression())
app.use(express.static(staticFilesPath))
app.use(
  helmet({
    noCache: true,
    ieNoOpen: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    // noSniff doesn't work with streams
    noSniff: false,
    xssFilter: true,
  }),
)
app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// const baseURL = `http://127.0.0.1:${FNDC_NODE_PORT}`

// app.use((req, res, next) => {
//   axios.defaults.baseURL = baseURL
//   next()
// })

app.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(schema))
})

const Apollo = new ApolloServer({
  schema,
  context: ({ req }) => new Context(req),
  // possible these should be false, they are used for Apollo Engine profiling
  tracing: true,
  cacheControl: true,
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
  uploadsConfig: { maxFileSize: 10 * 1.024e6, maxFiles: 1 },
  formatError: error => {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      message: error.message,
      code: error.originalError && error.originalError.code,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }
  },
})

Apollo.applyMiddleware({ app, path: '/graphql' })

app.get('*', renderApp)

const server = app.listen(FNDC_NODE_PORT, () => {
  logger.info(
    `The express server is running at http://127.0.0.1:${FNDC_NODE_PORT}/`,
  )
  logger.info(`Serving static files from ${staticFilesPath}`)
  logger.info(
    `Looking for index.ejs under ${path.resolve(__dirname, './index.ejs')}`,
  )
  // logger.info(`Axios baseURL=${baseURL}`)
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`)
  logger.info(`BASENAME=${process.env.BASENAME}`)
  logger.info(`API_SERVER=${process.env.API_SERVER}`)
  logger.info(`FNDC_API_PORT=${process.env.FNDC_API_PORT}`)
  logger.info(`FNDC_NODE_PORT=${process.env.FNDC_NODE_PORT}`)
  logger.info(`FC_ENV=${process.env.FC_ENV || process.env.fc_env || 'prod'}`)
})

// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close]
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit()
        })
      } catch (actionError) {
        if (i === actions.length - 1) process.exit()
      }
    })
  }
  if (err) logger.error(err)
  if (options.exit) process.exit()
}

process.on('exit', handleExit.bind(null, { cleanup: true }))
process.on('SIGINT', handleExit.bind(null, { exit: true }))
process.on('SIGTERM', handleExit.bind(null, { exit: true }))
process.on('uncaughtException', handleExit.bind(null, { exit: true }))
