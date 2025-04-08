const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

const registerFormElement = document.getElementById('register');



// Função para alternar entre os formulários
function toggleForms() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

// Event listeners para alternar entre os formulários
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

const email = document.getElementById('email').value;
// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}