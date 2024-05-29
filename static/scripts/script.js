// Detailed health tips array
const healthTips = [
    "Drink at least 8 cups of water daily. Staying hydrated is crucial for maintaining energy levels and overall health.",
    "Take a 5-minute break every hour to stretch. This helps reduce muscle tension and improve circulation.",
    "Incorporate more fruits and vegetables into your diet. They provide essential vitamins, minerals, and fiber.",
    "Practice deep breathing exercises to reduce stress. Inhale deeply through your nose, hold for a few seconds, and exhale slowly.",
    "Ensure you get 7-8 hours of sleep each night. Quality sleep is vital for mental and physical health.",
    "Take a walk for at least 30 minutes every day. Walking helps improve cardiovascular health and mood.",
    "Stay consistent with your medication schedule. Always take your medications as prescribed by your doctor.",
    "Visit your doctor for regular health check-ups. Early detection of health issues can lead to better outcomes.",
    "Monitor your blood pressure regularly. Keeping track of your blood pressure can help manage hypertension.",
    "Keep a gratitude journal to boost your mental health. Write down three things you are grateful for each day.",
    "Eat a balanced breakfast every morning. A healthy breakfast fuels your body and improves concentration.",
    "Limit your intake of sugary drinks. Opt for water, herbal teas, or natural fruit juices instead.",
    "Practice good posture. Sit and stand up straight to avoid back pain and improve breathing.",
    "Take time for mindfulness or meditation. Spend a few minutes each day in quiet reflection to reduce stress.",
    "Include lean proteins in your diet. Proteins are essential for muscle repair and immune function.",
    "Spend time outdoors in nature. Fresh air and sunlight can boost your mood and overall well-being.",
    "Avoid processed foods. Choose whole, unprocessed foods for better nutrition and health.",
    "Stay socially connected. Engage with friends and family regularly to support your mental health.",
    "Wash your hands frequently. Proper hand hygiene can prevent the spread of infections.",
    "Set realistic health goals. Break larger goals into smaller, achievable steps to stay motivated.",
    "Incorporate strength training exercises. Building muscle mass improves metabolism and bone density.",
    "Avoid smoking and limit alcohol consumption. Both can have serious long-term health effects.",
    "Practice safe sun exposure. Wear sunscreen and protective clothing to prevent skin damage.",
    "Stay informed about your health conditions. Educate yourself about managing any chronic illnesses you may have.",
    "Take breaks from screen time. Rest your eyes and stretch your body to prevent strain and fatigue.",
    "Incorporate healthy fats into your diet. Foods like avocados, nuts, and olive oil are beneficial.",
    "Stay positive and practice self-compassion. Be kind to yourself and focus on your progress, not perfection."
];

fetch('/api/reminders')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to change the health tip displayed
function changeHealthTip() {
    const tipElement = document.getElementById('health-tip');
    if (tipElement) {
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        tipElement.innerText = healthTips[randomIndex];
    } else {
        console.error('Element with id "health-tip" not found.');
    }
}


// Set an interval to change the health tip every 10 seconds
setInterval(changeHealthTip, 10000);

// Function to handle reminder form submission
const reminderForm = document.getElementById('reminder-form');
if (reminderForm) {
    reminderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const reminderType = document.getElementById('reminder-type').value;
        const interval = document.getElementById('interval').value;

        fetch('/api/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: reminderType, interval: interval })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayReminder(data.reminder);
                reminderForm.reset(); // Reset form fields
            } else {
                alert('Failed to set reminder');
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Function to display reminders on the page
function displayReminder(reminder) {
    const reminderList = document.getElementById('reminder-list');
    if (reminderList) {
        const reminderItem = document.createElement('div');
        reminderItem.className = 'reminder-item';
        reminderItem.innerHTML = `
            <strong>Reminder:</strong> ${reminder.type} <br> 
            <strong>Interval:</strong> ${reminder.interval}
            <button onclick="deleteReminder(this)">Delete</button>
        `;
        reminderList.appendChild(reminderItem);
    } else {
        console.error('Element with id "reminder-list" not found.');
    }
}

// Function to delete a reminder from the page
function deleteReminder(button) {
    button.parentNode.remove();
}

// Function to handle user signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const userData = {
            name: this.elements['name'].value,
            email: this.elements['email'].value,
            password: this.elements['password'].value,
            birthday: this.elements['birthday'].value,
            sex: this.elements['sex'].value
        };

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/account'; // Redirect to account page
            } else {
                alert('Signup failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Function to handle user login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = this.elements['email'].value;
        const password = this.elements['password'].value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/account'; // Redirect to account page
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Utility function to update DOM elements
function updateDOM(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = value;
    }
}

// Invoke initial functions on page load
document.addEventListener('DOMContentLoaded', function() {
    changeHealthTip(); // Immediately change the health tip when the page loads
});
