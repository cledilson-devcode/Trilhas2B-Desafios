// Desafio 1 - BackEnd
// Aluno: Cledilson Pereira Pinto Filho

// Questão 1: Crie uma variável chamada nome e atribua seu nome a ela. Em seguida, exiba o valor dessa variável.

let nome = 'Cledilson Pereira Pinto Filho';
console.log(`Meu nome é ${nome}`);

//----------------------------------------------------------------------------------
// Questão 2: Crie duas variáveis: uma chamada idade e outra chamada altura. Atribua a idade o valor 25 e a altura o valor 1.75. Exiba ambos os valores.

let idade = 25;
let altura = 1.75;

console.log(`Minha idade é: ${idade} e tenha ${altura} de altura.`);

//----------------------------------------------------------------------------------
// Questão 3: Crie uma variável chamada preco com o valor 50 e uma variável desconto com o valor 0.2 (20%). Calcule o preço com desconto e exiba o valor final.

let preco = 50;
let desconto = 0.2;
let valorFinal = preco - (preco * desconto);
console.log(`O produto com preço ${preco} possui um desconto de ${desconto * 100}% , assim o valor final é: ${valorFinal}`);

//----------------------------------------------------------------------------------
// Questão 4: Crie uma variável chamada temperatura e atribua o valor 30. Se a temperatura for maior que 25, exiba a mensagem "Está calor!". Caso contrário, exiba "Está fresco!".

let temperatura = 30;
if (temperatura > 25) {
    console.log('Está calor!');
} else {
    console.log('Está fresco!');
}

//----------------------------------------------------------------------------------
// Questão 5: Crie uma variável idade e atribua um valor. Se a pessoa for maior de idade (18 ou mais), exiba "Você é maior de idade". Caso contrário, exiba "Você é menor de idade".

idade = 29;
if (idade >= 18) {
    console.log('Você é maior de idade.');
    
} else {
    console.log('Você é menor de idade.');
    
}