// Game Controller.
function GameController() {

    // variables containing the game/level information
    var maxLevels = allLevels.len;
    var presentLevel = null;
    // put a new undo stack for moves.
    var undoStack = null;
    var levelStarted = false;
    var maze = null;

    var isGameComplete = null;
    var keysEnabled = null;
    var allMazeLevels = null;
    var menuOffset = 0;
    var menuOpen = false;
    var menusize = 20;

    var gameState = null;
    var storageController = null;
    var sokobanTimer = null;



    // see http://www.crockford.com/javascript/private.html
    // needed to preserve the object reference in private methods.... stupid ECMA :(
    var thisObject = this;

    // local methods

    // method to move when arrow key is pressed.
    function moveOnArrowPress() {
        $(document).keydown(function (event) {
            var keyCode = (event.keyCode ? event.keyCode : event.which);

            var keyName = SokobanUtil.getArrowKeyPressed(keyCode);

            if (!isKeyPressEnabled())
                return;

            // don't do anything if some other key is pressed.
            if (keyName == null)
                return;

            movePusherObject(keyName);
            checkIfGameIsComplete();
        });
    }

    // check if control + z is pressed, then undo
    function undoOnCtrlZOrU() {
        $(document).keydown(function (event) {
            var keyCode = (event.keyCode ? event.keyCode : event.which);

            if (!isKeyPressEnabled())
                return;

            if ((event.ctrlKey && keyCode == SokobanUtil.keyCode.KEY_Z)
                || (keyCode == SokobanUtil.keyCode.KEY_U)) {
                undoMove();
            }
        });
    }

    function isKeyPressEnabled() {
        return keysEnabled;
    }

    function movePusherObject(keyName) {
        if (!keysEnabled)
            return;

        var pusher = maze.pusher;
        if (keyName != null) {
            pusher.move(keyName);
        }

        SokobanUtil.updateTotalMoves(maze.pusher.getTotalMoves());
    }

    function checkIfGameIsComplete() {
        if (areAllBricksOnDestination()) {
            isGameComplete = true;
            keysEnabled = false;
            SokobanUtil.showLevelCompleteMsg();
            //TODO add may be a delay before showing the pop up.
            SokobanUtil.displayPopUp();
            thisObject.updateUndoResetButton();
            // timer should stop before level complete event is published. This is required to capture the elapsed time.
            Events.publish(SokobanUtil.eventType.STOP_TIMER, []);
            gameState.setElapsedTime(sokobanTimer.getElapsedTime());
            Events.publish(SokobanUtil.eventType.LEVEL_COMPLETE, [gameState]);
        }
    }

    function areAllBricksOnDestination() {
        var brickArray = maze.brickArray;
        var areAllBricksOnDest = true;
        for (var i = 0; i < brickArray.length; i++) {
            var brick = brickArray[i];
            var isBrickOnDest = SokobanUtil.isDestination(brick.getPosition());
            if (!isBrickOnDest) {
                areAllBricksOnDest = false;
                break;
            }
        }

        return areAllBricksOnDest;
    }

    function undoThisMove(gameMove) {
        var cell = gameMove.cell;
        cell.undoMove(gameMove.xinc, gameMove.yinc);
    }

    function initializeStuffForLevel() {
        // reset the undo stack.
        undoStack = [];
        levelStarted = false;
        // set completed false
        isGameComplete = false;
        // enable keys
        keysEnabled = true;

        // reset game state.
        gameState.resetMoves();
        gameState.resetElapsedTime();
        gameState.changeLevel(presentLevel);

        Events.publish(SokobanUtil.eventType.LEVEL_START, [gameState]);
        initializeLevelViews();
    }

    function initializeLevelViews() {
        // level completion message
        SokobanUtil.resetLevelCompleteMsg();
        // initialize total moves.
        SokobanUtil.updateTotalMoves(0);
        thisObject.updateUndoResetButton();
    }

    function startLevel(levelNo, table) {
        initializeStuffForLevel();
        var rawMaze = allMazeLevels.getRawMaze(levelNo);

        var mazeCreator = new MazeCreator();
        maze = mazeCreator.createMaze(rawMaze);
        var canvasDrawer = new CanvasDrawer();
        canvasDrawer.drawMaze(maze, table);

        // add appropriate listeners
        var pusher = maze.pusher;

        var movesListener = new MovesListener(thisObject);
        pusher.addMoveListeners(movesListener);

        for (var i = 0; i < maze.brickArray.length; i++) {
            pusher.addPushListener(maze.brickArray[i]);
            maze.brickArray[i].addMoveListeners(movesListener);
        }

        SokobanUtil.showLevel(levelNo);
        updatePreviousNextButtons();


    }

    function addKeyHandlers() {
        moveOnArrowPress();
        undoOnCtrlZOrU();
    }

    function updatePreviousNextButtons() {
        SokobanUtil.enablePreviousLevelButton();
        SokobanUtil.enableNextLevelButton();
        if (presentLevel == maxLevels) {
            SokobanUtil.disableNextLevelButton();
        }
        if (presentLevel == 1) {
            SokobanUtil.disablePreviousLevelButton();
        }
    }

    // privileged methods.
    this.updateUndoResetButton = function () {
        if (isGameComplete) {
            SokobanUtil.disableUndoButton();
            SokobanUtil.disableResetButton();
            return;
        }

        if (undoStack.length == 1) {
            SokobanUtil.enableUndoButton();

        }
        else if (undoStack.length == 0) {
            SokobanUtil.disableUndoButton();
        }

        if (levelStarted) {
            SokobanUtil.enableResetButton();
        }
        else {
            SokobanUtil.disableResetButton();
        }

    };

    this.initializeGame = function (table) {
        presentLevel = 1;
        allMazeLevels = new AllMazeLevels();
        thisObject.initialiseMenuChooser();
        gameState = new GameState();

        var timerElement = SokobanUtil.getTimerElement();
        sokobanTimer = new SokoStopWatch(timerElement);
        sokobanTimer.init();

        storageController = new StorageController();
        storageController.init();

        startLevel(presentLevel, table);

        //binding key handlers
        addKeyHandlers();
    };

    this.menuPrev = function () {
        menuOffset = menuOffset - menusize;
        thisObject.initialiseMenuChooser();

    };
    this.menuNext = function () {
        menuOffset = menuOffset + menusize;
        thisObject.initialiseMenuChooser();

    };
    this.initialiseMenuChooser = function () {
        var i = menuOffset;
        var counter = 0;
        while (++i <= (menusize + menuOffset )) {
            counter = i - menuOffset;
            var menuLevelElement = $("#menuLevel" + counter);
            if (i <= maxLevels) {
                menuLevelElement.html(i);
                menuLevelElement.removeClass("menulevelActive");
                menuLevelElement.removeClass("menulevelInActive");
                menuLevelElement.addClass("menulevelActive");
                removeLevelListeners("#menuLevel" + counter);
                addMenuLevelListeners("#menuLevel" + counter, i);

            }
            else {
                menuLevelElement.html("");
                menuLevelElement.removeClass("menulevelActive");
                menuLevelElement.removeClass("menulevelInActive");
                menuLevelElement.addClass("menulevelInActive");
                removeLevelListeners("#menuLevel" + counter);
            }

        }

        toggleMenuPrevNextButton();

    };

    function toggleMenuPrevNextButton() {
        if (menuOffset == 0)
            SokobanUtil.disableMenuPrevtButton();
        else
            SokobanUtil.enableMenuPrevButton();

        if ((maxLevels - menuOffset) <= menusize)
            SokobanUtil.disableMenuNextButton();
        else
            SokobanUtil.enableMenuNextButton();

    }

    function removeLevelListeners(elementID) {

        $(elementID).unbind("click");
    }

    function addMenuLevelListeners(elementID, levelNo) {
        $(elementID).click(function () {
            menuAction();
            var table = SokobanUtil.getTable();
            thisObject.playLevel(table, levelNo);

        });
    }

    this.playNextLevel = function (table) {
        if (presentLevel < maxLevels) {
            presentLevel++;
            startLevel(presentLevel, table);
        }
    };

    this.playPreviousLevel = function (table) {
        if (presentLevel > 1) {
            presentLevel--;
            startLevel(presentLevel, table);
        }
    };

    this.playLevel = function (table, levelNo) {
        presentLevel = levelNo;
        startLevel(presentLevel, table);
    };


    this.resetPresentLevel = function (table) {
        startLevel(presentLevel, table);
    };

    this.undoMove = function () {
        var gameMove = undoStack.pop();

        // return if nothing is present to undo.
        if (gameMove == null) {
            return;
        }

        // move the pusher...it has to be a pusher... no check required.
        undoThisMove(gameMove);
        SokobanUtil.updateTotalMoves(maze.pusher.getTotalMoves());
        this.updateUndoResetButton();

        // check to see if a brick was also moved along with the pusher.
        gameMove = undoStack.pop();
        if (gameMove == null) {
            return;
        }

        var cellType = gameMove.cell.getCellType();
        if (cellType == SokobanUtil.CellType.BrickType) {
            undoThisMove(gameMove);
        } else {
            // else we popped a pusher,  so put it back as it is for the next move.
            undoStack.push(gameMove);
        }
    };

    this.captureMoveEvent = function(gameMove) {
        this.addToUndo(gameMove);
        gameState.setMoves(maze.pusher.getTotalMoves());
        levelStarted = true;
        Events.publish(SokobanUtil.eventType.MOVE_EVENT, [gameState]);
    };

    this.addToUndo = function (gameMove) {
        if (gameMove != null) {
            undoStack.push(gameMove);
        }
    };

    this.menuAction = function () {
        if (!menuOpen) {
            $("#levelChooser").animate({left: '0%'});
            menuOpen = true;
        }
        else {
            menuOpen = false;
            $("#levelChooser").animate({left: '-95%'});
        }
    };

}

/**
 * moves listener to keep track of the moves to facilitate the undo operation.
 */
function MovesListener(gameController) {

    this.onEvent = function (gameMove) {
        gameController.captureMoveEvent(gameMove);
        gameController.updateUndoResetButton();
    };
}


function GameState() {
    var presentLevel = 1;
    var gameMoves = 0;
    var elapsedTime = 0;

    this.setMoves = function(moves) {
        gameMoves = moves;
    };

    this.getMoves = function() {
        return gameMoves;
    };

    this.resetMoves = function() {
        gameMoves = 0;
    };

    this.setElapsedTime = function(time) {
        elapsedTime = time;
    };

    this.getElapsedTime = function() {
        return elapsedTime;
    };

    this.resetElapsedTime = function() {
        elapsedTime = 0;
    };

    this.getPresentLevel = function() {
        return presentLevel;
    };

    this.changeLevel = function(newLevel) {
        presentLevel = newLevel;
    };
}

// object to control the storage of data. i.e when to store and what to store
function StorageController() {
    var storageType = SokobanUtil.storageType.CHROME_API;
    var storageHelper = new StorageHelper(storageType);

    function storeLevelStateOnCompletion(gameState) {
        var levelState = new LevelState(gameState.getPresentLevel());
        levelState.setSolutionMoves(gameState.getMoves());
        levelState.setSolutionTime(gameState.getElapsedTime());
        // callback function used so that present levelState is preserved (since this will be ASYNC CALL);
        storageHelper.getLevelState(gameState.getPresentLevel(), function (storedState) {
            updateStoreStateIfImprovised(levelState, storedState);
        });
    }

    function updateStoreStateIfImprovised(presentState, storedState) {
        if (storedState !== undefined) {
//            // store only if a better solution.
//            if (isBetterSolution(storedState, presentState)) {
//                storageHelper.storeLevelState(presentState);
//            }
            // update the existing score with the new score, if there is an improvement,
            updateIfScoreImprovised(presentState, storedState);
            storageHelper.storeLevelState(storedState);
        }
        else {
            // also store if this is the first time.
            storageHelper.storeLevelState(presentState);
        }
    }

    // improvement if solved in lesser moves or lesser time.
    function updateIfScoreImprovised(presentState, storedState) {
        storedState.solutionMoves = (storedState.solutionMoves > presentState.solutionMoves) ?
                                     presentState.solutionMoves :
                                     storedState.solutionMoves;
        storedState.solutionTime = (storedState.solutionTime > presentState.solutionTime) ?
                                    presentState.solutionTime :
                                    storedState.solutionTime;
    }

    function isBetterSolution(oldState, newState) {
        if (oldState.solutionMoves < newState.solutionMoves)
            return false;
        else if (oldState.solutionMoves == newState.solutionMoves) {
            if (oldState.solutionTime < newState.solutionTime)
                return false;
            return true;
        }

        return true;
    }

    function getBestScore(gameState) {
        var currentLevel = gameState.getPresentLevel();
        storageHelper.getLevelState(currentLevel, function (storedState) {
            if (storedState !== undefined) {
                console.log('best score for level ' + currentLevel + ' is ' + storedState.solutionMoves);
            }
            else {
                console.log(' no best score level ' + currentLevel + ' yet');
            }
            updateBestScore(storedState);

        })
    }

    function updateBestScore(levelState) {
        if (levelState) {
            SokobanUtil.updateBestScore(levelState.solutionMoves);
            SokobanUtil.updateBestTime(levelState.solutionTime);
        }
        else {
            SokobanUtil.updateBestScore('UNSOLVED_LEVEL');
            SokobanUtil.updateBestTime('UNSOLVED_LEVEL');
        }
    }

    this.init = function() {
        // listen to game completion events.
        Events.subscribe(SokobanUtil.eventType.LEVEL_COMPLETE, storeLevelStateOnCompletion);
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, getBestScore);
    };

}
