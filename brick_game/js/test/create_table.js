// ***************** Creating Tables ****************************
function createTestMaze(table) {
    var allMazeLevels = new AllMazeLevels();
    var rawMaze = allMazeLevels.getRawMaze(1);

    var mazeCreator = new MazeCreator();
    var maze = mazeCreator.createMaze(rawMaze);
    var canvasDrawer = new CanvasDrawer();
    canvasDrawer.drawMaze(maze, table);
}