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

// Set initial health tip and start the interval for changing health tips
document.addEventListener('DOMContentLoaded', () => {
    changeHealthTip(); // Set the initial health tip
    setInterval(changeHealthTip, 10000); // Change health tip every 10 seconds

    // Attach event listener to the reminder form
    const reminderForm = document.getElementById('reminder-form');
    reminderForm.addEventListener('submit', handleReminderForm);
});
