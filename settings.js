// settings.js
// Store students in localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to render students in the table
function renderStudents() {
    const studentList = document.getElementById('taskList');
    studentList.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName} ${student.lastName}</td>
            <td>${formatDate(student.birthdate)}</td>
            <td>${calculateAge(student.birthdate)}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
        `;
        studentList.appendChild(row);
    });
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Function to calculate age
function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to add student
function addStudent() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const course = document.getElementById('course').value;
    const consent = document.getElementById('consent').checked;

    // Validate form
    if (!firstName || !lastName || !birthdate || !gender || !course) {
        alert('Please complete the form.');
        return;
    }

    if (!consent) {
        alert('Please consent before proceeding');
        return;
    }

    const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        birthdate,
        gender,
        course,
        consent
    };

    students.push(newStudent);
    saveStudents();
    renderStudents();

    // Reset form
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('birthdate').value = '';
    document.getElementById('male').checked = true;
    document.getElementById('course').value = 'BS Computer Science';
    document.getElementById('consent').checked = false;
}

// Function to reset form
function resetForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('birthdate').value = '';
    document.getElementById('male').checked = true;
    document.getElementById('course').value = 'BS Computer Science';
    document.getElementById('consent').checked = false;
}

// Function to filter students
function filterStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#taskList tr');

    rows.forEach(row => {
        const fullName = row.cells[0].textContent.toLowerCase();
        row.style.display = fullName.includes(searchTerm) ? '' : 'none';
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderStudents();
});