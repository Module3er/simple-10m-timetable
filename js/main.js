class TimetableManager {
    constructor() {
        this.currentUser = null;
        this.userTimetable = null;
        this.currentPage = window.location.pathname.split('/').pop().split('.')[0];
        
        // Initialize theme
        this.initializeTheme();
        
        // Initialize clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        // Initialize based on current page
        switch(this.currentPage) {
            case 'register':
                this.initializeRegistration();
                break;
            case 'current':
                this.initializeCurrentView();
                break;
            case 'timetable':
                this.initializeTimetableView();
                break;
            default:
                window.location.href = 'pages/register.html';
        }
    }
    
    initializeTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', document.body.dataset.theme);
            });
            
            // Set initial theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.body.dataset.theme = savedTheme;
        }
    }
    
    updateClock() {
        const timeDisplay = document.getElementById('current-time');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
    }
    
    initializeRegistration() {
        this.initializeAutocomplete();
        this.setupRegistrationHandlers();
        // Load optional subjects into dropdowns
        const subjects = TIMETABLE_DATA.optionalSubjects;
        const selects = Array.from({ length: 5 }, (_, i) => document.getElementById(`subject${i + 1}`));
        
        selects.forEach(select => {
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                select.appendChild(option);
            });
        });
        
        // Handle registration
        const registerBtn = document.getElementById('register');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                const username = document.getElementById('username').value;
                const selectedSubjects = selects.map(select => select.value);
                
                if (!username || selectedSubjects.some(subject => !subject)) {
                    alert('Please fill in all fields');
                    return;
                }
                
                this.currentUser = {
                    username,
                    optionalSubjects: selectedSubjects
                };
                
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.generatePersonalizedTimetable();
                window.location.href = 'current.html';
            });
        }
    }
    
    initializeAutocomplete() {
        const subjects = TIMETABLE_DATA.optionalSubjects;
        const inputs = Array.from({ length: 5 }, (_, i) => document.getElementById(`subject${i + 1}`));
        
        inputs.forEach((input, index) => {
            const suggestionsContainer = document.getElementById(`suggestions${index + 1}`);
            let selectedIndex = -1;
            
            // Input event handler
            input.addEventListener('input', (e) => {
                const value = e.target.value.toLowerCase();
                const matches = subjects.filter(subject => 
                    subject.toLowerCase().includes(value) && 
                    !this.isSubjectSelected(subject, inputs, input)
                );
                
                this.updateSuggestions(matches, suggestionsContainer, input, value);
                selectedIndex = -1;
            });
            
            // Focus event
            input.addEventListener('focus', () => {
                if (input.value) {
                    const value = input.value.toLowerCase();
                    const matches = subjects.filter(subject => 
                        subject.toLowerCase().includes(value) && 
                        !this.isSubjectSelected(subject, inputs, input)
                    );
                    this.updateSuggestions(matches, suggestionsContainer, input, value);
                }
            });
            
            // Keyboard navigation
            input.addEventListener('keydown', (e) => {
                const suggestions = suggestionsContainer.getElementsByClassName('suggestion-item');
                
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
                        this.updateSelectedSuggestion(suggestions, selectedIndex);
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        selectedIndex = Math.max(selectedIndex - 1, -1);
                        this.updateSelectedSuggestion(suggestions, selectedIndex);
                        break;
                        
                    case 'Enter':
                        e.preventDefault();
                        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                            input.value = suggestions[selectedIndex].textContent;
                            suggestionsContainer.classList.remove('active');
                            this.validateInput(input);
                        }
                        break;
                        
                    case 'Escape':
                        suggestionsContainer.classList.remove('active');
                        break;
                }
            });
            
            // Close suggestions when clicking outside
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                    suggestionsContainer.classList.remove('active');
                }
            });
        });
    }
    
    isSubjectSelected(subject, inputs, currentInput) {
        return inputs.some(input => 
            input !== currentInput && 
            input.value.toLowerCase() === subject.toLowerCase()
        );
    }
    
    updateSuggestions(matches, container, input, value) {
        if (!matches.length || !value) {
            container.classList.remove('active');
            return;
        }
        
        container.innerHTML = matches
            .map(subject => `<div class="suggestion-item">${subject}</div>`)
            .join('');
            
        container.classList.add('active');
        
        // Add click handlers to suggestions
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.textContent;
                container.classList.remove('active');
                this.validateInput(input);
            });
        });
    }
    
    updateSelectedSuggestion(suggestions, selectedIndex) {
        Array.from(suggestions).forEach((suggestion, index) => {
            suggestion.classList.toggle('selected', index === selectedIndex);
            if (index === selectedIndex) {
                suggestion.scrollIntoView({ block: 'nearest' });
            }
        });
    }
    
    validateInput(input) {
        const value = input.value.trim();
        const isValid = TIMETABLE_DATA.optionalSubjects.includes(value);
        
        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid && value !== '');
        
        // Remove any existing validation message
        const existingMessage = input.parentElement.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add validation message if invalid
        if (!isValid && value !== '') {
            const message = document.createElement('div');
            message.className = 'validation-message';
            message.textContent = 'Please select a valid subject';
            input.parentElement.appendChild(message);
        }
    }
    
    setupRegistrationHandlers() {
        const form = document.getElementById('registration-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const username = document.getElementById('username').value;
            const optionalSubjects = Array.from(document.querySelectorAll('.subject-input'))
                .map(input => input.value)
                .filter(subject => subject);

            // Validate
            if (!username || optionalSubjects.length < 3) {
                alert('Please fill in all required fields');
                return;
            }

            // Save user data
            const userData = {
                username,
                optionalSubjects
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            console.log('Saved user data:', userData);

            // Generate timetable
            this.currentUser = userData;
            const success = this.generatePersonalizedTimetable();
            
            if (success) {
                window.location.href = 'current.html';
            } else {
                alert('Failed to generate timetable. Please try different subject combinations.');
            }
        });
    }

    initializeCurrentView() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
            window.location.href = 'register.html';
            return;
        }
        
        this.userTimetable = JSON.parse(localStorage.getItem('userTimetable'));
        if (!this.userTimetable) {
            this.generatePersonalizedTimetable();
        }
        
        this.updateCurrentPeriod();
        setInterval(() => this.updateCurrentPeriod(), 60000); // Update every minute
    }
    
    initializeTimetableView() {
        // Load user data
        const userData = localStorage.getItem('currentUser');
        console.log('Loading user data:', userData);
        if (!userData) {
            console.error('No user data found, redirecting to registration');
            window.location.href = 'register.html';
            return;
        }
        this.currentUser = JSON.parse(userData);

        // Load or generate timetable
        const savedTimetable = localStorage.getItem('userTimetable');
        console.log('Loading saved timetable:', savedTimetable);
        if (savedTimetable) {
            this.userTimetable = JSON.parse(savedTimetable);
        } else {
            console.log('No timetable found, generating new one');
            this.generatePersonalizedTimetable();
            console.log('Generated timetable:', this.userTimetable);
        }

        // Display the timetable
        this.displayTimetable();

        // Setup logout handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    displayTimetable() {
        if (!this.currentUser || !this.userTimetable) {
            console.error('No user data or timetable found');
            return;
        }

        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `${this.currentUser.username}'s Schedule`;
        }

        // Generate time slots
        const timeSlots = document.querySelector('.time-slots');
        const scheduleGrid = document.getElementById('timetable-grid');
        
        if (!timeSlots || !scheduleGrid) {
            console.error('Required elements not found');
            return;
        }

        // Clear existing content
        timeSlots.innerHTML = '';
        scheduleGrid.innerHTML = '';

        // Generate time slots
        TIMETABLE_DATA.periods.forEach(period => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = period.time;
            timeSlots.appendChild(timeSlot);
        });

        // Generate timetable grid
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // Create columns for each day
        days.forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';

            // Add slots for each time period
            TIMETABLE_DATA.periods.forEach((_, periodIndex) => {
                const slot = document.createElement('div');
                slot.className = 'class-slot';

                const classInfo = this.userTimetable[day][periodIndex];
                if (classInfo && classInfo.subject) {
                    const subject = document.createElement('div');
                    subject.className = 'subject';
                    subject.textContent = classInfo.subject;

                    const room = document.createElement('div');
                    room.className = 'room';
                    room.textContent = classInfo.room === '--' ? 'Free Period' : `Room ${classInfo.room}`;

                    slot.appendChild(subject);
                    slot.appendChild(room);

                    // Check if this is the current class
                    const now = new Date();
                    const currentDay = days[now.getDay() - 1];
                    
                    if (day === currentDay && periodIndex === this.getCurrentPeriodIndex()) {
                        slot.classList.add('active');
                    }
                } else {
                    slot.innerHTML = '<div class="subject">Free Period</div><div class="room">--</div>';
                }

                dayColumn.appendChild(slot);
            });

            scheduleGrid.appendChild(dayColumn);
        });

        console.log('Timetable displayed:', this.userTimetable);
    }

    getCurrentPeriodIndex() {
        const now = new Date();
        const time = now.getHours() * 60 + now.getMinutes();

        return TIMETABLE_DATA.periods.findIndex(period => {
            const [start, end] = period.time.split(' - ');
            const [startHour, startMin] = start.split(':').map(Number);
            const [endHour, endMin] = end.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;
            return time >= startTime && time < endTime;
        });
    }

    generatePersonalizedTimetable() {
        const MAX_ATTEMPTS = 10;
        let attempt = 0;
        let success = false;

        while (!success && attempt < MAX_ATTEMPTS) {
            console.log(`Attempting timetable generation, attempt ${attempt + 1}`);
            success = this.attemptTimetableGeneration();
            if (!success) {
                attempt++;
            }
        }

        return success;
    }

    attemptTimetableGeneration() {
        if (!this.currentUser || !this.currentUser.optionalSubjects) {
            console.error('No user data available for timetable generation');
            return false;
        }

        console.log('Starting timetable generation with subjects:', this.currentUser.optionalSubjects);

        // Initialize empty timetable
        const timetable = {};
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        days.forEach(day => {
            timetable[day] = new Array(9).fill(null);
        });

        // Initialize subject counters
        const subjectCounts = {};
        this.currentUser.optionalSubjects.forEach(subject => {
            subjectCounts[subject] = 0;
        });

        // For each day and period
        days.forEach(day => {
            const daySchedule = TIMETABLE_DATA.masterTimetable[day];
            daySchedule.forEach((period, periodIndex) => {
                let assignedSlot = null;

                if (period.type === "fixed") {
                    assignedSlot = {
                        subject: period.subject,
                        room: period.room,
                        note: period.note || ''
                    };
                }
                else if (period.type === "same_as_previous" && periodIndex > 0) {
                    assignedSlot = { ...timetable[day][periodIndex - 1] };
                }
                else if (period.type === "optional") {
                    const validOptions = period.options.filter(option => 
                        this.currentUser.optionalSubjects.includes(option.subject) &&
                        subjectCounts[option.subject] < 5
                    );

                    if (validOptions.length > 0) {
                        validOptions.sort((a, b) => 
                            (subjectCounts[a.subject] || 0) - (subjectCounts[b.subject] || 0)
                        );

                        const selected = validOptions[0];
                        assignedSlot = {
                            subject: selected.subject,
                            room: selected.room
                        };
                        subjectCounts[selected.subject] = (subjectCounts[selected.subject] || 0) + 1;
                    }
                }

                timetable[day][periodIndex] = assignedSlot || { subject: "Free Period", room: "--" };
            });
        });

        // Validate the timetable
        let isValid = true;
        this.currentUser.optionalSubjects.forEach(subject => {
            const count = Object.values(timetable).flat().filter(slot => 
                slot && slot.subject === subject
            ).length;
            
            if (count !== 5) {
                console.log(`Invalid distribution for ${subject}: ${count} periods`);
                isValid = false;
            }
        });

        if (isValid) {
            console.log('Generated valid timetable:', timetable);
            this.userTimetable = timetable;
            localStorage.setItem('userTimetable', JSON.stringify(timetable));
            return true;
        }

        return false;
    }

    updateCurrentPeriod() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
        const time = now.getHours() * 60 + now.getMinutes();

        // Convert periods to minute-based times for comparison
        const periods = TIMETABLE_DATA.periods.map(period => {
            const [start, end] = period.time.split(' - ');
            const [startHour, startMin] = start.split(':').map(Number);
            const [endHour, endMin] = end.split(':').map(Number);
            return {
                id: period.id,
                startTime: startHour * 60 + startMin,
                endTime: endHour * 60 + endMin
            };
        });

        const currentPeriod = periods.find(period => 
            time >= period.startTime && time < period.endTime
        );

        const subjectDisplay = document.getElementById('current-subject-name');
        const roomDisplay = document.getElementById('current-room');

        if (!currentPeriod || day === 0 || day === 6) {
            subjectDisplay.textContent = 'No Class';
            roomDisplay.textContent = 'Room: --';
            return;
        }

        // Get current subject from userTimetable
        const currentSubject = this.userTimetable[day][currentPeriod.id];
        if (currentSubject) {
            subjectDisplay.textContent = currentSubject.subject;
            roomDisplay.textContent = `Room: ${currentSubject.room}`;
        }
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userTimetable');
        location.reload();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TimetableManager();
});
