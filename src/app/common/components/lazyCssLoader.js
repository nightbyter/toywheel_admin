toywheel_admin.directive("head", ["$rootScope", "$compile", function($rootScope, $compile) {
    return {
        restrict: "E",
        link: function(scope, element) {
            var htmlstr = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
            var linkEl = $compile(htmlstr)(scope);
            element.append(linkEl);
            scope.routeStyles = {};
            $rootScope.$on("$routeChangeStart", function(event, next){
                if (!next || !next.$$route || !next.$$route.css) {
                    return;
                }
                if (!Array.isArray(next.$$route.css)) {
                    next.$$route.css = [next.$$route.css];
                }
                angular.forEach(next.$$route.css, function(path) {
                    scope.routeStyles[path] = path;
                });
            });

            setTimeout(function() {
                scope.$apply(function(){
                    for (var filename in _minfiles){
                        var path = _minfiles[filename];
                        if (scope.routeStyles[path]) {
                            continue;
                        }
                        scope.routeStyles[path] = path;
                    }
                })
            }, 3e3);
        }
    }
}])