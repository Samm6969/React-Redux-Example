import React from 'react'
import path from 'path'
import os from 'os'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import { StaticRouter } from 'react-router-dom'
import ejs from 'ejs'
// import axios from 'axios'
import { logger } from './logger'

import App from '../containers/App'
import { createStore } from '../store'
import getTimeZoneForCountry from './getTimeZoneForCountry'
import UserSettingsForm from '../containers/UserSettingsForm'

// eslint-disable-next-line consistent-return
const renderApp = async (req, res, next) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      sm_timetoexpire,
      smtimetoexpire,
      fc_authstring: authString,
      fc_othercountries: otherCountries,
      email,
      fullname: fullName,
      usercountry: userCountry,
      userid: userId,
      username,
    } = req.headers

    if (!userId) {
      return res.send(
        'you need to provider a userId that is contained within users.dev.js, eg. userId=bos.ssgademo.investor01',
      )
    }

    // eslint-disable-next-line camelcase
    const timeToExpire = Number(smtimetoexpire || sm_timetoexpire)

    const initialState = {
      session: {
        timeToExpire,
      },
      user: {
        otherCountries,
        email,
        fullName,
        userCountry,
        userId,
        username,
        authString,
        permission: {},
        timeZone: getTimeZoneForCountry(userCountry),
      },
      // exchangeId,
      environment: process.env.FC_ENV || process.env.fc_env || 'prod',
      settings: {
        numberFormat: UserSettingsForm.numberFormatOptions[0],
        dateFormat: UserSettingsForm.dateFormatOptions[0],
        timeZone: getTimeZoneForCountry(userCountry),
        twentyFourHourTime: true,
      },
    }

    // This context object contains the results of the render
    const context = {}
    const store = createStore(initialState)
    const stream = renderToNodeStream(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
          basename={process.env.BASENAME}
        >
          <App />
        </StaticRouter>
      </Provider>,
    )

    const preloadedState = serialize(store.getState())

    ejs.renderFile(
      path.resolve(__dirname, './index.ejs'),
      { preloadedState, basename: process.env.BASENAME },
      {},
      (err, html) => {
        if (err) {
          logger.error(err)
          next(err)
        } else {
          // context.url will contain the URL to redirect to if a <Redirect> was used
          const { status = 200, url } = context
          if (url) {
            res.redirect(url)
            res.end()
          } else {
            const [htmlStart, htmlEnd] = html.split('<!--content-->')
            res.writeHead(status)
            res.write(htmlStart)
            stream.pipe(
              res,
              { end: false },
            )
            stream.on('error', strerr => {
              logger.error(strerr)
              next(strerr)
            })
            stream.on('end', () => {
              res.write(htmlEnd)
              res.write(`<!-- HOST=${os.hostname()} -->`)
              res.write(`<!-- NODE_ENV=${process.env.NODE_ENV} -->`)
              res.write(`<!-- BASENAME=${process.env.BASENAME} -->`)
              res.write(`<!-- FNDC_API_PORT=${process.env.FNDC_API_PORT} -->`)
              res.write(`<!-- FNDC_NODE_PORT=${process.env.FNDC_NODE_PORT} -->`)
              res.write(
                `<!-- FC_ENV=${process.env.FC_ENV ||
                  process.env.fc_env ||
                  'prod'} -->`,
              )
              res.end()
            })
          }
        }
      },
    )
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

export default renderApp
