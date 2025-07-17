let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1',  'Jogo do número secreto')
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`)
}

exibirMensagemInicial()

    function verificarChute() {
    let chute = document.querySelector('.container__input').value;

    if (chute == numeroSecreto) {
        if (tentativas > 8) {
    const sustoDiv = document.createElement('div');
    sustoDiv.id = 'susto';
    sustoDiv.innerHTML = `
        <style>
            @keyframes piscar {
                0%, 50%, 100% { color: red; }
                25%, 75% { color: white; }
            }
            @keyframes tremer {
                0%, 100% { transform: translate(0, 0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(2px, -2px); }
                60% { transform: translate(-2px, -2px); }
                80% { transform: translate(2px, 2px); }
            }
            .texto-susto {
                animation: piscar 0.5s infinite, tremer 0.2s infinite;
                font-weight: 900;
                text-transform: uppercase;
                user-select: none;
            }
        </style>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: 'Chakra Petch', sans-serif;
            text-align: center;
            font-size: 3rem;
            color: red;
            padding: 0 10px;
            box-sizing: border-box;
        ">
            <div class="texto-susto" style="margin-bottom: 20px;">
                VOCÊ ACERTOU... MAS DEMOROU DEMAIS! 👹
            </div>
            <img src="susto.gif" style="width: 100vw; max-height: 70vh; object-fit: contain;">
            <div class="texto-susto" style="margin-top: 20px; font-size: 2rem;">
                TENTE NOVAMENTE EM MENOS TENTATIVAS 👻
            </div>
            <audio autoplay>
                <source src="susto.mp3" type="audio/mpeg">
            </audio>
        </div>
    `;
    document.body.appendChild(sustoDiv);

    const audio = sustoDiv.querySelector('audio');
    audio.volume = 1.0;
}

        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela('h1', 'Adivinhe o número secreto!');
    exibirTextoNaTela('p', 'Digite um número entre 1 e 1000:');
    document.getElementById('reiniciar').setAttribute('disabled', true);

    // Remove susto se estiver presente
    const sustoDiv = document.getElementById('susto');
    if (sustoDiv) {
        sustoDiv.remove();
    }
}