let timer = null;
let totalSeconds = 0;
let isRunning = false;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const status = document.getElementById('status');

function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    timerDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
}

startBtn.addEventListener('click', function() {
    if (!isRunning) {
        // Ako nije ručno uneto vreme, koristi vrednost iz input polja
        if (totalSeconds === 0) {
            setTimer();
        }
        
        if (totalSeconds > 0) {
            isRunning = true;
            timerDisplay.classList.add('pulse');
            status.textContent = 'Timer je pokrenut...';
            
            timer = setInterval(function() {
                totalSeconds--;
                updateDisplay();
                
                if (totalSeconds <= 0) {
                    clearInterval(timer);
                    isRunning = false;
                    timerDisplay.classList.remove('pulse');
                    status.textContent = '⏰ Vreme je isteklo!';
                    
                    // Notification sound effect
                    if ('Notification' in window) {
                        new Notification('Timer završen!', {
                            body: 'Vreme je isteklo!',
                            icon: '⏰'
                        });
                    }
                }
            }, 1000);
        } else {
            status.textContent = 'Molimo unesite vreme ili izaberite preset!';
        }
    }
});

pauseBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.classList.remove('pulse');
        status.textContent = 'Timer je pauziran';
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    totalSeconds = 0;
    timerDisplay.classList.remove('pulse');
    updateDisplay();
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    status.textContent = 'Postavite vreme i pritisnite Start';
});

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize display
updateDisplay();
