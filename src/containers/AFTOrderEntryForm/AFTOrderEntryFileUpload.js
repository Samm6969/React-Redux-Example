import React, { Component } from 'react'
import download from 'downloadjs'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@fc/react-playbook'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Button from '@fc/react-playbook/src/components/Button'
import withQuery from '../../hoc/withQuery'

const uploadOrdersMutation = gql`
  mutation UploadAftOrders($file: Upload!) {
    uploadAftOrders(file: $file) {
      aftOrderResponsesId
      orderResponses {
        orderRequest {
          id
          accountNumber
          isin
          side
          quantityType
          amount
          currency
        }
        tradeInputValidationErrors {
          errorCode
          errorText
        }
        tradeBusinessRulesValidationErrors {
          errorCode
          errorLevel
          errorMessage
        }
      }
    }
  }
`

const query = gql`
  query AFTOrderEntryFormQuery {
    viewer {
      aftSampleFile
    }
  }
`

@withQuery({
  query,
})
class AFTOrderEntryFileUpload extends Component {
  static propTypes = {
    title: PropTypes.string,
    confirmUploadedOrderEntries: PropTypes.func,
    returnToOrderEntry: PropTypes.func,
    viewer: PropTypes.shape({
      aftSampleFile: PropTypes.string.isRequired,
    }),
  }

  state = {
    selectedFileName: '',
    file: undefined,
  }

  onFileSelection(event) {
    const fileObj = event.target.files[0]
    this.setState({
      selectedFileName: fileObj.name,
      file: fileObj,
    })
  }

  downloadFileClickHandler = () =>
    fetch(this.props.viewer.aftSampleFile, {
      method: 'GET',
      header: { 'Content-Type': 'application/vnd.ms-excel' },
    })
      .then(resp => resp.blob())
      .then(blob => {
        download(blob, 'AftOrderFile.csv')
      })

  onOrderFileUploadComplete = response => {
    // eslint-disable-next-line no-console
    console.log('*** onOrderFileUploadComplete -->>> ', response)
    this.props.confirmUploadedOrderEntries(response)
  }

  onOrderFileUPloadMutationError = e => {
    // eslint-disable-next-line no-console
    console.error('*** onOrderConfirmMutationError -->>> ', e)
  }

  render() {
    const { title } = this.props
    return (
      <Mutation
        mutation={uploadOrdersMutation}
        variables={{
          file: this.state.file,
        }}
        onCompleted={this.onOrderFileUploadComplete}
        onError={this.onOrderFileUPloadMutationError}
      >
        {orderFileUploadMutation => (
          <Card style={{ flex: 1 }}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent style={{ height: '60vh' }}>
              <div style={{ display: 'flex', marginTop: '1rem' }}>
                <input
                  type="text"
                  id="browseFileName"
                  name="browseFileName"
                  defaultValue={this.state.selectedFileName}
                  style={{ width: '100%' }}
                />
                <Button
                  style={{ width: '10%' }}
                  onClick={() => document.getElementById('actFile').click()}
                >
                  Browse...
                </Button>
              </div>
              <input
                type="file"
                style={{ display: 'none' }}
                id="actFile"
                name="actFile"
                onChange={event => this.onFileSelection(event)}
              />
            </CardContent>
            <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                primary
                onClick={orderFileUploadMutation}
                disabled={!this.state.file}
              >
                Submit Orders
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    selectedFileName: '',
                    file: undefined,
                  })
                }
              >
                Reset
              </Button>
              <Button onClick={() => this.downloadFileClickHandler()}>
                Download Sample File
              </Button>
              <Button onClick={this.props.returnToOrderEntry}>
                Back to Orders Entry
              </Button>
            </CardFooter>
          </Card>
        )}
      </Mutation>
    )
  }
}

export default AFTOrderEntryFileUpload
