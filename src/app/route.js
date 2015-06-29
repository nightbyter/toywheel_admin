var toywheel_admin = angular.module('toywheel_admin', [
    'ngRoute',
    'ngResource',
    'ngMaterial'
]);

toywheel_admin.config(['$routeProvider',
    function ($routeProvider) {
        'use strict';
        $routeProvider.
            when('/start', {
                templateUrl: 'partials/startScreen.html',
                css: _minfiles.start,
                controller: 'StartScreenController'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }
]).run(["LocalizationService", function (LocalizationService) {
    var lang = utils.getLang();
    LocalizationService.init(lang);
}]);