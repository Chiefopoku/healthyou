document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function exportData() {
    // Mock function to export data
    alert('Data export functionality is not yet implemented.');
}

function confirmDelete() {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
        deleteAccount();
    }
}

function deleteAccount() {
    // Mock function to delete account
    alert('Account deletion functionality is not yet implemented.');
}
