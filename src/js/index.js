(()=>{
    const botoesCarrossel = document.querySelectorAll('.botao');
    const img = document.querySelectorAll('.img');

    const timeout = 5000; //Controla o tempo que demora para trocar de imagem sozinho
    let pauseTimeout = null;
    let pause = true; //Controla se a função de trocar de imagem deve ser executada ou está pausada

    botoesCarrossel.forEach((botao, indice) => {
        botao.addEventListener('click', () => {
            
            const botaoSelecionado = document.querySelector('.selecionado');
            botaoSelecionado.classList.remove('selecionado');
            botao.classList.add('selecionado');

            const imagemAtiva = document.querySelector('.ativa');
            imagemAtiva.classList.remove('ativa');
            img[indice].classList.add('ativa');

            //Toda vez que o usuário trocar por conta própria, reiniciar contagem para mudar sozinho
            clearTimeout(pauseTimeout);
            pause = true;
            startUnpauseTimeout(timeout * 2);
            
        })
    })

    function startUnpauseTimeout(unpauseTimeout = timeout){
        pauseTimeout = setTimeout(() => {
            pause = false;
        }, unpauseTimeout)
    }

    const startInterval = () => {
        interval = setInterval(() => {
            if(pause) return;
            
            changeActiveImg();
            
        }, timeout);
    }

    function changeActiveImg(){

        let indiceAtivo = 0;

        img.forEach((img, indice) => {
            if(img.classList == "img ativa")
            {
                indiceAtivo = indice;
            }
        });

        let proximoIndice = (indiceAtivo + 1 < img.length ? indiceAtivo + 1 : 0);

        const botaoSelecionado = botoesCarrossel[indiceAtivo];
        const botaoProximo = botoesCarrossel[proximoIndice];
        botaoSelecionado.classList.remove('selecionado');
        botaoProximo.classList.add('selecionado');

        const imagemAtiva = img[indiceAtivo];
        const imagemProxima = img[proximoIndice];
        imagemAtiva.classList.remove('ativa');
        imagemProxima.classList.add('ativa');
    }

    //Executa as funções para mudar de imagem se o usuário não interagir
    startUnpauseTimeout();
    startInterval();

})();