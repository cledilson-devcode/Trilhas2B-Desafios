// Desafio 1 - BackEnd
// Aluno: Cledilson Pereira Pinto Filho

// Questão 1: Crie uma variável chamada nome e atribua seu nome a ela. Em seguida, exiba o valor dessa variável.

let nome = 'Cledilson Pereira Pinto Filho';
console.log(`${nome}`);

//----------------------------------------------------------------------------------
// Questão 2: Crie duas variáveis: uma chamada idade e outra chamada altura. Atribua a idade o valor 25 e a altura o valor 1.75. Exiba ambos os valores.

let idade = 25;
let altura = 1.75;

console.log(`${idade} idade --- ${altura} altura`);

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

//----------------------------------------------------------------------------------
// Questão 6: Crie uma variável chamada nota e atribua um valor entre 0 e 10. Se a nota for maior ou igual a 7, exiba "Aprovado". Se for entre 5 e 6, exiba "Recuperação". Caso contrário, exiba "Reprovado".

let nota = 10;
if (nota >= 7) {
    console.log('Aprovado');
    
} else if(nota == 5 || nota == 6){
    console.log('Recuperação');
    
}else{
    console.log('Reprovado');
    
}

//----------------------------------------------------------------------------------
// Questão 7: Crie duas variáveis, numero1 e numero2, e atribua valores a elas. Verifique se os dois números são iguais e, caso sejam, exiba "Os números são iguais". Caso contrário, exiba "Os números são diferentes".

let numero1 = 10;
let numero2 = 10;
if (numero1 == numero2) {
    console.log('Os números são iguais');
    
} else {
    console.log('Os números são diferentes');
    
}

//----------------------------------------------------------------------------------
// Questão 8: Crie uma variável chamada nome e uma variável chamada idade. Exiba a mensagem "Olá, meu nome é [nome] e eu tenho [idade] anos", utilizando concatenação.
// Como já criei as variais no inicio, estou só sobrescrevendo se necessario
idade = 29;
console.log(`Olá, meu nome é ${nome} e eu tenho ${idade} anos.`);

//----------------------------------------------------------------------------------
// Questão 9: Crie um loop que imprima os números de 1 a 10 na tela.

let i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}

//----------------------------------------------------------------------------------
