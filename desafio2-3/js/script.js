// Espera que todo o conteúdo do HTML seja carregado e a árvore DOM esteja pronta antes de executar o JavaScript.
// Isso evita erros ao tentar selecionar elementos que ainda não existem na página.
document.addEventListener('DOMContentLoaded', function() {

    // --- Seleção dos Elementos HTML Principais ---
    // Selecionamos os elementos que contêm os formulários (divs) para poder escondê-los/mostrá-los.
    const loginFormContainer = document.getElementById('loginForm'); // Container do formulário de login
    const registerFormContainer = document.getElementById('registerForm'); // Container do formulário de registro

    // Selecionamos os links que o usuário clica para alternar entre os formulários.
    const showRegisterLink = document.getElementById('showRegister'); // Link "Cadastre-se" no form de login
    const showLoginLink = document.getElementById('showLogin'); // Link "Faça login" no form de registro

    // Selecionamos os elementos <form> reais, que contêm os campos e serão submetidos.
    const loginForm = document.getElementById('login'); // O formulário <form> de login
    const registerForm = document.getElementById('register'); // O formulário <form> de registro

    // --- Funções Auxiliares ---

    /**
     * Alterna a visibilidade dos containers dos formulários de login e registro.
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
     * @param {HTMLElement} inputElement - O elemento de input (<input>, <select>, etc.) que está inválido.
     * @param {string} message - A mensagem de erro a ser exibida.
     */
    function showError(inputElement, message) {
        // Adiciona a classe 'error' ao input para que possa ser estilizado via CSS (ex: borda vermelha).
        inputElement.classList.add('error');

        // Tenta encontrar o elemento HTML onde a mensagem de erro deve ser exibida.
        let errorMessageElement = null;

        // 1. Verifica se o elemento *imediatamente seguinte* ao input tem a classe '.error__message'.
        // Isso funciona bem se o span de erro estiver logo após o input no HTML.
        if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains('error__message')) {
            errorMessageElement = inputElement.nextElementSibling;
        } else {
            // 2. Se não for o irmão seguinte, procura pelo contêiner pai mais próximo que agrupa
            //    o label, input e erro (ex: .form__grupo, .form-group, etc.).
            const parentGroup = inputElement.closest('.form__grupo, .form-group, .documento, .checkbox__form, .trilhas__form');
            if (parentGroup) {
                // Dentro desse grupo, procura por um elemento com a classe '.error__message'.
                errorMessageElement = parentGroup.querySelector('.error__message');

                // Tratamentos especiais para estruturas mais complexas no HTML fornecido:
                // Para inputs de arquivo que estão dentro de uma label com classe 'documento'.
                if (inputElement.type === 'file' && inputElement.parentElement?.classList.contains('documento')) {
                    // Procura o span de erro dentro da label 'documento'.
                    errorMessageElement = inputElement.parentElement.querySelector('.error__message');
                }
                // Para o grupo de radio buttons (trilhas).
                if (inputElement.type === 'radio' && parentGroup.classList.contains('trilhas__form')) {
                    // Procura um span de erro associado ao container do grupo de rádios.
                    errorMessageElement = parentGroup.querySelector('.error__message');
                 }
                 // Para a checkbox de termos
                 if (inputElement.type === 'checkbox' && parentGroup.classList.contains('checkbox__form')) {
                    errorMessageElement = parentGroup.querySelector('.error__message');
                 }
            }
        }

        // Se encontrou um elemento para exibir a mensagem:
        if (errorMessageElement) {
            errorMessageElement.textContent = message; // Define o texto da mensagem.
            errorMessageElement.style.display = 'block'; // Garante que o span esteja visível (CSS pode escondê-lo por padrão).
        } else {
            // Se não encontrou um span de erro específico no HTML:
            // Loga um aviso no console para o desenvolvedor. É recomendado adicionar o span no HTML.
            console.warn(`Não foi encontrado o span .error__message para o input: ${inputElement.id || inputElement.name}`, inputElement);
            // Neste caso, apenas a classe 'error' no input dará o feedback visual.
        }
    }

    /**
     * Remove a mensagem de erro e a classe 'error' de um campo de input específico.
     * @param {HTMLElement} inputElement - O elemento de input do qual remover o erro.
     */
    function removeError(inputElement) {
        // Remove a classe 'error' do input, revertendo qualquer estilo de erro aplicado via CSS.
        inputElement.classList.remove('error');

        // Tenta encontrar o span de erro associado usando a mesma lógica da função showError.
        let errorMessageElement = null;
        if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains('error__message')) {
           errorMessageElement = inputElement.nextElementSibling;
        } else {
           const parentGroup = inputElement.closest('.form__grupo, .form-group, .documento, .checkbox__form, .trilhas__form');
            if (parentGroup) {
                errorMessageElement = parentGroup.querySelector('.error__message');
                 if (inputElement.type === 'file' && inputElement.parentElement?.classList.contains('documento')) {
                    errorMessageElement = inputElement.parentElement.querySelector('.error__message');
                }
                if (inputElement.type === 'radio' && parentGroup.classList.contains('trilhas__form')) {
                    errorMessageElement = parentGroup.querySelector('.error__message');
                }
                if (inputElement.type === 'checkbox' && parentGroup.classList.contains('checkbox__form')) {
                    errorMessageElement = parentGroup.querySelector('.error__message');
                 }
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

    // Adiciona o listener principal para o evento 'submit' do formulário de registro.
    if (registerForm) { // Garante que o elemento <form id="register"> existe.
        registerForm.addEventListener('submit', (e) => {
            // 1. Prevenir o Envio Padrão: Impede que o navegador envie o formulário
            // da maneira tradicional (o que causaria um recarregamento da página).
            // Nós queremos controlar o envio e a validação com JavaScript.
            e.preventDefault();

            // 2. Flag de Validação: Variável para rastrear se todos os campos passam na validação.
            // Começa como true e se torna false se qualquer campo falhar.
            let isValid = true;

            // --- 3. Obter Referências aos Elementos de Input ---
            // Pegamos todos os elementos de input/select/etc. que precisamos validar ou ler.
            // Fazer isso aqui evita repetir document.getElementById dentro das validações.
            const nameInput = document.getElementById('nome');
            const ageInput = document.getElementById('age');
            const cpfInput = document.getElementById('cpf');
            const sexoInput = document.getElementById('sexo'); // <select>
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');
            const identidadeInput = document.getElementById('identidade'); // <input type="file">
            const cepInput = document.getElementById('cep');
            const ruaInput = document.getElementById('rua');
            const numCasaInput = document.getElementById('numCasa');
            const cidadeInput = document.getElementById('cidade');
            const estadoInput = document.getElementById('estado');
            const residenciaInput = document.getElementById('comprovante__residencia'); // <input type="file">
            const trilhaCheckedInput = document.querySelector('input[name="trilha"]:checked'); // O radio button selecionado
            const trilhaContainer = document.querySelector('.trilhas__form'); // Div que contém os radios (para erro)
            const userIdInput = document.getElementById('userId');
            const passwordInput = document.getElementById('password');
            // Seleciona a checkbox de termos (HTML precisa ter input dentro de .checkbox__form)
            const termosCheckbox = document.querySelector('.checkbox__form input[type="checkbox"]');
            const termosContainer = document.querySelector('.checkbox__form'); // Div dos termos (para erro)

            // --- 4. Validações Individuais ---
            // Para cada campo, primeiro removemos qualquer erro anterior (removeError)
            // e depois aplicamos as regras de validação. Se inválido, exibimos o erro (showError)
            // e marcamos o formulário como inválido (isValid = false).

            // Função auxiliar interna para simplificar a lógica de validação repetitiva
            function validateField(input, validationFn, emptyMsg, invalidMsg = null) {
                 // Segurança: Verifica se o input foi encontrado no HTML.
                 if (!input) {
                     console.error(`Elemento de input não encontrado durante a validação (verifique o ID ou seletor).`);
                     isValid = false; // Considera inválido se o campo nem existe.
                     return;
                 }
                 // Limpa erro anterior deste campo.
                removeError(input);
                // Obtém o valor de forma apropriada para cada tipo de input.
                const value = input.type === 'checkbox' ? input.checked : (input.type === 'file' ? input.files : input.value);

                // Validação para Checkbox (termos)
                if (input.type === 'checkbox') {
                    if (!value) { // Se não estiver marcado (checked = false)
                        // Mostra erro no container ou, se não encontrar, no próprio input (menos ideal).
                        showError(termosContainer || input, emptyMsg);
                        isValid = false;
                    }
                // Validação para Arquivo (identidade, residencia)
                } else if (input.type === 'file') {
                    if (value.length === 0) { // Se nenhum arquivo foi selecionado (FileList está vazio)
                        showError(input, emptyMsg);
                        isValid = false;
                    }
                // Validação para outros tipos (text, number, email, tel, select, password)
                } else if (typeof value === 'string') { // Garante que é string para usar trim()
                     // Caso especial: Select pode ter value="" como válido se for a opção padrão "Selecione"
                     if(input.tagName === 'SELECT' && !value) { // Se for select e o valor for vazio (não selecionou nada útil)
                         showError(input, emptyMsg);
                         isValid = false;
                     // Para outros campos de texto, verifica se está vazio após remover espaços em branco (trim).
                     } else if(input.tagName !== 'SELECT' && !value.trim()){
                         showError(input, emptyMsg);
                         isValid = false;
                     // Se não está vazio, mas existe uma função de validação específica (ex: email, idade) e ela falha...
                     } else if (invalidMsg && validationFn && !validationFn(value)) {
                         // ...mostra a mensagem de formato inválido.
                         showError(input, invalidMsg);
                         isValid = false;
                     }
                }
            }

             // Executa as validações para cada campo usando a função auxiliar
             validateField(nameInput, null, 'Nome completo é obrigatório');
             validateField(emailInput, validateEmail, 'Email é obrigatório', 'Formato de email inválido');
             validateField(ageInput, validateAge, 'Idade é obrigatória', 'Idade deve ser um número entre 0 e 120');
             validateField(cpfInput, null, 'CPF é obrigatório'); // Poderia adicionar validação de formato para CPF aqui
             validateField(sexoInput, null, 'Seleção de sexo é obrigatória'); // Valida se value não é "" (assumindo option padrão tem value="")
             validateField(telefoneInput, null, 'Telefone é obrigatório'); // Poderia adicionar validação de formato para telefone
             validateField(identidadeInput, null, 'Comprovante de identidade (arquivo) é obrigatório');
             validateField(cepInput, null, 'CEP é obrigatório'); // Poderia adicionar validação de formato ou busca ViaCEP
             validateField(ruaInput, null, 'Rua é obrigatória');
             validateField(numCasaInput, null, 'Número é obrigatório');
             validateField(cidadeInput, null, 'Cidade é obrigatória');
             validateField(estadoInput, null, 'Estado é obrigatório');
             validateField(residenciaInput, null, 'Comprovante de residência (arquivo) é obrigatório');
             validateField(userIdInput, null, 'ID de usuário é obrigatório');

             // Validação de Senha (não usa validateField por ter lógica específica e não usar trim)
             removeError(passwordInput); // Limpa erro anterior
             if (!passwordInput.value) { // Verifica se está vazia
                 showError(passwordInput, 'Senha é obrigatória');
                 isValid = false;
             } else if (passwordInput.value.length < 6) { // Verifica tamanho mínimo
                 showError(passwordInput, 'Senha deve ter no mínimo 6 caracteres');
                 isValid = false;
             }

              // Validação da Checkbox de Termos
              if(termosCheckbox) {
                // Usa validateField para verificar se está marcada (checked).
                validateField(termosCheckbox, null, 'Você deve aceitar os Termos e Condições');
              } else {
                // Avisa se a checkbox não foi encontrada (importante para o fluxo).
                console.warn("Checkbox de Termos (.checkbox__form input[type='checkbox']) não encontrada no HTML.");
                // Pode decidir se isso deve invalidar o formulário: isValid = false;
              }

             // Validação do Grupo de Radio Buttons (Trilha)
             if(trilhaContainer) { // Se o container dos rádios foi encontrado...
                removeError(trilhaContainer); // ...tenta limpar erro anterior associado a ele.
             } else {
                console.warn("Container .trilhas__form não encontrado para exibir erro de seleção de trilha.");
             }

             if (!trilhaCheckedInput) { // Se nenhum radio com name="trilha" está marcado...
                 // Tenta exibir o erro no container (se ele existir e tiver um .error__message).
                  const trilhaErrorSpan = trilhaContainer?.querySelector('.error__message');
                  if(trilhaErrorSpan && trilhaContainer) {
                      // Mostra erro associado ao container (precisa de um span .error__message dentro dele no HTML).
                      // Passamos o próprio container como 'input' para showError encontrar o span dentro dele.
                      showError(trilhaContainer, 'Seleção de trilha é obrigatória');
                  } else if (trilhaContainer) {
                      // Se não tem span, adiciona classe de erro ao container (precisa de CSS) e dá um alerta.
                      trilhaContainer.classList.add('error');
                      alert('Por favor, selecione uma trilha de aprendizagem.');
                  } else {
                     // Se nem o container foi achado, apenas um alerta genérico.
                     alert('Por favor, selecione uma trilha de aprendizagem.');
                  }
                 isValid = false; // Marca o formulário como inválido.
             } else if(trilhaContainer) { // Se estava válido ou foi corrigido...
                 // ...remove a classe de erro do container e garante que a msg de erro (se houver) está limpa/oculta.
                 trilhaContainer.classList.remove('error');
                 const trilhaErrorSpan = trilhaContainer.querySelector('.error__message');
                 if(trilhaErrorSpan) {
                     trilhaErrorSpan.textContent = '';
                     trilhaErrorSpan.style.display = 'none';
                 }
             }
             // Guarda o valor da trilha selecionada (ou null se inválido).
             const trilhaSelecionadaValue = trilhaCheckedInput ? trilhaCheckedInput.value : null;


            // --- 5. Processamento Após Validação ---
            if (isValid) { // Se NENHUM erro foi encontrado...
                console.log('Formulário válido. Preparando para salvar...');

                // Monta um objeto com os dados do formulário para salvar.
                // ATENÇÃO: Arquivos não são incluídos diretamente. Salvamos apenas os nomes como referência.
                // ATENÇÃO 2: Salvar senha em localStorage é INSEGURO! Apenas para fins deste exemplo.
                const userData = {
                    name: nameInput.value.trim(), // Usar trim() aqui para limpar espaços extras
                    age: ageInput.value,
                    cpf: cpfInput.value.trim(),
                    sexo: sexoInput.value,
                    email: emailInput.value.trim(),
                    telefone: telefoneInput.value.trim(),
                    identidadeFilename: identidadeInput.files.length > 0 ? identidadeInput.files[0].name : null, // Nome do arquivo ou null
                    cep: cepInput.value.trim(),
                    rua: ruaInput.value.trim(),
                    numCasa: numCasaInput.value.trim(),
                    cidade: cidadeInput.value.trim(),
                    estado: estadoInput.value.trim(),
                    residenciaFilename: residenciaInput.files.length > 0 ? residenciaInput.files[0].name : null, // Nome do arquivo ou null
                    trilha: trilhaSelecionadaValue,
                    userId: userIdInput.value.trim(),
                    password: passwordInput.value // Senha NÃO deve ter trim()
                };

                // Tenta salvar os dados no localStorage.
                const saved = saveUser(userData);

                // Se o salvamento foi bem-sucedido (saveUser retornou true)...
                if (saved) {
                    alert('Cadastro realizado com sucesso!');
                    registerForm.reset(); // Limpa todos os campos do formulário.

                    // Limpa o feedback visual dos campos de arquivo (o texto dentro do <p>).
                    // É preciso fazer isso manualmente pois reset() não afeta o conteúdo de outros elementos.
                    document.querySelectorAll('.documento p').forEach(p => p.textContent = 'Clique aqui para selecionar o arquivo');

                    // Opcional: Descomente a linha abaixo para voltar automaticamente para a tela de login após o cadastro.
                    // toggleForms();
                }
                // Se saved for false (ex: ID duplicado), a função saveUser já exibiu o alerta/erro.

            } else { // Se isValid for false...
                console.log('Formulário inválido. Corrija os erros indicados.');
                // Tenta focar no primeiro campo que contém a classe 'error' para ajudar o usuário.
                 const firstError = registerForm.querySelector('.error');
                 if (firstError) {
                     firstError.focus(); // Coloca o cursor no primeiro campo inválido.
                 } else {
                     // Se, por algum motivo, nenhum campo tem a classe .error, dá um alerta genérico.
                     alert('Por favor, corrija os campos inválidos.');
                 }
            }
        });
    } else {
        // Avisa se o elemento <form id="register"> não foi encontrado no HTML.
        console.error("Elemento do formulário de registro (#register) não encontrado.");
    }

    // Adiciona o listener principal para o evento 'submit' do formulário de login.
    if (loginForm) { // Garante que o elemento <form id="login"> existe.
        loginForm.addEventListener('submit', (e) => {
            // 1. Prevenir o Envio Padrão
            e.preventDefault();
            let loginIsValid = true; // Flag de validação para o login

            // 2. Obter Inputs de Login
            const loginIdInput = document.getElementById('loginId');
            const loginPasswordInput = document.getElementById('loginPassword');

            // 3. Garantir Spans de Erro (Opcional, mas ajuda se HTML estiver incompleto)
            // Esta função verifica se existe um span de erro; se não, cria um dinamicamente.
            // É MELHOR ter os spans diretamente no HTML!
             function ensureErrorSpan(input) {
                 if (!input) return; // Sai se o input não foi encontrado
                 const parent = input.parentElement; // Pega o elemento pai (geralmente .form-group)
                 // Se o pai existe e NÃO contém um span .error__message...
                 if (parent && !parent.querySelector('.error__message')) {
                     const span = document.createElement('span'); // Cria o span
                     span.className = 'error__message'; // Define a classe
                     // Estilos básicos para visibilidade
                     span.style.color = 'red';
                     span.style.display = 'none'; // Começa oculto
                     span.style.fontSize = '0.8em';
                     parent.appendChild(span); // Adiciona o span ao final do elemento pai
                     console.warn(`Adicionado dinamicamente .error__message para #${input.id}. É recomendado adicionar este span ao HTML.`);
                 }
             }
             ensureErrorSpan(loginIdInput);
             ensureErrorSpan(loginPasswordInput);

            // 4. Validar Campos de Login
            removeError(loginIdInput); // Limpa erro anterior
            if (!loginIdInput.value.trim()) { // Verifica se ID está vazio
                showError(loginIdInput, 'ID do usuário é obrigatório.');
                loginIsValid = false;
            }
            removeError(loginPasswordInput); // Limpa erro anterior
            if (!loginPasswordInput.value) { // Verifica se Senha está vazia (sem trim)
                showError(loginPasswordInput, 'Senha é obrigatória.');
                loginIsValid = false;
            }

            // Se ID ou Senha estiverem vazios, não continua a verificação.
            if (!loginIsValid) return;

            // 5. Verificar Credenciais no localStorage
            try {
                // Obtém a lista de usuários.
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                // Procura por um usuário que tenha o ID E a senha correspondentes.
                // ATENÇÃO: Comparar senhas diretamente assim é INSEGURO! Em um sistema real,
                // senhas devem ser tratadas com hashing.
                const user = users.find(u => u.userId === loginIdInput.value && u.password === loginPasswordInput.value);

                // 6. Processar Resultado
                if (user) { // Se encontrou um usuário correspondente...
                    alert('Login realizado com sucesso!');
                    loginForm.reset(); // Limpa os campos do formulário de login.
                    // Aqui você redirecionaria o usuário ou atualizaria a interface.
                    // Exemplo: window.location.href = '/pagina-principal.html';
                } else { // Se não encontrou usuário com essas credenciais...
                    // Mostra erro nos campos para indicar o problema.
                    showError(loginIdInput, 'ID do usuário ou senha incorretos.');
                    // Mostra estado de erro na senha também, mas sem repetir a msg.
                    showError(loginPasswordInput, ' '); // Usa espaço para ativar o estilo de erro sem texto duplicado
                    // O alert abaixo é opcional, pois os campos já indicam o erro visualmente.
                    // alert('ID do usuário ou senha incorretos!');
                }
            } catch (error) {
                // Se houver erro ao ler/processar o localStorage.
                console.error("Erro ao ler usuários do localStorage durante o login:", error);
                alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
            }
        });
    } else {
        // Avisa se o elemento <form id="login"> não foi encontrado no HTML.
        console.error("Elemento do formulário de login (#login) não encontrado.");
    }

}); // Fim do listener DOMContentLoaded