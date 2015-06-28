toywheel_admin.service("LocalizationService", ["$http", "$rootScope", function ($http, $rootScope) {
    this.init = function (lang) {
        $rootScope.lang = lang;
        var url = "/i18n/" + lang + ".json";
        $http.get(url).success(function (localization) {
            $rootScope.localization = localization;
        })
    }
}]);