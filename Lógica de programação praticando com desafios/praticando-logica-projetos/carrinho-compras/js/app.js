let valorTotal = 0;
document.getElementById('lista-produtos').innerHTML = '';
document.getElementById('valor-total').textContent = 'R$ 0,00';

function adicionar() {
    // recuperando dados do produto
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0];
    let valorProduto = produto.split('R$')[1];
    let quantidadeProduto = document.getElementById('quantidade').value;
    // calcular o preço total
    let valorProdutos = quantidadeProduto * valorProduto;
    
    // Adicionando produtos ao carrinho
    let carrinho = document.getElementById('lista-produtos');
    carrinho.innerHTML = carrinho.innerHTML + `
        <section class="carrinho__produtos__produto">
          <span class="texto-azul">${quantidadeProduto}x</span> ${nomeProduto} <span class="texto-azul">R$${valorProdutos}</span>
        </section>`;

    // Atualizando valor total
    valorTotal = valorTotal + valorProdutos;
    let campoValorTotal = document.getElementById('valor-total');
    campoValorTotal.textContent = `R$ ${valorTotal}`;
    document.getElementById('quantidade').value = 0;
    

}

function limpar() {
    valorTotal = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0,00';

}