function SokoStopWatch(element) {

    var intervalId = null, offset, clock;
    var elapsedTime;
    var stopWatchDelay = 100;

    function start() {
        if (!intervalId) { // check ensures that once clock is started, subsequent start commands are ignored.
            offset   = Date.now();
            intervalId = setInterval(update, stopWatchDelay);
        }
    }

    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function stopReset() {
        stop();
        clock = 0;
        render();
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        elapsedTime = (clock/1000).toFixed(1);
        element.innerHTML = elapsedTime;
    }

    function delta() {
        var now = Date.now();
        var d   = now - offset;

        offset = now;
        return d;
    }

    this.init = function() {
        // listen to level start, level complete and pusher move events.
        Events.subscribe(SokobanUtil.eventType.STOP_TIMER, stop);
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, stopReset);
        Events.subscribe(SokobanUtil.eventType.MOVE_EVENT, start);
    };

    this.getElapsedTime = function() {
        return elapsedTime;
    };

}