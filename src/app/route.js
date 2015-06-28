var toywheel_admin = angular.module('toywheel_admin', [
    'ngRoute',
    'ngResource'
]);

toywheel_admin.config(['$routeProvider',
    function($routeProvider) {
        'use strict';
        $routeProvider.
            when('/start', {
                templateUrl: 'partials/startScreen.html',
                css:_minfiles.start,
                controller: 'StartScreenController'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }
]);