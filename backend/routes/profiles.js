// include our models
const Profile = require('../models/profile.js')
const Invoice = require('../models/invoice.js')
const mongoose = require('../models/base.js')

// set up our routes for profile.
const profileApi = app => {
  app.get('/profile', (req, res) => {
    // find our profiles
    Profile.find({})
    // add our invoices
    .populate('invoices')
    .then(profiles => {
      console.log(`profiles: `, profiles)
      // render as json.
      res.json(profiles)
    })
    .catch(error => res.json({ error }))
  })

  app.get('/invoice', (req, res) => {
    // find all our invoices
    Invoice.find({})
    .then(invoices => {
      console.log(`invoices: `, invoices)
      // render as json.
      res.json(invoices)
    })
    .catch(error => res.json({ error }))
  })

  app.post('/profile', (req, res) => {
    Profile.create(req.body).then((profile) => {
      res.status(201).json(profile).end()
    })
  })

  app.post('/invoice', (req, res) => {
    Invoice.create(req.body).then((profile) => {
      res.status(201).json(profile).end()
    })
  })

  app.patch('/profile', (req, res) => {
    // const updateObject = req.body
    // const id = req.params.id
    // db.profile.update({_id: '5a5706dd38a4d867a7bda36a'}, { $set: {factoryName: 'BARRRRRRY'} })
    Profile.updateOne({_id: '5a5706dd38a4d867a7bda36a'}, { $set: {factoryName: 'BARRRRRRY'} })
    // console.log(updateObject)
    // console.log(id)
  })

  return app
}

module.exports = profileApi
