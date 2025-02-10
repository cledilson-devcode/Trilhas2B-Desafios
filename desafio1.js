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
// Questão 10: Crie um loop que peça ao usuário para digitar um número até que ele digite o número 5.
let numero;
while (numero != 5) {
    numero = prompt('Digite um número que seja igual a 5 ;D');
    if (numero == 5) {
        console.log('Você acertou!!');
        
    }else{
        console.log(`Número está incorreto!`);
    }
}

//----------------------------------------------------------------------------------
// Questão 11: Crie um loop que imprima a tabuada do número 7, de 1 a 10.
console.log('Tabuada de 7');
for (let i = 1; i <= 10; i++){
    console.log(`->>> ${7*i}`);
}

//----------------------------------------------------------------------------------
// Questão 12: Crie um loop que exiba todos os números pares de 0 a 20.

for(let numeroPar = 0; numeroPar <= 20; numeroPar++){
    if (numeroPar % 2 == 0) {
        console.log(numeroPar);        
    }
}

//----------------------------------------------------------------------------------
// Questão 13: Escreva um código que calcule a área de um círculo. Utilize uma função para realizar o cálculo. A função deve receber o raio como parâmetro e retornar a área.
let raio = 8;
const PI = 3.14;
function calculandoAreaCirculo(params) {
    let area = PI * raio**2;
    return area;
}
console.log(`A área do circulo é: ${calculandoAreaCirculo()}`);


//----------------------------------------------------------------------------------
//Questão 14: Crie um programa simples que calcule a soma de dois números e imprima o resultado. Após isso comente cada linha do seu código explicando o que cada parte faz.

numero1 = 3; // Primeiro número para soma
numero2 = 5; // Segundo número para soma

// Função retorna a soma os dois número passados pelas variaveis numero1 e numero2
function soma(numero1, numero2) {
    return numero1 + numero2;
}

let resultadoSoma = soma(numero1, numero2); // Variavel que recebe o resultado da soma

// Exibindo o resultado da soma através no console
console.log(`Resultado da soma é: ${resultadoSoma}`);

//----------------------------------------------------------------------------------


