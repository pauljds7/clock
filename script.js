function deactivateAll() {
    let allContent = document.getElementsByClassName('content')
    for (let i = 0; i <allContent.length; i++){
        allContent[i].style.display = 'none';
    }
}

function activate(name) {
    let clockType = document.getElementById(name)
    clockType.style.display = 'block'
}

const clockBtn = document.getElementById('clock-btn');
const timerBtn = document.getElementById('timer-btn');
const stopwatchBtn = document.getElementById('stopwatch-btn');
const pomodoroBtn = document.getElementById('pomodoro-btn');
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