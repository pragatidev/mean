(function () {
  'use strict';

  angular
    .module('speakers.services')
    .factory('SpeakersService', SpeakersService);

  SpeakersService.$inject = ['$resource'];

  function SpeakersService($resource) {
    return $resource('api/speakers/:speakerId', {
      speakerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
