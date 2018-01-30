'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');


module.exports = function(router){

  router.get('/note/:_id', bodyParser, (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(item => res.status(200).json(item))
    .catch(err => errorHandler(err, res))
  });

  router.get('/note', bodyParser, (req, res) => {
    // see how data is returned from fetchAll
    storage.fetchAll('note')
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(items => res.status(200).json(items))
    .catch(err => errorHandler(err, res))
  });

  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
    .then(note => storage.create('note', note))
    .then(item => res.status(201).json(item))
    .catch(err => errorHandler(err, res))
  });

  router.put('/note/:_id', bodyParser, (req, res) => {
    storage.update('note', req.params._id)
    // nothing returns
    .then(item => res.status(204))
    .catch(err => errorHandler(err, res))
  });

  router.delete('/note/:_id', bodyParser, (req, res) => {
    storage.deleteOne('note', req.params._id)
    .then(item => res.status(200))
    .catch(err => errorHandler(err, res))
  });
}
