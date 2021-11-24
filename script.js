/*
    Code to make tabs work
*/
//Deactivates all tabs
function deactivateAll() {
    let allContent = document.getElementsByClassName('content');
    for (let i = 0; i <allContent.length; i++){
        allContent[i].style.display = 'none';
    }
}
//Activates single tab given by name
function activate(name) {
    let clockType = document.getElementById(name);
    clockType.style.display = 'block';
}

//Getting buttons
const clockBtn = document.getElementById('clock-btn');
const timerBtn = document.getElementById('timer-btn');
const stopwatchBtn = document.getElementById('stopwatch-btn');
const pomodoroBtn = document.getElementById('pomodoro-btn');
//Setting functionality to the buttons
clockBtn.addEventListener('click',
    function() {
        deactivateAll();
        activate('clock');
    }
);
timerBtn.addEventListener('click',
    function() {
        deactivateAll();
        activate('timer');
    }
);
stopwatchBtn.addEventListener('click',
    function() {
        deactivateAll();
        activate('stopwatch');
    }
);
pomodoroBtn.addEventListener('click',
    function() {
        deactivateAll();
        activate('pomodoro');
    }
);
/*
    App logic.
    Logic for clock, timer, stopwatch and pomodoro timer
*/
//Time interval for updates
const intervalMs = 100;
//Divs for the tabs
const clockDiv = document.getElementById('clock-item')

//update functions that updates all the apps
function update() {
    //Get current time
    let date = new Date();
    let val = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let milliS = date.getMilliseconds();

    /*Logic for clock app */
    //Parsing current time for output
    let parsedVal = (val < 10) ? "0" + val : val;
    let parsedMin = (min < 10) ? "0" + min : min;
    let parsedS = (s < 10) ? "0" + s : s;
    let parsedMilliS = (milliS < 10) ? '00' + milliS : ((milliS<100) ? '0' + milliS : milliS)
    let time = parsedVal + ":" + parsedMin + ":" + parsedS +'.' + parsedMilliS;
    clockDiv.innerText = time;


    //Update continuation
    setTimeout(update, intervalMs);
}

update()