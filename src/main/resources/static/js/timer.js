class Fittimer {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentPhase = 'work';
        this.currentRound = 1;
        this.currentCycle = 1;
        
        this.workMinutes = 0;
        this.workSeconds = 0;
        this.restMinutes = 0;
        this.restSeconds = 0;
        this.totalRounds = 8;
        this.totalCycles = 1;
        this.remainingRounds = 0;
        this.remainingCycles = 0;
        
        this.intervalId = null;
        this.remainingTime = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.workMinutesEl = document.getElementById('workMinutes');
        this.workSecondsEl = document.getElementById('workSeconds');
        this.restMinutesEl = document.getElementById('restMinutes');
        this.restSecondsEl = document.getElementById('restSeconds');
        
        this.roundsDisplay = document.getElementById('roundsDisplay');
        this.cyclesDisplay = document.getElementById('cyclesDisplay');
        
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playPauseIcon = document.getElementById('playPauseIcon');
        this.workTimer = document.getElementById('workTimer');
        this.restTimer = document.getElementById('restTimer');
    }

    attachEventListeners() {
        this.workTimer.addEventListener('click', () => this.editTimer('work'));
        this.restTimer.addEventListener('click', () => this.editTimer('rest'));
        this.roundsDisplay.addEventListener('click', () => this.editNumber('rounds'));
        this.cyclesDisplay.addEventListener('click', () => this.editNumber('cycles'));
        this.playPauseBtn.addEventListener('click', () => this.toggleTimer());
    }

    editTimer(type) {
        if (this.isRunning) return;
        
        console.log('Starting timer edit for:', type);
        
        const timerEl = type === 'work' ? this.workTimer : this.restTimer;
        const minutesEl = type === 'work' ? this.workMinutesEl : this.restMinutesEl;
        const secondsEl = type === 'work' ? this.restSecondsEl : this.restSecondsEl;
        
        timerEl.classList.add('editing');
        
        // Create a simple overlay with inputs
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            background: #333;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            color: white;
        `;
        
        const title = document.createElement('h3');
        title.textContent = `Edit ${type.toUpperCase()} Timer`;
        title.style.cssText = 'margin-bottom: 20px; color: white;';
        
        const inputRow = document.createElement('div');
        inputRow.style.cssText = 'display: flex; gap: 10px; align-items: center; justify-content: center; margin-bottom: 20px;';
        
        const minutesInput = document.createElement('input');
        minutesInput.type = 'number';
        minutesInput.value = this.formatNumber(type === 'work' ? this.workMinutes : this.restMinutes);
        minutesInput.min = '0';
        minutesInput.max = '59';
        minutesInput.style.cssText = `
            width: 80px;
            height: 60px;
            font-size: 2rem;
            text-align: center;
            border: 2px solid #fff;
            border-radius: 8px;
            background: transparent;
            color: white;
        `;
        
        const separator = document.createElement('span');
        separator.textContent = ':';
        separator.style.cssText = 'font-size: 2rem; font-weight: bold; color: white;';
        
        const secondsInput = document.createElement('input');
        secondsInput.type = 'number';
        secondsInput.value = this.formatNumber(type === 'work' ? this.workSeconds : this.restSeconds);
        secondsInput.min = '0';
        secondsInput.max = '59';
        secondsInput.style.cssText = `
            width: 80px;
            height: 60px;
            font-size: 2rem;
            text-align: center;
            border: 2px solid #fff;
            border-radius: 8px;
            background: transparent;
            color: white;
        `;
        
        const buttonRow = document.createElement('div');
        buttonRow.style.cssText = 'display: flex; gap: 10px; justify-content: center;';
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.style.cssText = `
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        `;
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        `;
        
        // Assemble the overlay
        inputRow.appendChild(minutesInput);
        inputRow.appendChild(separator);
        inputRow.appendChild(secondsInput);
        
        buttonRow.appendChild(saveBtn);
        buttonRow.appendChild(cancelBtn);
        
        inputContainer.appendChild(title);
        inputContainer.appendChild(inputRow);
        inputContainer.appendChild(buttonRow);
        overlay.appendChild(inputContainer);
        
        document.body.appendChild(overlay);
        
        // Focus on minutes input
        setTimeout(() => {
            minutesInput.focus();
            minutesInput.select();
        }, 100);
        
        // Event handlers
        const saveTimer = () => {
            const minutes = Math.max(0, Math.min(59, parseInt(minutesInput.value) || 0));
            const seconds = Math.max(0, Math.min(59, parseInt(secondsInput.value) || 0));
            
            if (type === 'work') {
                this.workMinutes = minutes;
                this.workSeconds = seconds;
            } else {
                this.restMinutes = minutes;
                this.restSeconds = seconds;
            }
            
            this.updateDisplay();
            document.body.removeChild(overlay);
            timerEl.classList.remove('editing');
            console.log('Timer updated:', { minutes, seconds });
        };
        
        const cancelEdit = () => {
            document.body.removeChild(overlay);
            timerEl.classList.remove('editing');
        };
        
        saveBtn.addEventListener('click', saveTimer);
        cancelBtn.addEventListener('click', cancelEdit);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cancelEdit();
        });
        
        minutesInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                secondsInput.focus();
                secondsInput.select();
            }
        });
        
        secondsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveTimer();
            }
        });
        
        // Escape key to cancel
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                cancelEdit();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    editNumber(type) {
        if (this.isRunning) return;
        
        console.log('Starting number edit for:', type);
        
        const displayEl = type === 'rounds' ? this.roundsDisplay : this.cyclesDisplay;
        displayEl.classList.add('editing');
        
        // Create a simple overlay with input
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            background: #333;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            color: white;
        `;
        
        const title = document.createElement('h3');
        title.textContent = `Edit ${type.toUpperCase()}`;
        title.style.cssText = 'margin-bottom: 20px; color: white;';
        
        const inputRow = document.createElement('div');
        inputRow.style.cssText = 'display: flex; gap: 10px; align-items: center; justify-content: center; margin-bottom: 20px;';
        
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.value = type === 'rounds' ? this.totalRounds : this.totalCycles;
        numberInput.min = '1';
        numberInput.max = '99';
        numberInput.style.cssText = `
            width: 120px;
            height: 60px;
            font-size: 2rem;
            text-align: center;
            border: 2px solid #fff;
            border-radius: 8px;
            background: transparent;
            color: white;
        `;
        
        const buttonRow = document.createElement('div');
        buttonRow.style.cssText = 'display: flex; gap: 10px; justify-content: center;';
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.style.cssText = `
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        `;
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        `;
        
        // Assemble the overlay
        inputRow.appendChild(numberInput);
        
        buttonRow.appendChild(saveBtn);
        buttonRow.appendChild(cancelBtn);
        
        inputContainer.appendChild(title);
        inputContainer.appendChild(inputRow);
        inputContainer.appendChild(buttonRow);
        overlay.appendChild(inputContainer);
        
        document.body.appendChild(overlay);
        
        // Focus on input
        setTimeout(() => {
            numberInput.focus();
            numberInput.select();
        }, 100);
        
        // Event handlers
        const saveNumber = () => {
            const value = Math.max(1, Math.min(99, parseInt(numberInput.value) || 1));
            
            if (type === 'rounds') {
                this.totalRounds = value;
                this.remainingRounds = value; // Reset remaining rounds
            } else {
                this.totalCycles = value;
                this.remainingCycles = value; // Reset remaining cycles
            }
            
            this.updateDisplay();
            document.body.removeChild(overlay);
            displayEl.classList.remove('editing');
            console.log('Number updated:', { type, value });
        };
        
        const cancelEdit = () => {
            document.body.removeChild(overlay);
            displayEl.classList.remove('editing');
        };
        
        saveBtn.addEventListener('click', saveNumber);
        cancelBtn.addEventListener('click', cancelEdit);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cancelEdit();
        });
        
        numberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveNumber();
            }
        });
        
        // Escape key to cancel
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                cancelEdit();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    toggleTimer() {
        console.log('Toggle timer - isRunning:', this.isRunning, 'isPaused:', this.isPaused);
        if (this.isRunning && !this.isPaused) {
            console.log('Pausing timer');
            this.pauseTimer();
        } else {
            console.log('Starting/resuming timer');
            this.startTimer();
        }
    }

    startTimer() {
        console.log('Start timer - isPaused:', this.isPaused);
        if (this.isPaused) {
            this.resumeTimer();
        } else {
            this.beginNewPhase();
        }
    }

    beginNewPhase() {
        this.isRunning = true;
        this.isPaused = false;
        
        if (this.currentPhase === 'work') {
            this.remainingTime = this.workMinutes * 60 + this.workSeconds;
            this.workTimer.classList.add('active');
            this.restTimer.classList.remove('active');
        } else {
            this.remainingTime = this.restMinutes * 60 + this.restSeconds;
            this.restTimer.classList.add('active');
            this.workTimer.classList.remove('active');
        }
        
        this.updatePlayPauseButton();
        this.startCountdown();
    }

    startCountdown() {
        console.log('Starting countdown - remainingTime:', this.remainingTime);
        this.intervalId = setInterval(() => {
            this.remainingTime--;
            this.updateDisplay();
            
            if (this.remainingTime <= 0) {
                this.completePhase();
            }
        }, 1000);
    }

    completePhase() {
        clearInterval(this.intervalId);
        this.playNotification();
        
        if (this.currentPhase === 'work') {
            // Work phase completed, move to rest
            this.currentPhase = 'rest';
            this.workTimer.classList.remove('active');
        } else {
            // Rest phase completed, this means a round is complete
            this.currentPhase = 'work';
            this.restTimer.classList.remove('active');
            
            // Round completed - decrement remaining rounds
            this.remainingRounds--;
            this.currentRound++;
            
            console.log(`Round completed! Remaining rounds: ${this.remainingRounds}, Current cycle: ${this.currentCycle}`);
            
            // Check if all rounds in current cycle are complete
            if (this.remainingRounds <= 0) {
                // Cycle completed - decrement remaining cycles
                this.remainingCycles--;
                this.currentCycle++;
                console.log(`Cycle completed! Remaining cycles: ${this.remainingCycles}`);
                
                // Check if all cycles are complete
                if (this.remainingCycles <= 0) {
                    this.completeWorkout();
                    return;
                } else {
                    // Start new cycle - reset rounds
                    this.remainingRounds = this.totalRounds;
                    this.currentRound = 1;
                    console.log(`Starting new cycle ${this.currentCycle}. Rounds reset to ${this.remainingRounds}`);
                }
            }
        }
        
        this.updateDisplay();
        this.beginNewPhase();
    }

    completeWorkout() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentPhase = 'work';
        this.currentRound = 1;
        this.currentCycle = 1;
        this.remainingRounds = this.totalRounds;
        this.remainingCycles = this.totalCycles;
        
        this.workTimer.classList.remove('active');
        this.restTimer.classList.remove('active');
        
        this.updateDisplay();
        this.updatePlayPauseButton();
        
        alert('Workout Complete! 🎉');
    }

    pauseTimer() {
        console.log('Pausing timer');
        this.isPaused = true;
        this.isRunning = false; // Add this line
        clearInterval(this.intervalId);
        this.updatePlayPauseButton();
    }

    resumeTimer() {
        console.log('Resume timer - setting isRunning to true');
        this.isRunning = true;
        this.isPaused = false;
        this.startCountdown();
        this.updatePlayPauseButton();
    }

    playNotification() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }

    updateDisplay() {
        this.workMinutesEl.textContent = this.formatNumber(this.workMinutes);
        this.workSecondsEl.textContent = this.formatNumber(this.workSeconds);
        this.restMinutesEl.textContent = this.formatNumber(this.restMinutes);
        this.restSecondsEl.textContent = this.formatNumber(this.restSeconds);
        
        this.roundsDisplay.textContent = this.formatNumber(this.remainingRounds);
        this.cyclesDisplay.textContent = this.formatNumber(this.remainingCycles);
        
        if (this.isRunning && !this.isPaused) {
            const minutes = Math.floor(this.remainingTime / 60);
            const seconds = this.remainingTime % 60;
            
            if (this.currentPhase === 'work') {
                this.workMinutesEl.textContent = this.formatNumber(minutes);
                this.workSecondsEl.textContent = this.formatNumber(seconds);
            } else {
                this.restMinutesEl.textContent = this.formatNumber(minutes);
                this.restSecondsEl.textContent = this.formatNumber(seconds);
            }
        }
    }

    updatePlayPauseButton() {
        if (this.isRunning && !this.isPaused) {
            this.playPauseIcon.className = 'fas fa-pause';
        } else {
            this.playPauseIcon.className = 'fas fa-play';
        }
    }

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Fittimer();
    
    // Remove focus outlines programmatically
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('play-pause-btn') || 
            e.target.classList.contains('timer-display') || 
            e.target.classList.contains('number-display')) {
            e.target.style.outline = 'none';
            e.target.style.webkitTapHighlightColor = 'transparent';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('play-pause-btn') || 
            e.target.classList.contains('timer-display') || 
            e.target.classList.contains('number-display')) {
            e.target.style.outline = 'none';
            e.target.style.webkitTapHighlightColor = 'transparent';
        }
    });
});