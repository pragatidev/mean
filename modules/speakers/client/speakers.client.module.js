(function (app) {
  'use strict';

  app.registerModule('speakers', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('speakers.services');
  app.registerModule('speakers.routes', ['ui.router', 'core.routes', 'speakers.services']);
}(ApplicationConfiguration));
