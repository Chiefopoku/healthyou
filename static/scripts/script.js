// Array of health tips to be displayed
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

// Function to change the health tip
function changeHealthTip() {
    const tipElement = document.getElementById('health-tip');
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    tipElement.innerText = healthTips[randomIndex];
}

// Function to handle form submissions for setting reminders
function handleReminderForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const reminderType = document.getElementById('reminder-type').value;
    const interval = document.getElementById('interval').value;

    // Create reminder data object
    const reminderData = {
        type: reminderType,
        interval: interval
    };

    // Send the data to the backend
    fetch('/api/reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Create a new reminder element
            const reminderElement = document.createElement('div');
            reminderElement.className = 'reminder-item';
            reminderElement.innerHTML = `
                <strong>Reminder:</strong> ${reminderType} <br> 
                <strong>Interval:</strong> ${interval} 
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Append the new reminder to the reminder list
            const reminderList = document.querySelector('.reminder-list');
            reminderList.appendChild(reminderElement);

            // Attach event listeners to the new buttons
            reminderElement.querySelector('.edit-btn').addEventListener('click', editReminder);
            reminderElement.querySelector('.delete-btn').addEventListener('click', deleteReminder);

            // Reset the form
            event.target.reset();
        } else {
            alert('Failed to set reminder');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to edit a reminder
function editReminder(event) {
    const reminderElement = event.target.closest('.reminder-item');
    const reminderType = reminderElement.querySelector('strong').innerText.split(': ')[1];
    const interval = reminderElement.querySelector('strong + strong').innerText.split(': ')[1];

    // Populate the form with the existing reminder details
    document.getElementById('reminder-type').value = reminderType;
    document.getElementById('interval').value = interval;

    // Remove the current reminder element
    reminderElement.remove();
}

// Function to delete a reminder
function deleteReminder(event) {
    const reminderElement = event.target.closest('.reminder-item');
    reminderElement.remove();
}

// Function to handle signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordVerify = document.getElementById('passwordVerify').value;
    const birthday = document.getElementById('birthday').value;
    const sex = document.getElementById('sex').value;

    if (password !== passwordVerify) {
        alert('Passwords do not match!');
        return;
    }

    const userData = { name, email, password, birthday, sex };

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
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'account.html';
        } else {
            alert('Signup failed');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userData = { email, password };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'account.html';
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Function to export data
function exportData() {
    // Mock function to export data
    alert('Data export functionality is not yet implemented.');
}

// Function to confirm account deletion
function confirmDelete() {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
        deleteAccount();
    }
}

// Function to delete account
function deleteAccount() {
    // Mock function to delete account
    alert('Account deletion functionality is not yet implemented.');
}

// Set initial health tip and start the interval for changing health tips
document.addEventListener('DOMContentLoaded', () => {
    changeHealthTip(); // Set the initial health tip
    setInterval(changeHealthTip, 10000); // Change health tip every 10 seconds

    // Attach event listener to the reminder form
    const reminderForm = document.getElementById('reminder-form');
    if (reminderForm) {
        reminderForm.addEventListener('submit', handleReminderForm);
    }

    // Attach event listeners for signup and login forms
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Attach event listener for logout button
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Display user name if logged in
    const userNameDisplay = document.getElementById('userName');
    if (userNameDisplay) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            userNameDisplay.textContent = user.name;
        } else {
            window.location.href = 'login.html';
        }
    }
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userData = { email, password };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'account.html';
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => console.error('Error:', error));
}
