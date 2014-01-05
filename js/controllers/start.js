msApp.controller('StartCtrl', function($scope, $location, Game) {
    $scope.setGame = function(rows, cols, numMines) {
    	Game.rows = rows;
    	Game.cols = cols;
    	Game.numMines = numMines;
    	$location.path('/game');
    };
});
