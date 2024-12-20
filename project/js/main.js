import { Timer } from './timer.js';
import { formatTime, preventClose } from './utils.js';

class MindfulStart {
    constructor() {
        this.timerElement = document.getElementById('timer');
        this.buttonsElement = document.getElementById('buttons');
        this.completionMessage = document.getElementById('completion-message');
        this.feelGoodBtn = document.getElementById('feelGoodBtn');
        this.moreTimeBtn = document.getElementById('moreTimeBtn');

        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.startInitialTimer();
    }

    setupEventListeners() {
        this.feelGoodBtn.addEventListener('click', () => this.handleFeelGood());
        this.moreTimeBtn.addEventListener('click', () => this.startExtendedTimer());
        window.addEventListener('beforeunload', preventClose);
    }

    startInitialTimer() {
        const oneMinuteTimer = new Timer(
            60,
            (remaining) => {
                this.timerElement.textContent = formatTime(remaining);
            },
            () => this.handleTimerComplete()
        );
        oneMinuteTimer.start();
    }

    startExtendedTimer() {
        this.buttonsElement.classList.add('hidden');
        this.timerElement.textContent = '10:00';
        
        const tenMinuteTimer = new Timer(
            600,
            (remaining) => {
                this.timerElement.textContent = formatTime(remaining);
            },
            () => this.handleExtendedTimerComplete()
        );
        tenMinuteTimer.start();
    }

    handleTimerComplete() {
        this.buttonsElement.classList.remove('hidden');
    }

    handleExtendedTimerComplete() {
        this.completionMessage.textContent = 'You are now fully recharged. Let\'s get started!';
        this.completionMessage.classList.remove('hidden');
        this.timerElement.classList.add('hidden');
        window.removeEventListener('beforeunload', preventClose);
    }

    handleFeelGood() {
        this.completionMessage.textContent = 'Great! You are ready to start working.';
        this.completionMessage.classList.remove('hidden');
        this.buttonsElement.classList.add('hidden');
        this.timerElement.classList.add('hidden');
        window.removeEventListener('beforeunload', preventClose);
    }
}

// Initialize the application
new MindfulStart();