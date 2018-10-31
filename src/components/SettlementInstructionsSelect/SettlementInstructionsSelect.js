import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from '@fc/react-playbook'
/* eslint-disable */
import Select from '../Select'

import s from './SettlementInstructionsSelect.scss'

class SettlementInstructionsSelect extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
  }

  state = {
    openModal: false,
    initialCustodianSSI: this.props.initialValue,
    initialCashSSI: this.props.initialValue,
    currentSelectedCustodianSSI: this.props.initialValue,
    currentSelectedCashSSI: this.props.initialValue,
  }

  handleCashDropDownChange = value => {
    this.setState({ currentSelectedCashSSI: value })
  }

  handleCustodyDropDownChange = value => {
    this.setState({ currentSelectedCustodianSSI: value })
  }

  createDetailOptions = allOptions => {
    if (!allOptions) return []
    let newAllOptions = []
    _.each(allOptions, (item, i) => {
      if (!item.detail) return

      const details = item.detail.map((element, index) =>
        _.assign({}, element, {
          disabled: true,
          id: `detail-${item.id}-${index}`,
          name: `${element.label} : ${element.value}`,
        }),
      )
      newAllOptions.push(item)
      newAllOptions = newAllOptions.concat(details)
    })
    return newAllOptions
  }

  render() {
    const { initialValue, allOptionsData, ...rest } = this.props
    //console.log('settlement instruction', this.props)
    const allCashData = this.createDetailOptions(allOptionsData[0])
    const allCustodyData = this.createDetailOptions(allOptionsData[1])

    const custodyDropDownId = this.props.id + '-custody'
    const cashDropDownId = this.props.id + '-cash'

    const {
      openModal,
      currentSelectedCustodianSSI,
      currentSelectedCashSSI,
      initialCustodianSSI,
      initialCashSSI,
    } = this.state

    const cashSSIDisplay = currentSelectedCashSSI
      ? `Cash SSI : ${currentSelectedCashSSI.name}`
      : ''

    const custodySSIDisplay = currentSelectedCustodianSSI
      ? `Custody SSI: ${currentSelectedCustodianSSI.name}`
      : ''

    const show = !(!currentSelectedCustodianSSI && !currentSelectedCashSSI)

    const displayTooltip = (
      <div>
        <div>{cashSSIDisplay}</div>
        <div>{custodySSIDisplay}</div>
      </div>
    )

    return (
      <div className={s.settlementInst}>
        <Tooltip placement="auto" content={displayTooltip} disabled={!show}>
          <a
            onClick={() => {
              this.setState({ openModal: true })
            }}
          >
            {!currentSelectedCustodianSSI &&
              !currentSelectedCashSSI &&
              'Add Settlement Instructions...'}
            <div>{cashSSIDisplay}</div>
            <div>{custodySSIDisplay}</div>
          </a>
        </Tooltip>
        <Modal
          open={openModal}
          onClose={() => {
            this.setState({
              openModal: false,
              currentSelectedCustodianSSI: initialCustodianSSI,
              currentSelectedCashSSI: initialCashSSI,
            })
          }}
          className={s.modal}
        >
          <ModalHeader>Settlement Instructions</ModalHeader>
          <ModalBody>
            <div> Cash SSI </div>

            <Select
              options={allCashData}
              {...rest}
              id={cashDropDownId}
              onChange={this.handleCashDropDownChange}
              value={currentSelectedCashSSI}
              isOptionDisabled={option => option.disabled}
              isClearable
              menuPortalTarget={
                typeof document !== 'undefined' ? document.body : null
              }
            />

            <div style={{ paddingTop: 20 }}> Custody SSI</div>

            <Select
              options={allCustodyData}
              {...rest}
              id={custodyDropDownId}
              onChange={this.handleCustodyDropDownChange}
              value={currentSelectedCustodianSSI}
              isClearable
              isOptionDisabled={option => option.disabled}
              menuPortalTarget={
                typeof document !== 'undefined' ? document.body : null
              }
            />
          </ModalBody>
          <ModalFooter className={s.modalFooter}>
            <Button
              onClick={() => {
                this.setState({
                  openModal: false,
                  currentSelectedCustodianSSI: initialCustodianSSI,
                  currentSelectedCashSSI: initialCashSSI,
                })
              }}
            >
              Cancel
            </Button>
            <Button
              primary
              onClick={() => {
                this.setState({
                  openModal: false,
                  initialCustodianSSI: currentSelectedCustodianSSI,
                  initialCashSSI: currentSelectedCashSSI,
                })
              }}
            >
              Set
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default SettlementInstructionsSelect
