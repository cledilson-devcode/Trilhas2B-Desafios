const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

const registerFormElement = document.getElementById('register');
const loginFormElement = document.getElementById('login');



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


// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para validar idade
function validateAge(age) {
    return !isNaN(age) && age >= 0 && age <= 120;
}

// Função para mostrar mensagem de erro
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error__message');
    errorMessage.textContent = message;
    input.classList.add('error');
}

// Função para remover mensagem de erro
function removeError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    input.classList.remove('error');
}

// Função para salvar usuário no localStorage
function saveUser(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

// Event listener para o formulário de registro
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtendo valores dos campos
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Validações
    let isValid = true;

    if (!name.trim()) {
        showError(document.getElementById('name'), 'Nome é obrigatório');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError(document.getElementById('email'), 'Email inválido');
        isValid = false;
    }

    if (!validateAge(age)) {
        showError(document.getElementById('age'), 'Idade inválida');
        isValid = false;
    }

    if (!userId.trim()) {
        showError(document.getElementById('userId'), 'ID do usuário é obrigatório');
        isValid = false;
    }

    if (password.length < 6) {
        showError(document.getElementById('password'), 'Senha deve ter no mínimo 6 caracteres');
        isValid = false;
    }

    if (isValid) {
        // Removendo erros anteriores
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));

        // Salvando usuário
        const userData = { name, email, age, userId, password };
        saveUser(userData);

        // Mostrando mensagem de sucesso
        alert('Cadastro realizado com sucesso!');
        
        // Limpando formulário
        registerFormElement.reset();
        
        // Voltando para o login
        toggleForms();
    }
});


// Event listener para o formulário de login
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const loginId = document.getElementById('loginId').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Obtendo usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificando credenciais
    const user = users.find(u => u.userId === loginId && u.password === loginPassword);

    if (user) {
        alert('Login realizado com sucesso!');
        // Aqui você pode redirecionar para uma página de dashboard ou fazer outras ações
    } else {
        alert('ID do usuário ou senha incorretos!');
    }
}); 