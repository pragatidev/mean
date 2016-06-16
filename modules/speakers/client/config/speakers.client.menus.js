(function () {
  'use strict';

  angular
    .module('speakers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Speakers',
      state: 'speakers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'speakers', {
      title: 'List Speakers',
      state: 'speakers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'speakers', {
      title: 'Create Speaker',
      state: 'speakers.create',
      roles: ['user']
    });
  }
}());
