(function () {
  'use strict';

  angular
    .module('speakers.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('speakers', {
        abstract: true,
        url: '/speakers',
        template: '<ui-view/>'
      })
      .state('speakers.list', {
        url: '',
        templateUrl: 'modules/speakers/client/views/list-speakers.client.view.html',
        controller: 'SpeakersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Speakers List'
        }
      })
      .state('speakers.create', {
        url: '/create',
        templateUrl: 'modules/speakers/client/views/form-speaker.client.view.html',
        controller: 'SpeakersController',
        controllerAs: 'vm',
        resolve: {
          speakerResolve: newSpeaker
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Speakers Create'
        }
      })
      .state('speakers.edit', {
        url: '/:speakerId/edit',
        templateUrl: 'modules/speakers/client/views/form-speaker.client.view.html',
        controller: 'SpeakersController',
        controllerAs: 'vm',
        resolve: {
          speakerResolve: getSpeaker
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Speaker {{ speakerResolve.title }}'
        }
      })
      .state('speakers.view', {
        url: '/:speakerId',
        templateUrl: 'modules/speakers/client/views/view-speaker.client.view.html',
        controller: 'SpeakersController',
        controllerAs: 'vm',
        resolve: {
          speakerResolve: getSpeaker
        },
        data: {
          pageTitle: 'Speaker {{ speakerResolve.title }}'
        }
      });
  }

  getSpeaker.$inject = ['$stateParams', 'SpeakersService'];

  function getSpeaker($stateParams, SpeakersService) {
    return SpeakersService.get({
      speakerId: $stateParams.speakerId
    }).$promise;
  }

  newSpeaker.$inject = ['SpeakersService'];

  function newSpeaker(SpeakersService) {
    return new SpeakersService();
  }
}());
