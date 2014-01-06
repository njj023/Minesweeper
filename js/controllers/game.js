msApp.controller('GameCtrl', function($scope, $location, Game) {
    if (!Game.rows || !Game.cols || !Game.numMines) {
        $location.path('/start');
    }

    $scope.startGame = function() {
		$scope.rowLength = parseInt(Game.rows);
        $scope.colLength = parseInt(Game.cols);
        $scope.numMines = parseInt(Game.numMines);
        $scope.numClicked = 0;
        $scope.grid = new Array();
        $scope.won = false;
        $scope.lost = false;
        $scope.showMines = false;

		for (var i = 0; i < $scope.rowLength; i++) {
			$scope.grid[i] = new Array($scope.colLength);
		}

		$scope.initializeGrid();
		$scope.setMines();
        $scope.shuffleMines();
    };

    $scope.initializeGrid =  function() {
    	for (var i = 0; i < $scope.grid.length; i++) {
    		
    		for (var j = 0; j < $scope.colLength; j++) {
    			$scope.grid[i][j] = {
    				clicked: false,
    				containsMine: false,
    				adjNum: null,
                    flagged: false
    			};
    		}
    	}

        $scope.totalBoxes = $scope.rowLength * $scope.colLength;
    };
    
    $scope.setMines = function() {
    	var setMines = [],
            totalMinesSet = 0;

        while (totalMinesSet < $scope.numMines) {
            var row = Math.floor(totalMinesSet / $scope.colLength);
            var col = totalMinesSet % $scope.colLength;
            $scope.grid[row][col].containsMine = true;
            totalMinesSet++;
        }
    };

    $scope.shuffleMines = function() {
        var shuffleCount = 0;
        while (shuffleCount < $scope.numMines) {
            var row = Math.floor(shuffleCount / $scope.colLength);
            var col = shuffleCount % $scope.colLength;

            var randRow = Math.floor( (Math.random() * $scope.rowLength) );
            var randCol = Math.floor( (Math.random() * $scope.colLength) );

            // Swap current mine with a random location
            var temp = $scope.grid[row][col];
            $scope.grid[row][col] = $scope.grid[randRow][randCol];
            $scope.grid[randRow][randCol] = temp;

            shuffleCount++;
        }
    };

    $scope.containsMine = function(row, col) {
    	return $scope.grid[row][col].containsMine;
    };

    $scope.checkForMines = function(row, col) {
        // Check if row or column invalid
        if ($scope.grid[row] === undefined || $scope.grid[row][col] === undefined) {
            return;
        }

        if (!$scope.grid[row][col].clicked) {
            $scope.grid[row][col].clicked = true;
            $scope.numClicked++;
			if ($scope.grid[row][col].containsMine) {
				$scope.lost = true;
                $scope.showMines = true;
				return;
			}

			$scope.grid[row][col].adjNum = $scope.calcAdjNum(row, col);
            
            // Recurse on all adjacent mines
            if ($scope.grid[row][col].adjNum == 0) {
                $scope.checkForMines(row - 1, col - 1);
                $scope.checkForMines(row - 1, col);
                $scope.checkForMines(row - 1, col + 1);
                $scope.checkForMines(row, col - 1);
                $scope.checkForMines(row, col + 1);
                $scope.checkForMines(row + 1, col - 1);
                $scope.checkForMines(row + 1, col);
                $scope.checkForMines(row + 1, col + 1);
            }

			$scope.won = $scope.checkWin();
		}
    };

    $scope.calcAdjNum = function(row, col) {    	
        if ($scope.grid[row] === undefined || $scope.grid[row][col] === undefined) {
            return null;
        }
        var counter = 0,
    		grid = $scope.grid,
            isMine = $scope.isMine;

		// check top row
        counter += isMine(row - 1, col - 1 ) + isMine(row - 1, col) + isMine(row - 1, col + 1);

        // check current row
        counter += isMine(row, col - 1 ) + isMine(row, col + 1);

        // check bottom row
        counter += isMine(row + 1, col - 1 ) + isMine(row + 1, col) + isMine(row + 1, col + 1);

    	return counter;
    }

    $scope.isMine = function(row, col) {
        var isMine = $scope.grid[row] !== undefined && $scope.grid[row][col] != undefined && $scope.grid[row][col].containsMine;
        return isMine ? 1 : 0;
    }

    // Game determined as won if user has opened all boxes minus the mine ones
    $scope.checkWin = function() {
        console.log($scope.numClicked, $scope.numMines, $scope.totalBoxes);
    	return $scope.numMines + $scope.numClicked == $scope.totalBoxes
    };

    $scope.changeState = function(row, col) {
        var currState = grid[row][col].userState;
        var newState;
        switch(currState) {
            case "!":
                newState = "?";
                break;
            case "?":
                newState = "";
                break;
            default:
                newState = "!";
        }

        grid[row][col].userState = newState;

    }

    $scope.startGame();
});
