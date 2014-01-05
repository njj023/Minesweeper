msApp.controller('GameCtrl', function($scope, Game) {
  	$scope.rowLength = Game.rows;
  	$scope.colLength = Game.cols;
  	$scope.numMines = Game.numMines;

    $scope.setGrid = function() {
		$scope.grid = new Array();

		for (var i = 0; i < $scope.rowLength; i++) {
			$scope.grid[i] = new Array($scope.colLength);
		}

		$scope.initializeGrid();

		$scope.setMines();
    };

    $scope.initializeGrid =  function() {
    	for (var i = 0; i < $scope.grid.length; i++) {
    		
    		for (var j = 0; j < $scope.colLength; j++) {
    			$scope.grid[i][j] = {
    				clicked: false,
    				val: null,
    				adjNum: null
    			};
    		}
    	}
    };
    
    $scope.setMines = function() {
    	var setMines = [];
    	for (var i = 0; i < $scope.numMines; i++ ) {
    		
    		var randRow = Math.floor( (Math.random() * $scope.rowLength) );
    		var randCol = Math.floor( (Math.random() * $scope.colLength) );

    		if (!$scope.grid[randRow][randCol].val !== 'x')
    			$scope.grid[randRow][randCol].val = 'x';
    	}
    };

    $scope.containsMine = function(row, col) {
    	return $scope.grid[row][col].val === 'x';
    };

    $scope.renderMines = function(row, col) {
		if (!$scope.grid[row][col].clicked) {
			if ($scope.grid[row][col].val === 'x') {
				$scope.lost = true;
				return;
			}

			$scope.grid[row][col].adjNum = $scope.calcAdjNum(row, col);
			$scope.won = $scope.checkWin();
		}
    };

    $scope.calcAdjNum = function(row, col) {
    	var counter = 0,
    		grid = $scope.grid;

		// check top row
		if (row != 0) {
			if (grid[row - 1][col - 1].val === "x")
				counter++;
			if (grid[row - 1][col].val === "x")
				counter++;
			if (grid[row - 1][col + 1].val === "x")
				counter++;
		}

		// check current row
		if (grid[row][col - 1].val === "x")
			counter++;
		if (grid[row][col + 1].val === "x")
			counter++;
			

		// check bottom row
		if (row != $scope.rowLength - 1) {
			if (grid[row + 1][col - 1].val === "x")
				counter++;
			if (grid[row + 1][col].val === "x")
				counter++;
			if (grid[row + 1][col + 1].val === "x")
				counter++;
		}

    	return counter;
    }

    $scope.checkWin = function() {
    	return false;
    };

    $scope.setGrid();
});
