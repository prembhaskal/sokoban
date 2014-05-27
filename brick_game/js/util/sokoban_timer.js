function SokobanTimer(element)
{
    var timePassed = -1;
    var thisObject = this;
    //state = 0 is stopped , state = 1 is running
    var state = 0;



    this.start = function()
    {
        state = 1;
    }

    this.stop = function()
    {
       state = 0;
    }
    this.run = function()
    {
        if (state == 1)
        {
            timePassed++;
            element.innerHTML = timePassed;
        }
        setTimeout(function() { thisObject.run(); }, 1000);
    }


    this.reset = function()
    {
        state = 0;
        timePassed = -1;
        element.innerHTML = 0;

    }

    this.resetAndStart = function()
    {
         thisObject.reset();
         thisObject.start();
    }
    this.getTotalTime = function()
    {
        return timePassed;
    }

    this.init = function()
    {
        thisObject.run();
        thisObject.reset();
            // listen to game completion events.
        Events.subscribe(SokobanUtil.eventType.LEVEL_COMPLETE, thisObject.stop);
        Events.subscribe(SokobanUtil.eventType.LEVEL_START,thisObject.resetAndStart);

    }
}