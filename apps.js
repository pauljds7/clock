/*
    App logic.
    Logic for clock, timer, stopwatch and pomodoro timer
*/
//Time interval for updates, in Milli seconds
const intervalMs = 100;
//Divs for the tabs
const clockDiv = document.getElementById('clock-item')
const timerDiv = document.getElementById('timer-item')
const stopWatchDiv = document.getElementById('stopwatch-item')

//Custom app states
let timerRunning = false;
let stopwatchRunning = false;
let pomodoroRunning = false;
//Custom app values
let timerStartDate = null;
let lastTimerTime = 0;
let stopwatchStartDate = null;
const defaultStopwatchVal = 120000
let stopwatchLength = defaultStopwatchVal;

/*
    Listeners for custom app buttons
    --------------------------------
*/
document.getElementById('timer-start').addEventListener('click',
    () => {
        timerRunning = true;
        timerStartDate = new Date();
    }
);
document.getElementById('timer-stop').addEventListener('click',
    () => {
        timerRunning = false;
    }
);
document.getElementById('stopwatch-start').addEventListener('click',
    () => {
        stopwatchRunning = true;
        stopwatchStartDate = new Date();
    }
);
document.getElementById('stopwatch-stop').addEventListener('click',
    () => {
        stopwatchRunning = false;
    }
);
document.getElementById('stopwatch-reset').addEventListener('click',
    () => {
        stopwatchRunning = false;
        stopwatchLength = defaultStopwatchVal;
    }
);
document.getElementById('stopwatch-add-second').addEventListener('click',
    () => {
        stopwatchRunning= false;
        stopwatchLength += 1000;
    }
);
document.getElementById('stopwatch-add-minute').addEventListener('click',
    () => {
        stopwatchRunning= false;
        stopwatchLength += 60000;
    }
);
document.getElementById('stopwatch-sub-second').addEventListener('click',
    () => {
        stopwatchRunning= false;
        stopwatchLength -= 1000;
        if (stopwatchLength <= 0) {
            stopwatchLength = 0;
        }
    }
);
document.getElementById('stopwatch-sub-minute').addEventListener('click',
    () => {
        stopwatchRunning= false;
        stopwatchLength -= 60000;
        if (stopwatchLength <= 0) {
            stopwatchLength = 0;
        }
    }
);
//----------------------------------------

//update functions that updates all the apps
//Time render function that renders time to specified element
function renderTime(element, time) {
    let timerSeconds = Math.floor(time/100) / 10;
    let timerMinutes = Math.floor(timerSeconds/60);
    let timerHours = Math.floor(timerMinutes/60);
    let timerTime = null;
    let parsedTimerSeconds = (timerSeconds % 1 ==0) ? timerSeconds%60 + '.0':((timerSeconds*10)%600)/10;
    let parsedTimerMinutes = timerMinutes % 60
    if (timerHours ==0  && timerMinutes == 0) {
        timerTime = '00:' + parsedTimerSeconds;
    } else if (timerHours == 0) {
        timerTime = parsedTimerMinutes + ':' + parsedTimerSeconds
    } else{
        timerTime = timerHours + ':' + parsedTimerMinutes + ':' + parsedTimerSeconds
    }
    element.innerText = timerTime;
}

//Updatel logic for clock
//Clock uses different time format output, thats why it doesnt use time render function.
function updateClock(date){
    let val = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let milliS = date.getMilliseconds();
    let sMilliS = Math.round(s*10 + milliS/ 100) / 10;
    
    //Parsing current time for output
    let parsedVal = (val < 10) ? "0" + val : val;
    let parsedMin = (min < 10) ? "0" + min : min;
    let parsedS = (s < 10) ? "0" + s : s;
    let parsedMilliS = (milliS < 10) ? '00' + milliS : ((milliS<100) ? '0' + milliS : milliS);
    let parsedSMilliS = (sMilliS % 1.0 == 0) ? sMilliS+'.0' : sMilliS;
    let time = parsedVal + ":" + parsedMin + ":" + parsedSMilliS;
    clockDiv.innerText = time;
}
//Update logic for timer
function updateTimer(date) {
    let showTimerTime = lastTimerTime;
    if (timerRunning) {
        showTimerTime = date - timerStartDate;
        lastTimerTime = showTimerTime;
    }
    //Parse time difference
    renderTime(timerDiv, showTimerTime);
}
//Update logic for stopwatch app
function updateStopwatch(date) {
    if (stopwatchRunning) {
        let deltaTime = date - stopwatchStartDate;
        stopwatchStartDate = date;
        stopwatchLength -= deltaTime;
        if (stopwatchLength <= 0) {
            stopwatchRunning = false;
            stopwatchLength = 0;
        }
    }
    renderTime(stopWatchDiv, stopwatchLength)
}

//general update that updates all the apps
function update() {
    //Get current time
    let date = new Date();

    updateClock(date);
    updateTimer(date);
    updateStopwatch(date);
}
//Launch update
let updateId = setInterval(update, intervalMs);