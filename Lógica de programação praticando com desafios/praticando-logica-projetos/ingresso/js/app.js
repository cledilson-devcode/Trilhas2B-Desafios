function comprar() {
    let tipoIngresso = document.getElementById('tipo-ingresso').value;
    let qtdIngresso = parseInt(document.getElementById('qtd').value);
    
    if (tipoIngresso == 'pista') {
        comprarPista(qtdIngresso);
    } else if(tipoIngresso == 'superior'){
        comprarSuperior(qtdIngresso);
    } else{
        comprarInferior(qtdIngresso);
    }

}

function comprarPista(qtdIngresso) {
    let qtdPista = parseInt(document.getElementById('qtd-pista').textContent);

    if (qtdIngresso > qtdPista) {
        alert('Quantidade indisponível para tipo pista');
    } else {
        qtdPista = qtdPista - qtdIngresso;
        document.getElementById('qtd-pista').textContent = qtdPista;
        alert('Compra realizada com sucesso');

    }
}

function comprarSuperior(qtdIngresso) {
    let qtd = parseInt(document.getElementById('qtd-superior').textContent);
    if (qtdIngresso > qtd) {
        alert('Quantidade indisponível para tipo pista');
    } else {
        qtd = qtd - qtdIngresso;
        document.getElementById('qtd-superior').textContent = qtd;
        alert('Compra realizada com sucesso');

    }
}

function comprarInferior(qtdIngresso) {
    let qtd = parseInt(document.getElementById('qtd-inferior').textContent);
    if (qtdIngresso > qtd) {
        alert('Quantidade indisponível para tipo pista');
    } else {
        qtd = qtd - qtdIngresso;
        document.getElementById('qtd-inferior').textContent = qtd;
        alert('Compra realizada com sucesso');

    }
}