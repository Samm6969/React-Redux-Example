import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import _ from 'lodash'

import s from './AccountSelector.scss'
import withQuery from '../../hoc/withQuery'
import { getLongAccount } from '../../utils/Stringify'
import { ACCOUNT_TYPES } from '../../enums'
import { SelectField } from '../../fields'

const query = gql`
  query AccountSelectorQuery($institutionLocationId: ID) {
    viewer {
      accountsByInstitutionLocation(
        institutionLocationId: $institutionLocationId
      ) {
        id
        name
        accountType
        client {
          name
        }
        division {
          name
        }
        tradeInstitution {
          location {
            name
          }
          institution {
            name
          }
        }
      }
    }
  }
`

@withQuery({
  query,
})
@reduxForm({
  form: 'accountSelector',
})
class AccountSelector extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    viewer: PropTypes.shape({
      accountsByInstitutionLocation: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          accountType: PropTypes.string.isRequired,
          client: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
          division: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
          tradeInstitution: PropTypes.shape({
            id: PropTypes.string.isRequried,
            institution: PropTypes.shape({
              name: PropTypes.string.isRequried,
            }).isRequried,
            location: PropTypes.shape({
              name: PropTypes.string.isRequried,
            }).isRequried,
          }),
        }),
      ),
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    accountType: PropTypes.oneOf([ACCOUNT_TYPES.FULLY_DISCLOSED]).isRequired,
  }

  static defaultProps = {
    viewer: {
      accountsByInstitutionLocation: [],
    },
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      isLoading,
      reset,
      variables,
      accountType: accountTypeProp,
      viewer: { accountsByInstitutionLocation },
    } = nextProps
    const {
      institutionLocationId: prevInstitutionLocationId,
      options: prevOptions,
    } = prevState
    let options = prevOptions
    let institutionLocationId = prevInstitutionLocationId

    if (
      !isLoading &&
      prevInstitutionLocationId !== variables.institutionLocationId
    ) {
      reset()
      // eslint-disable-next-line prefer-destructuring
      institutionLocationId = variables.institutionLocationId
      options = _.sortBy(
        _.filter(
          accountsByInstitutionLocation,
          ({ accountType }) => accountType === accountTypeProp,
        ),
        ['division.name', 'client.name', 'name'],
      )
    }

    return {
      institutionLocationId,
      options,
    }
  }

  render() {
    const { isLoading, handleSubmit } = this.props
    const { options } = this.state

    return (
      <form onSubmit={handleSubmit} className={s.form}>
        <Field
          name="account"
          options={options}
          label="Account(s)"
          inline
          placeholder={isLoading ? 'Loading...' : 'All Accounts'}
          isLoading={isLoading}
          getOptionLabel={getLongAccount}
          getOptionValue={({ id }) => id}
          isClearable
          component={SelectField}
        />
      </form>
    )
  }
}

export default AccountSelector
