'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Speaker = mongoose.model('Speaker'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an speaker
 */
exports.create = function (req, res) {
  var speaker = new Speaker(req.body);
  speaker.user = req.user;

  speaker.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(speaker);
    }
  });
};

/**
 * Show the current speaker
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var speaker = req.speaker ? req.speaker.toJSON() : {};

  // Add a custom field to the speaker, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Speaker model.
  speaker.isCurrentUserOwner = !!(req.user && speaker.user && speaker.user._id.toString() === req.user._id.toString());

  res.json(speaker);
};

/**
 * Update an speaker
 */
exports.update = function (req, res) {
  var speaker = req.speaker;

  speaker.title = req.body.title;
  speaker.content = req.body.content;

  speaker.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(speaker);
    }
  });
};

/**
 * Delete an speaker
 */
exports.delete = function (req, res) {
  var speaker = req.speaker;

  speaker.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(speaker);
    }
  });
};

/**
 * List of speakers
 */
exports.list = function (req, res) {
  Speaker.find().sort('-created').populate('user', 'displayName').exec(function (err, speakers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(speakers);
    }
  });
};

/**
 * speaker middleware
 */
exports.speakerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'speaker is invalid'
    });
  }

  Speaker.findById(id).populate('user', 'displayName').exec(function (err, speaker) {
    if (err) {
      return next(err);
    } else if (!speaker) {
      return res.status(404).send({
        message: 'No speaker with that identifier has been found'
      });
    }
    req.speaker = speaker;
    next();
  });
};
