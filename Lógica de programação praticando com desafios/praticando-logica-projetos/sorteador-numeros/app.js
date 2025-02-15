
function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);
    
    let sorteados = [];
    let numero;

    for (let i = 0; i < quantidade; i++) {
        numero = numeroAleatorio(de, ate);
        
        while(sorteados.includes(numero)){
            numero = numeroAleatorio(de, ate);
        }

        sorteados.push(numero);
        
    }
    
    let resultados = document.getElementById('resultado');
    resultados.innerHTML = `<label class="texto__paragrafo">Números sorteados:  <span>${sorteados}</span></label>`;

    alterarStatusButao();

}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusButao() {
    let botao = document.getElementById('btn-reiniciar');
    if(botao.classList.contains('container__botao-desabilitado')){
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    }else{
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');

    }
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados:  <span >nenhum até agora</span></label>';
    alterarStatusButao();
}


