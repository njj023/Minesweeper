msApp.config(['$routeProvider', function($routeProvider) {      
    // Default view
    $routeProvider.otherwise({redirectTo: '/'});
    
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});    
    $routeProvider.when('/start', {templateUrl: 'partials/start.html', controller: 'StartCtrl'});
    $routeProvider.when('/game', {templateUrl: 'partials/game.html', controller: 'GameCtrl'});
}]);

