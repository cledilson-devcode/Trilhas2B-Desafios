


function tocarSom(idAudio) {
    const elemento = document.querySelector(idAudio);
    
    if (elemento && elemento.localName === 'audio') {
        elemento.play();
    }else{
        console.log('Elemento não encontrado, ou seletor invalido');
        
    }
}



const listaTeclas = document.querySelectorAll('.tecla');


for (let i = 0; i < listaTeclas.length; i++) {
    
    const tecla = listaTeclas[i];
    const instrumento = tecla.classList[1];
    
    const idAudio = `#som_${instrumento}`;
    

    tecla.onclick = function () {
        tocarSom(idAudio);
    }

    tecla.onkeydown = function (evento) {
        if ((evento.code === 'Enter') || (evento.code === 'Space')) {
            tecla.classList.add('ativa');
        }
    }
    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
    }
    
}
