


function tocarSom(idAudio) {
    document.querySelector(idAudio).play();
}



const listaTeclas = document.querySelectorAll('.tecla');


for (let i = 0; i < listaTeclas.length; i++) {
    
    const tecla = listaTeclas[i];
    const instrumento = tecla.classList[1];
    
    const idAudio = `#som_${instrumento}`;
    

    listaTeclas[i].onclick = function () {
        tocarSom(idAudio);
    }
    
}
