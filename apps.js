/*
    App logic.
    Logic for clock, timer, stopwatch and pomodoro timer
*/
//Time interval for updates, in Milli seconds
const intervalMs = 100;
//Divs for the tabs
const clockDiv = document.getElementById('clock-item');
const timerDiv = document.getElementById('timer-item');
const stopWatchDiv = document.getElementById('stopwatch-item');
const pomodoroDiv = document.getElementById('pomodoro-item');

//Custom app states
let timerRunning = false;
let stopwatchRunning = false;
let pomodoroRunning = false;
//Custom app values
//Timer
let timerStartDate = null;
let lastTimerTime = 0;
//Stopwatch
let stopwatchStartDate = null;
const defaultStopwatchVal = 120000
let stopwatchLength = defaultStopwatchVal;
//Pomodoro timer
//Cycle of work, rest, work, rest, work, rest, work, long rest
const workTime = 25 * 60 * 1000;
const restTime1 = 5 * 60 * 1000;
const restTime2 = 50 * 60 * 1000;
const pomodoroCycle = [
    workTime,
    restTime1,
    workTime,
    restTime1,
    workTime,
    restTime1,
    workTime,
    restTime2
];
let pomodoroCurrentStep = 0;
let pomodoroCurrentTime = pomodoroCycle[pomodoroCurrentStep];
let pomodoroLastDate = null;

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
document.getElementById('pomodoro-start').addEventListener('click',
    () => {
        pomodoroRunning = true;
        pomodoroLastDate = new Date();
    }
);
document.getElementById('pomodoro-stop').addEventListener('click',
    () => {
        pomodoroRunning= false;
    }
);
document.getElementById('pomodoro-reset').addEventListener('click',
    () => {
        pomodoroRunning = false;
        pomadaroTable.rows[pomodoroCurrentStep].style.backgroundColor = 'var(--main-bg-color)' 
        pomadaroTable.rows[0].style.backgroundColor = 'var(--second-bg-color)' 
        pomodoroCurrentStep = 0;
        pomodoroCurrentTime = pomodoroCycle[pomodoroCurrentStep];
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
    if (timerSeconds%60 <10) {
        parsedTimerSeconds = '0'+parsedTimerSeconds;
    }
    timerMinutes = timerMinutes%60;
    let parsedTimerMinutes = (timerMinutes  < 10) ? '0' + timerMinutes : timerMinutes;
    if (timerHours ==0  && timerMinutes == 0) {
        timerTime = '00:' + parsedTimerSeconds;
    } else if (timerHours == 0) {
        timerTime = parsedTimerMinutes + ':' + parsedTimerSeconds
    } else{
        timerTime = timerHours + ':' + parsedTimerMinutes + ':' + parsedTimerSeconds
    }
    element.innerText = timerTime;
}

//Render pomodoro table
let pomadaroTable = document.getElementById('pomodoro-table');
function renderPomodoroTable(){
    for (let i = 0; i < pomodoroCycle.length; i++) {
        let newRow = pomadaroTable.insertRow(-1);
        newRow.insertCell(0).innerText = (i%2 == 0) ? 'Work' : 'Rest';
        newRow.insertCell(1).innerText = pomodoroCycle[i] / 60000;
        if (i == pomodoroCurrentStep) {
            newRow.style.backgroundColor = 'var(--second-bg-color)';
        }
    }
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
//Update logic for pomodoro timer app
function updatePomodoro(date) {
    if (pomodoroRunning) {
        pomodoroCurrentTime -= date - pomodoroLastDate;
        pomodoroLastDate = date;
        if (pomodoroCurrentTime <= 0){
            pomodoroCurrentStep = (pomodoroCurrentStep + 1) % pomodoroCycle.length;
            pomodoroCurrentTime = pomodoroCycle[pomodoroCurrentStep];
            //Play sound after each stage completion
            let audio = new Audio('intro-logo.wav');
            audio.play();
            //Update pomodoro table
            pomadaroTable.rows[(pomodoroCurrentStep - 1) % pomodoroCycle.length].style.backgroundColor = 'var(--main-bg-color)' 
            pomadaroTable.rows[pomodoroCurrentStep].style.backgroundColor = 'var(--second-bg-color)' 
        }
    }
    renderTime(pomodoroDiv, pomodoroCurrentTime)
}

//general update that updates all the apps
function update() {
    //Get current time
    let date = new Date();

    updateClock(date);
    updateTimer(date);
    updateStopwatch(date);
    updatePomodoro(date);
}
//Populate pomadoro table
renderPomodoroTable();
//Launch update
let updateId = setInterval(update, intervalMs);