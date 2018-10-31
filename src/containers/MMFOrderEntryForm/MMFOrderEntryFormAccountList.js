import React, { PureComponent } from 'react'
import { FormSection } from 'redux-form'
import PropTypes from 'prop-types'
import MMFOrderEntryFormOrder from './MMFOrderEntryFormOrder'

import { MMFOrderEntryFormConsumer } from './MMFOrderEntryFormContext'

class MMFOrderEntryFormAccountList extends PureComponent {
  static propTypes = {
    fields: PropTypes.shape({
      map: PropTypes.func,
    }),
  }

  render() {
    const { fields, ...rest } = this.props
    return fields.map((member, index) => {
      const account = fields.get(index)
      if (!account.account.executePermission) {
        return null
      }
      return (
        <MMFOrderEntryFormConsumer key={member}>
          {({ onOrderSelectionChange, setDefaultSSI, accountType }) => (
            <FormSection name={member}>
              <MMFOrderEntryFormOrder
                member={member}
                data={account}
                {...rest}
                onOrderSelectionChange={onOrderSelectionChange}
                setDefaultSSI={setDefaultSSI}
                accountType={accountType}
              />
            </FormSection>
          )}
        </MMFOrderEntryFormConsumer>
      )
    })
  }
}

export default MMFOrderEntryFormAccountList
