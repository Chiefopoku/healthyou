// Script for HealthYou web application

// Health tips array
const healthTips = [
    "Drink at least 8 cups of water daily.",
    "Take a 5-minute break every hour to stretch.",
    "Incorporate more fruits and vegetables into your diet.",
    "Practice deep breathing exercises to reduce stress.",
    "Ensure you get 7-8 hours of sleep each night.",
    "Take a walk for at least 30 minutes every day.",
    "Stay consistent with your medication schedule.",
    "Visit your doctor for regular health check-ups.",
    "Monitor your blood pressure regularly.",
    "Keep a gratitude journal to boost your mental health."
];

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
document.getElementById('reminder-form').addEventListener('submit', function(event) {
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
            this.reset(); // Reset form fields
        } else {
            alert('Failed to set reminder');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to display reminders on the page
function displayReminder(reminder) {
    const reminderList = document.getElementById('reminder-list');
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item';
    reminderItem.innerHTML = `
        <strong>Reminder:</strong> ${reminder.type} <br> 
        <strong>Interval:</strong> ${reminder.interval}
        <button onclick="deleteReminder(this)">Delete</button>
    `;
    reminderList.appendChild(reminderItem);
}

// Function to delete a reminder from the page
function deleteFullChainBlockItem(button) {
    button.parentNode.remove();
}

// Function to handle user signup
document.getElementById('signup-form').addEventListener('submit', function(event) {
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

// Function to handle user login
document.getElementById('login-form').addEventListener('submit', function(event) {
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
