# Projeto Trilhas: Formulário de Inscrição e Login

Este projeto consiste em uma aplicação web frontend que implementa um sistema de formulários para inscrição (cadastro) e login de usuários para o programa "Trilhas". O foco principal está na validação de dados do lado do cliente (client-side) utilizando JavaScript puro e na interação dinâmica com o usuário, incluindo a alternância entre as telas de login e cadastro sem recarregar a página.

Os dados dos usuários cadastrados são armazenados localmente no navegador através do `localStorage`. **Importante:** O uso de `localStorage` para dados sensíveis como senhas é **inseguro** e foi utilizado aqui **apenas para fins de demonstração e aprendizado** em um ambiente local. Em uma aplicação real, senhas e dados de usuário devem ser tratados e armazenados de forma segura em um backend.

## Como Rodar Localmente

Este projeto é puramente frontend (HTML, CSS, JavaScript) e não requer um servidor backend complexo ou etapas de compilação para suas funcionalidades básicas de formulário e validação.

1.  **Clone ou Baixe o Repositório:**
    Obtenha os arquivos do projeto para sua máquina local. Se estiver usando Git:
    ```bash
    git clone -n https://github.com/cledilson-devcode/Trilhas2B-Desafios.git

    ```
    ```bash
    cd Trilhas2B-Desafios

    ```
    ```bash
    git checkout HEAD desafio2-3
    
    ```
    

2.  **Navegue até a Pasta:**
    Abra o terminal ou o explorador de arquivos e acesse o diretório onde você clonou.

3.  **Abra o Arquivo HTML:**
    Localize o arquivo HTML principal que contém os formulários (baseado no exemplo fornecido, pode ser `index.html` ou o arquivo específico que você está usando) e abra-o diretamente no seu navegador web preferido (Google Chrome, Firefox, Edge, etc.). Você pode fazer isso dando um duplo clique no arquivo.

4.  **Pronto!**
    O formulário de login/cadastro deverá ser exibido e estar funcional no seu navegador, permitindo testar as validações e o fluxo entre as telas. Certifique-se de que a estrutura de pastas (`./assets/css/`, `./assets/img/`, `./js/`) esteja preservada conforme referenciado no HTML.

## Tecnologias Utilizadas

* **HTML5:** Utilizado para a estruturação semântica do conteúdo, definição dos formulários e seus campos (`<input>`, `<select>`, `<label>`, etc.).
* **CSS3:** Responsável pela estilização visual dos elementos, layout, aparência dos formulários e feedback visual de erros (arquivos em `./assets/css/`). A aplicação de estilos de erro é feita através da classe `.error` adicionada via JavaScript.
* **JavaScript (ES6+):** Linguagem principal para adicionar interatividade e inteligência ao frontend:
    * Manipulação do DOM (Document Object Model): Selecionar elementos, modificar conteúdo e estilos.
    * Validação de Formulários: Verificar se os campos estão preenchidos corretamente, validar formatos (email, idade) e regras de negócio (tamanho de senha, seleção obrigatória).
    * Controle de Eventos: Capturar interações do usuário como cliques (`click`) e submissão de formulários (`submit`).
    * Lógica de Negócio Frontend: Alternar entre formulários, exibir/ocultar mensagens de erro.
    * Interação com Web APIs: Uso do `localStorage` para persistência de dados local.
* **LocalStorage:** API do navegador utilizada para armazenar os dados dos usuários cadastrados (em formato JSON string) localmente no navegador. Permite simular o login entre sessões no mesmo navegador.
* **Git/GitHub**: Controle de versão e hospedagem do código-fonte.

## Principais Funcionalidades

* **Formulário de Cadastro Completo:**
    * Coleta de informações do participante (Nome, Idade, CPF, Sexo, Email, Telefone).
    * Upload de Documento de Identidade (arquivo).
    * Coleta de Endereço Residencial (CEP, Rua, Número, Cidade, Estado).
    * Upload de Comprovante de Residência (arquivo).
    * Seleção de Trilha de Aprendizagem (grupo de radio buttons).
    * Definição de Credenciais de Acesso (ID de Usuário, Senha).
    * Checkbox de concordância com Termos e Condições.
* **Formulário de Login:**
    * Permite autenticação (simulada via `localStorage`) usando ID de Usuário e Senha.
* **Alternância Dinâmica de Formulários:**
    * Links "Cadastre-se" e "Faça login" permitem trocar entre os formulários sem recarregar a página, utilizando manipulação de classes CSS (`hidden`).
* **Validação Abrangente (Client-Side):**
    * Verificação de preenchimento obrigatório para **todos** os campos.
    * Validação de formato específico para Email e Idade.
    * Validação de tamanho mínimo para Senha.
    * Verificação se um arquivo foi selecionado para os campos `type="file"`.
    * Verificação se uma opção foi selecionada em campos `select` e `radio`.
    * Verificação se a checkbox de Termos foi marcada.
* **Feedback de Erro Detalhado:**
    * Exibição de mensagens de erro claras e específicas próximas a cada campo inválido (requer a presença de `<span class="error__message"></span>` no HTML).
    * Aplicação da classe `.error` aos inputs inválidos para feedback visual adicional via CSS.
* **Persistência Local (Demonstrativa):**
    * Cadastro salva os dados do novo usuário no `localStorage`.
    * Login verifica as credenciais fornecidas contra os dados salvos no `localStorage`.
    * Impede cadastro de `userId` duplicado.
* **Controle de Submissão:**
    * O envio padrão dos formulários é prevenido (`event.preventDefault()`) para permitir a validação e o tratamento dos dados via JavaScript.
* **Reset de Formulário:**
    * O formulário de cadastro é limpo (`reset()`) após um cadastro bem-sucedido.
    * O formulário de login é limpo (`reset()`) após um login bem-sucedido.

---

Este README fornece uma visão geral do projeto, suas funcionalidades e como interagir com ele localmente. Lembre-se das limitações de segurança do `localStorage` para aplicações em produção.