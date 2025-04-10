// Espera que todo o conteúdo do HTML seja carregado e a árvore DOM esteja pronta antes de executar o JavaScript.
// Isso evita erros ao tentar selecionar elementos que ainda não existem na página.
document.addEventListener('DOMContentLoaded', function() {

    // --- Seleção dos Elementos HTML Principais ---
    // Selecionamos os elementos que contêm os formulários (divs) para poder escondê-los/mostrá-los.
    const loginFormContainer = document.getElementById('loginForm'); // Container do formulário de login
    const registerFormContainer = document.getElementById('registerForm'); // Container do formulário de cadastro

    // Selecionamos os links que o usuário clica para alternar entre os formulários.
    const showRegisterLink = document.getElementById('showRegister'); // Link "Cadastre-se" no form de login
    const showLoginLink = document.getElementById('showLogin'); // Link "Faça login" no form de cadastro

    // Selecionamos os elementos <form> reais, que contêm os campos e serão submetidos.
    const loginForm = document.getElementById('login'); // O formulário <form> de login
    const registerForm = document.getElementById('register'); // O formulário <form> de cadastro

    // --- Funções Auxiliares ---

    /**
     * Alterna a visibilidade dos containers dos formulários de login e cadastro.
     * Adiciona/remove a classe 'hidden' (que deve ser definida no CSS para esconder o elemento).
     */
    function toggleForms() {
        // Verifica se os containers foram encontrados antes de tentar manipular suas classes.
        if (loginFormContainer && registerFormContainer) {
            loginFormContainer.classList.toggle('hidden'); // Se tem 'hidden', remove; se não tem, adiciona.
            registerFormContainer.classList.toggle('hidden'); // Faz o mesmo para o outro container.
        } else {
            // Loga um erro no console do navegador se os containers não foram encontrados no HTML.
            console.error("Elementos container dos formulários (loginForm/registerForm) não encontrados.");
        }
    }

    /**
     * Valida se uma string se parece com um endereço de email válido.
     * @param {string} email - O email a ser validado.
     * @returns {boolean} - True se o formato for válido, False caso contrário.
     */
    function validateEmail(email) {
        // Expressão Regular (Regex) para verificar o padrão básico de emails.
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // testa() retorna true se a string 'email' corresponder ao padrão da regex.
        // String(email).toLowerCase() garante que estamos testando uma string em minúsculas.
        return re.test(String(email).toLowerCase());
    }

    /**
     * Valida se a idade é um número dentro de um intervalo razoável (0 a 120).
     * @param {string|number} age - A idade a ser validada (pode vir como string do input).
     * @returns {boolean} - True se a idade for válida, False caso contrário.
     */
    function validateAge(age) {
        // Converte a idade para um número inteiro (base 10).
        const ageNum = parseInt(age, 10);
        // Verifica se a conversão resultou em um número (isNaN = Is Not a Number),
        // e se está dentro do intervalo permitido.
        return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 120;
    }

    /**
     * Exibe uma mensagem de erro associada a um campo de input específico.
     * Adiciona a classe 'error' ao input e tenta exibir a mensagem em um span.error__message próximo.
     * @param {HTMLElement} inputElement - O elemento de input (<input>, <select>, etc.) ou container (para radio/checkbox/file) que está inválido.
     * @param {string} message - A mensagem de erro a ser exibida.
     */
    function showError(inputElement, message) {
        // Adiciona a classe 'error' ao input/container para que possa ser estilizado via CSS (ex: borda vermelha).
        inputElement.classList.add('error');

        // Tenta encontrar o elemento HTML onde a mensagem de erro deve ser exibida.
        let errorMessageElement = null;
        let searchContainer = null; // O elemento onde procuraremos pelo span de erro

        // Lógica para encontrar o span de erro:
        // 1. Para inputs normais (text, email, number, select, etc.):
        //    Verifica se o elemento *imediatamente seguinte* ao input tem a classe '.error__message'.
        if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains('error__message')) {
            errorMessageElement = inputElement.nextElementSibling;
            searchContainer = inputElement.parentElement; // O pai direto geralmente é o container
        }
        // 2. Fallback ou casos especiais (file, radio group, checkbox group):
        //    Procura pelo contêiner pai mais apropriado.
        else {
            // Trata containers passados diretamente (como para radio/checkbox/file)
            if (inputElement.classList.contains('documento') || inputElement.classList.contains('trilhas__form') || inputElement.classList.contains('checkbox__form')) {
                 searchContainer = inputElement;
            // Senão, busca o pai mais próximo que agrupa label/input/erro
            } else {
                searchContainer = inputElement.closest('.form__grupo, .form-group, .documento, .checkbox__form, .trilhas__form');
            }

            // Dentro do container encontrado, procura por um elemento com a classe '.error__message'.
            if (searchContainer) {
                errorMessageElement = searchContainer.querySelector('.error__message');

                 // Se ainda não encontrou e for um input file dentro de .documento
                 // (O span agora deve estar dentro do .documento, então a busca acima deve encontrá-lo)
                 // if (!errorMessageElement && inputElement.type === 'file' && searchContainer.classList.contains('documento')) {
                 //     errorMessageElement = searchContainer.querySelector('.error__message');
                 // }
            }
        }


        // Se encontrou um elemento para exibir a mensagem:
        if (errorMessageElement) {
            errorMessageElement.textContent = message; // Define o texto da mensagem.
            errorMessageElement.style.display = 'block'; // Garante que o span esteja visível.
        } else {
            // Se não encontrou um span de erro específico no HTML:
            // Loga um aviso no console para o desenvolvedor. É recomendado adicionar o span no HTML.
            console.warn(`Não foi encontrado o span .error__message para o input/container: ${inputElement.id || inputElement.name || inputElement.classList[0]}`, inputElement);
            // Neste caso, apenas a classe 'error' no input dará o feedback visual.
        }
    }

    /**
     * Remove a mensagem de erro e a classe 'error' de um campo de input/container específico.
     * @param {HTMLElement} inputElement - O elemento de input/container do qual remover o erro.
     */
    function removeError(inputElement) {
        // Remove a classe 'error' do input/container, revertendo qualquer estilo de erro aplicado via CSS.
        inputElement.classList.remove('error');

        // Tenta encontrar o span de erro associado usando a mesma lógica da função showError.
        let errorMessageElement = null;
        let searchContainer = null;

        if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains('error__message')) {
           errorMessageElement = inputElement.nextElementSibling;
           searchContainer = inputElement.parentElement;
        } else {
            if (inputElement.classList.contains('documento') || inputElement.classList.contains('trilhas__form') || inputElement.classList.contains('checkbox__form')) {
                 searchContainer = inputElement;
            } else {
                searchContainer = inputElement.closest('.form__grupo, .form-group, .documento, .checkbox__form, .trilhas__form');
            }
            if (searchContainer) {
                errorMessageElement = searchContainer.querySelector('.error__message');
            }
        }

        // Se encontrou o span de erro:
        if (errorMessageElement) {
            errorMessageElement.textContent = ''; // Limpa o texto da mensagem.
            errorMessageElement.style.display = 'none'; // Esconde o span (conforme o estado padrão do CSS).
        }
    }

    /**
     * Salva os dados do usuário no localStorage do navegador.
     * ATENÇÃO: localStorage não é seguro para dados sensíveis como senhas! Usado aqui apenas para exemplo.
     * @param {object} userData - O objeto contendo os dados do usuário a serem salvos.
     * @returns {boolean} - True se salvou com sucesso, False se ocorreu um erro (ex: ID duplicado).
     */
    function saveUser(userData) {
        // Usa try...catch para lidar com possíveis erros ao interagir com localStorage (ex: limite de espaço).
        try {
            // Obtém a lista de usuários já salvos (se houver) ou inicializa um array vazio.
            // JSON.parse converte a string JSON do localStorage de volta para um array JavaScript.
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Verifica se já existe um usuário com o mesmo userId (evita duplicatas).
            const existingUser = users.find(u => u.userId === userData.userId);
            if (existingUser) {
                // Se o ID já existe, informa o usuário e não salva.
                alert('Erro: ID de usuário já cadastrado.');
                // Re-exibe o erro no campo correspondente para feedback visual.
                const userIdInput = document.getElementById('userId');
                if(userIdInput) showError(userIdInput, 'ID de usuário já cadastrado.');
                return false; // Indica que não salvou.
            }

            // Adiciona os novos dados do usuário ao array.
            users.push(userData);
            // Converte o array atualizado de volta para uma string JSON.
            // Salva a string JSON no localStorage sob a chave 'users'.
            localStorage.setItem('users', JSON.stringify(users));
            return true; // Indica que salvou com sucesso.
        } catch (error) {
            // Se ocorrer um erro durante o processo (leitura, parse, stringify, escrita):
            console.error("Erro ao salvar usuário no localStorage:", error);
            alert("Ocorreu um erro ao salvar o cadastro. Verifique o console ou tente novamente.");
            return false; // Indica que não salvou.
        }
    }

    // --- Configuração dos Event Listeners ---

    // Adiciona listeners aos links "Cadastre-se" e "Faça login" para alternar os formulários.
    if (showRegisterLink && showLoginLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previne a ação padrão do link (que seria navegar para '#').
            toggleForms(); // Chama a função que alterna a visibilidade dos forms.
        });
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previne a ação padrão do link.
            toggleForms(); // Chama a função que alterna a visibilidade dos forms.
        });
    } else {
        // Avisa no console se os links não foram encontrados (pode indicar problema no HTML ou IDs).
        console.warn("Links #showRegister ou #showLogin não encontrados no HTML.");
    }

    // Adiciona o listener principal para o evento 'submit' do formulário de cadastro.
    if (registerForm) { // Garante que o elemento <form id="register"> existe.
        registerForm.addEventListener('submit', (e) => {
            // 1. Prevenir o Envio Padrão:
            e.preventDefault();

            // 2. Flag de Validação:
            let isValid = true;

            // --- 3. Obter Referências aos Elementos de Input e Containers ---
            const nameInput = document.getElementById('nome');
            const ageInput = document.getElementById('age');
            const cpfInput = document.getElementById('cpf');
            const sexoInput = document.getElementById('sexo');
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');
            const identidadeInput = document.getElementById('identidade');
            const identidadeContainer = identidadeInput?.closest('.documento'); // Container do input file
            const cepInput = document.getElementById('cep');
            const ruaInput = document.getElementById('rua');
            const numCasaInput = document.getElementById('numCasa');
            const cidadeInput = document.getElementById('cidade');
            const estadoInput = document.getElementById('estado');
            const residenciaInput = document.getElementById('comprovante__residencia');
            const residenciaContainer = residenciaInput?.closest('.documento'); // Container do input file
            const trilhaCheckedInput = document.querySelector('input[name="trilha"]:checked');
            const trilhaContainer = document.querySelector('.trilhas__form'); // Div que contém os radios
            const userIdInput = document.getElementById('userId');
            const passwordInput = document.getElementById('password');
            // *** AJUSTE: Selecionar checkbox pelo ID adicionado no HTML ***
            const termosCheckbox = document.getElementById('termos');
            const termosContainer = document.querySelector('.checkbox__form'); // Div dos termos

            // --- 4. Validações Individuais ---

            // Função auxiliar interna para simplificar a lógica de validação repetitiva
            function validateField(input, validationFn, emptyMsg, invalidMsg = null, container = null) {
                 const targetElement = container || input; // Elemento onde o erro será mostrado/classe aplicada
                 // Segurança: Verifica se o input/container foi encontrado no HTML.
                 if (!input || !targetElement) {
                     console.error(`Elemento de input/container não encontrado durante a validação. Input:`, input, "Container:", container);
                     isValid = false;
                     return;
                 }
                 // Limpa erro anterior deste campo/container.
                removeError(targetElement);

                const value = input.type === 'checkbox' ? input.checked : (input.type === 'file' ? input.files : input.value);

                // Validação para Checkbox (termos)
                if (input.type === 'checkbox') {
                    if (!value) { // Se não estiver marcado (checked = false)
                        showError(targetElement, emptyMsg);
                        isValid = false;
                    }
                // Validação para Arquivo (identidade, residencia)
                } else if (input.type === 'file') {
                    if (value.length === 0) { // Se nenhum arquivo foi selecionado
                        // Passamos o container (a label .documento) para showError
                        showError(targetElement, emptyMsg);
                        isValid = false;
                    }
                // Validação para outros tipos (text, number, email, tel, select, password)
                } else if (typeof value === 'string' || typeof value === 'number') { // Checa se é string ou number
                     // Caso especial: Select deve ter um valor selecionado (diferente de "" ou valor padrão)
                     if(input.tagName === 'SELECT' && !value) {
                         showError(targetElement, emptyMsg);
                         isValid = false;
                     // Para outros campos, verifica se está vazio após remover espaços em branco (trim).
                     } else if(input.tagName !== 'SELECT' && typeof value === 'string' && !value.trim()){
                         showError(targetElement, emptyMsg);
                         isValid = false;
                      // Para campos numéricos (poderia ser type="number")
                     } else if (typeof value === 'number' && isNaN(value)) { // Verifica se é Not-a-Number
                         showError(targetElement, emptyMsg); // Ou uma mensagem específica para número
                         isValid = false;
                     // Se não está vazio, mas existe uma função de validação específica (ex: email, idade) e ela falha...
                     } else if (invalidMsg && validationFn && !validationFn(value)) {
                         showError(targetElement, invalidMsg);
                         isValid = false;
                     }
                }
            }

             // Executa as validações para cada campo usando a função auxiliar
             validateField(nameInput, null, 'Nome completo é obrigatório');
             validateField(emailInput, validateEmail, 'Email é obrigatório', 'Formato de email inválido');
             validateField(ageInput, validateAge, 'Idade é obrigatória', 'Idade deve ser um número entre 0 e 120');
             validateField(cpfInput, null, 'CPF é obrigatório'); // Adicionar validação de formato se necessário
             validateField(sexoInput, null, 'Seleção de sexo é obrigatória'); // Valida se value não é ""
             validateField(telefoneInput, null, 'Telefone é obrigatório'); // Adicionar validação de formato se necessário
             // Para arquivos, passamos o container para a validação/showError
             validateField(identidadeInput, null, 'Comprovante de identidade (arquivo) é obrigatório', null, identidadeContainer);
             validateField(cepInput, null, 'CEP é obrigatório'); // Adicionar validação/busca ViaCEP se necessário
             validateField(ruaInput, null, 'Rua é obrigatória');
             validateField(numCasaInput, null, 'Número é obrigatório');
             validateField(cidadeInput, null, 'Cidade é obrigatória');
             validateField(estadoInput, null, 'Estado é obrigatório');
             // Para arquivos, passamos o container para a validação/showError
             validateField(residenciaInput, null, 'Comprovante de residência (arquivo) é obrigatório', null, residenciaContainer);
             validateField(userIdInput, null, 'ID de usuário é obrigatório');

             // Validação de Senha (lógica específica)
             removeError(passwordInput);
             if (!passwordInput.value) {
                 showError(passwordInput, 'Senha é obrigatória');
                 isValid = false;
             } else if (passwordInput.value.length < 6) {
                 showError(passwordInput, 'Senha deve ter no mínimo 6 caracteres');
                 isValid = false;
             }

             // Validação da Checkbox de Termos (usando o container)
             if (termosCheckbox && termosContainer) {
                validateField(termosCheckbox, null, 'Você deve aceitar os Termos e Condições', null, termosContainer);
             } else {
                console.warn("Checkbox de Termos (#termos) ou seu container (.checkbox__form) não encontrados.");
                // isValid = false; // Considerar inválido se a checkbox for crucial
             }

             // Validação do Grupo de Radio Buttons (Trilha)
             if (trilhaContainer) {
                 removeError(trilhaContainer); // Limpa erro anterior do container
                 if (!trilhaCheckedInput) { // Se nenhum radio está marcado
                     // Mostra erro no container das trilhas
                     showError(trilhaContainer, 'Seleção de trilha é obrigatória');
                     isValid = false;
                 }
             } else {
                 console.warn("Container .trilhas__form não encontrado para validação/erro.");
                 if (!trilhaCheckedInput) { // Se container não existe mas seleção é obrigatória
                     alert('Por favor, selecione uma trilha de aprendizagem.');
                     isValid = false;
                 }
             }
             const trilhaSelecionadaValue = trilhaCheckedInput ? trilhaCheckedInput.value : null;


            // --- 5. Processamento Após Validação ---
            if (isValid) {
                console.log('Formulário válido. Preparando para salvar...');

                // Monta um objeto com os dados do formulário para salvar.
                // ATENÇÃO: Arquivos não são incluídos diretamente. Salvamos apenas os nomes.
                // ATENÇÃO 2: Salvar senha em localStorage é INSEGURO!
                const userData = {
                    name: nameInput.value.trim(), // trim verifica se existe espaço em branco para remover
                    age: ageInput.value, // Vem como string, pode converter se precisar: parseInt(ageInput.value, 10)
                    cpf: cpfInput.value.trim(),
                    sexo: sexoInput.value,
                    email: emailInput.value.trim(),
                    telefone: telefoneInput.value.trim(),
                    identidadeFilename: identidadeInput.files.length > 0 ? identidadeInput.files[0].name : null,
                    cep: cepInput.value.trim(),
                    rua: ruaInput.value.trim(),
                    numCasa: numCasaInput.value.trim(),
                    cidade: cidadeInput.value.trim(),
                    estado: estadoInput.value.trim(),
                    residenciaFilename: residenciaInput.files.length > 0 ? residenciaInput.files[0].name : null,
                    trilha: trilhaSelecionadaValue,
                    userId: userIdInput.value.trim(),
                    password: passwordInput.value // SENHA NUNCA USAR trim()
                };

                // Tenta salvar os dados no localStorage.
                const saved = saveUser(userData);

                if (saved) {
                    alert('Cadastro realizado com sucesso!');
                    registerForm.reset(); // Limpa os campos do formulário.

                    // Limpa manualmente o texto dos <p> dentro dos labels de arquivo
                    document.querySelectorAll('.documento p').forEach(p => p.textContent = 'Clique aqui para selecionar o arquivo');
                    // Remove classes de erro remanescentes (reset pode não fazer isso)
                     document.querySelectorAll('.error').forEach(el => removeError(el));
                    // Opcional: Voltar para a tela de login
                    // toggleForms();
                }
                // Se saved for false, saveUser já mostrou o erro (ex: ID duplicado).

            } else {
                console.log('Formulário inválido. Corrija os erros indicados.');
                // Tenta focar no primeiro campo/container que contém a classe 'error'.
                 const firstErrorElement = registerForm.querySelector('.error');
                 if (firstErrorElement) {
                      // Se for um container (file, radio, checkbox), foca no primeiro input dentro dele
                     if (firstErrorElement.classList.contains('documento') || firstErrorElement.classList.contains('trilhas__form') || firstErrorElement.classList.contains('checkbox__form')) {
                         const focusableInput = firstErrorElement.querySelector('input, select, textarea');
                         if (focusableInput) focusableInput.focus();
                     } else {
                        firstErrorElement.focus(); // Foca diretamente no input/select
                     }
                 } else {
                     alert('Por favor, corrija os campos inválidos.');
                 }
            }
        });
    } else {
        console.error("Elemento do formulário de cadastro (#register) não encontrado.");
    }

    // Adiciona o listener principal para o evento 'submit' do formulário de login.
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let loginIsValid = true;

            const loginIdInput = document.getElementById('loginId');
            const loginPasswordInput = document.getElementById('loginPassword');

            // Função simples para garantir spans de erro no login (melhor ter no HTML)
             function ensureLoginErrorSpan(input) {
                 if (!input) return;
                 if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error__message')) {
                      // Verifica se já existe no pai (caso o input não seja o último filho)
                      const parent = input.parentElement;
                      if(parent && !parent.querySelector('.error__message')) {
                         const span = document.createElement('span');
                         span.className = 'error__message';
                         span.style.display = 'none'; // Começa oculto
                         // Adiciona DEPOIS do input
                         input.parentNode.insertBefore(span, input.nextSibling);
                         console.warn(`Adicionado dinamicamente .error__message para #${input.id} no login.`);
                      } else if(!parent) {
                          console.warn(`Não foi possível adicionar span de erro para #${input.id} (sem elemento pai).`);
                      }
                 }
             }
             ensureLoginErrorSpan(loginIdInput);
             ensureLoginErrorSpan(loginPasswordInput);

            // Validar Campos de Login
            removeError(loginIdInput);
            if (!loginIdInput.value.trim()) {
                showError(loginIdInput, 'ID do usuário é obrigatório.');
                loginIsValid = false;
            }
            removeError(loginPasswordInput);
            if (!loginPasswordInput.value) {
                showError(loginPasswordInput, 'Senha é obrigatória.');
                loginIsValid = false;
            }

            if (!loginIsValid) return;

            // Verificar Credenciais no localStorage
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                // ATENÇÃO: Comparação de senha insegura! Apenas para exemplo.
                const user = users.find(u => u.userId === loginIdInput.value && u.password === loginPasswordInput.value);

                if (user) {
                    alert('Login realizado com sucesso!');
                    loginForm.reset();
                    removeError(loginIdInput); // Limpa erros após sucesso
                    removeError(loginPasswordInput);
                    // Redirecionar ou atualizar UI aqui
                    // Ex: window.location.href = '/dashboard.html';
                } else {
                    showError(loginIdInput, 'ID do usuário ou senha incorretos.');
                    // Mostra erro na senha também, mas sem texto duplicado para não poluir
                    // Apenas aplica a classe .error visualmente
                    loginPasswordInput.classList.add('error'); // Adiciona classe diretamente
                    // Opcionalmente, pode-se usar showError com espaço se o CSS não estilizar só com .error
                    // showError(loginPasswordInput, ' ');
                }
            } catch (error) {
                console.error("Erro ao ler usuários do localStorage durante o login:", error);
                alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
            }
        });
    } else {
        console.error("Elemento do formulário de login (#login) não encontrado.");
    }

}); // Fim do listener DOMContentLoaded