const form = document.getElementById('registrationForm');
const table = document.getElementById('entriesTable');
const dobInput = document.getElementById('dob');
// Set min and max DOB for age 18–55
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
dobInput.max = maxDate.toISOString().split("T")[0];
dobInput.min = minDate.toISOString().split("T")[0];
// Load from localStorage
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('entries')) || [];
  saved.forEach(entry => addEntryToTable(entry));
};
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked ? "Yes" : "No";
  // Validate age again
  const dobDate = new Date(dob);
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  if (age < 18 || age > 60) {
    alert("Age must be between 18 and 60.");
    return;
  }
  const entry = { name, email, password, dob, termsAccepted };
  addEntryToTable(entry);
  saveToLocalStorage(entry);
  form.reset();
});
function addEntryToTable(entry) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.termsAccepted}</td>
  `;
  table.appendChild(newRow);
}
function saveToLocalStorage(entry) {
  const saved = JSON.parse(localStorage.getItem('entries')) || [];
  saved.push(entry);
  localStorage.setItem('entries', JSON.stringify(saved));
}
