import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import s from './TradeOnBehalfOfSelector.scss'
import { SelectField } from '../../fields'

const query = gql`
  query TradeOnBehalfOfSelectorQuery {
    viewer {
      institutionLocations {
        id
        self
        location {
          name
        }
        institution {
          name
        }
      }
    }
  }
`

@reduxForm({
  form: 'tradeOnBehalfOf',
})
class TradeOnBehalfOfSelector extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  renderOptionLabel = ({ location, institution, self }) => {
    const label = `${location.name}.${institution.name}`
    if (self) {
      return <strong>{label} (Default)</strong>
    }
    return label
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return null
          }
          if (error) return `Error! ${error.message}`
          const {
            viewer: { institutionLocations },
          } = data
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <Field
                name="tradeOnBehalfOf"
                label="Act for"
                showDelimiter
                inline
                isLoading={loading}
                options={institutionLocations}
                placeholder={loading ? 'Loading...' : 'All Institutions'}
                isClearable
                getOptionLabel={this.renderOptionLabel}
                getOptionValue={({ id }) => id}
                component={SelectField}
              />
            </form>
          )
        }}
      </Query>
    )
  }
}

export default TradeOnBehalfOfSelector
