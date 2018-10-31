export default {
  // FundSettlementPlatformErrorText: {
  //   type: 'info',
  //   message:
  //     'Share class requires platform settlement. The settlement must be performed offline.',
  // },
  // FundRoutingTypeNotSupportCashErrorText: {
  //   type: 'info',
  //   message:
  //     'Cash auto settlement is not supported by Fund Order Routing Type.',
  // },
  // FundRoutingTypeNotSupportCustodyErrorText: {
  //   type: 'info',
  //   message:
  //     'Custody auto settlement is not supported by Fund Order Routing Type.',
  // },
  // FundNotSupportCashErrorText: {
  //   type: 'info',
  //   message: 'Fund is not configured for cash automated settlement.',
  // },
  // FundNotSupportCustodyErrorText: {
  //   type: 'info',
  //   message: 'Fund is not configured for custody automated settlement.',
  // },
  // CashSSIFundSSINotAvailableForBuyErrorText: {
  //   type: 'info',
  //   message:
  //     'Provider Cash SSIs are unavailable. Cash payment must be made offline.',
  // },
  // CustodySSIFundSSINotAvailableForBuyErrorText: {
  //   type: 'info',
  //   message:
  //     'Provider Cash SSIs are unavailable. Cash payment must be made offline. Remove Custody SSI to place order.',
  // },
  // AccountCashSSINotAvailableErrorText: {
  //   type: 'info',
  //   message: 'Investor account is not configured for cash auto settlement.',
  // },
  // AccountCustodySSINotAvailableErrorText: {
  //   type: 'info',
  //   message: 'Investor account is not configured for custody auto settlement.',
  // },
  // CashSSISelectionBuyErrorText: {
  //   type: 'info',
  //   message:
  //     'The selected Cash SSI record does not support buy settlement messages.',
  // },
  // CashSSISelectionSellErrorText: {
  //   type: 'info',
  //   message:
  //     'Warning: The selected Cash SSI record does not support sell settlement messages. No Cash receipt message will be generated.',
  // },
  // CustodySSISelectionBuyErrorText: {
  //   type: 'info',
  //   message:
  //     'The selected Custody SSI record does not support buy settlement messages.',
  // },
  // CustodySSISelectionSellErrorText: {
  //   type: 'info',
  //   message:
  //     'The selected Custody SSI record does not support sell settlement messages.',
  // },
  PaymentDetailNotAvailableErrorText: {
    type: 'info',
    message:
      'No authenticated electronic payment instructions are available for currency and account. Any net redemption payment will be made using the payment instructions on file.',
  },
  PaymentDetailNotSelectedErrorText: {
    type: 'info',
    message:
      'No authenticated electronic payment instruction has been selected for this transaction. If this transaction is not part of a net settlement, please select the appropriate payment instruction from the menu below.',
  },
  PaymentDetailNotSelectedForConfirmErrorText: {
    type: 'info',
    message:
      'No authenticated electronic payment instruction has been selected for this transaction. If this transaction is not part of a net settlement, please return to order entry, select the appropriate payment instruction from the menu below.',
  },
}
