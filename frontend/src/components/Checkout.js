// import our constants
import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { STRIPE_PUBLISHABLE } from '../constants/stripe'
import * as crud from '../api/invoices'
// our API url
const API_URL = `${process.env.REACT_APP_SERVER_URL}`

// set currency AUD for testing possible HKD
const CURRENCY = 'HKD'

// notifier
const notifier = require('node-notifier')

// change our cents to currency
const fromDollarsToCents = amount => amount * 100

// our update invoice function
const updateInvoice = (invoice) => {
  // change the status of the invoice
  invoice.status = 'Approved'
  // show the user
  alert(invoice.status)
  // update the db
  crud.edit(invoice)
}

// success
const successPayment = (data) => {
  console.log({ data })
  // pass the data to update invoice
  updateInvoice(data)
  // update status of invoice
}

// failure
const errorPayment = (data, err) => {
  console.log({ data })
  alert('Payment Error, please try again')
  if (err) {
    console.log(err)
  }
}

// The signed in user pays our payee
const onToken = (invoice, token, amount, payee, description) => {
  console.log('*********')
  console.log({ token, amount, payee, description })
  axios.post(API_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarsToCents(amount),
      destination: {
        // amount less our fee, and our constant payee
        amount: amount,
        account: payee
      }
    })
    // if succesful pass the invoice to success
    .then(successPayment(invoice))
    .catch(errorPayment)
}

// our checkout gets all our details from the invoice
const Checkout = ({ invoice, payee, name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCents(amount)}
    token={(token) => onToken(invoice, token, amount, payee, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout
