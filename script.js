const botao = document.getElementById('botao-tema');
const body = document.body;

// --- PERSISTÊNCIA DO TEMA ---
const temasalvo = localStorage.getItem('tema');
temaEscuro(temasalvo === 'escuro');

function temaEscuro(tipo) {
    if (tipo) { 
        body.classList.add('escuro');
        botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('escuro');
        botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

botao.addEventListener('click', () => {
    const isescuro = body.classList.toggle('escuro');
    temaEscuro(isescuro);
    localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// --- LÓGICA DA CALCULADORA ---
const display = document.querySelector('#display');
const botoes = document.querySelectorAll('.edit');

botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const isFuncaoEspecial =
            botao.classList.contains('backspace') ||
            botao.classList.contains('AC') ||
            botao.classList.contains('igual') ||
            botao.classList.contains('adicao') ||
            botao.classList.contains('subtracao') ||
            botao.classList.contains('multiplicacao') ||
            botao.classList.contains('divisao');

        if (!isFuncaoEspecial) {
            display.value += botao.innerText;
        }
    });
});

//Botão Igual//
const btnIgual = document.querySelector('.igual');

if (btnIgual && display) {
    btnIgual.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        try {
            let expressao = (display.value || display.innerText || "").trim();

            let contaProcessada = expressao;

            const abertos = (contaProcessada.match(/\(/g) || []).length;
            const fechados = (contaProcessada.match(/\)/g) || []).length;
            if (abertos > fechados) {
                contaProcessada += ")".repeat(abertos - fechados);
            }

            contaProcessada = contaProcessada
                .replace(/=/g, "")
                .replace(/X/g, "*")
                .replace(/x/g, "*")
                .replace(/\u00F7/g, "/")
                .replace(/,/g, ".")
                .replace(/(\d+)%(\d+)/g, "($1/100)*$2")
                .replace(/(\d+)%/g, "($1/100)")
                .replace(/[+\-X\u00F7*\/]$/, "");


            const resultadoFinal = eval(contaProcessada);

            if (display.tagName === 'INPUT') {
                display.value = resultadoFinal;
            } else {
                display.innerText = resultadoFinal;
            }

        } catch (erro) {
            console.error("Falha na conta:", erro);
            if (display.tagName === 'INPUT') display.value = "Erro";
            else display.innerText = "Erro";
        }
    });
}

// Backspace //
const btnApagar = document.querySelector('.backspace');
if (btnApagar) { 
    btnApagar.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
    });
}

/// AC ///
const btnLimpar = document.querySelector('.AC');
if (btnLimpar) { 
    btnLimpar.addEventListener('click', () => {
        display.value = '';
    });
}
//Soma//
const btnSoma = document.querySelector('.adicao');
let soma = 0;
if (btnSoma) {
    btnSoma.addEventListener('click', () => {
        const ultimoChar = display.value.slice(-1);
        const sinais = ['+', '-', '*', '/'];

        if (display.value != "" && !sinais.includes(ultimoChar)) {
            display.value += "+";
        }
    });
}

// Subtração //
const btnSubtracao = document.querySelector('.subtracao');
let subtracao = 0;
if (btnSubtracao) {
    btnSubtracao.addEventListener('click', () => {
        const ultimoChar = display.value.slice(-1);
        const sinais = ['+', '-', 'x', '/'];

        if (display.value != "" && !sinais.includes(ultimoChar)) {
            display.value += "-";
        }
    });
}

// Multiplicação //
const btnMultiplicacao = document.querySelector('.multiplicacao');
let multiplicacao = 0;
if (btnMultiplicacao) {
    btnMultiplicacao.addEventListener('click', () => {
        const ultimoChar = display.value.slice(-1);
        const sinais = ['+', '-', 'x', '/'];

        if (display.value != "" && !sinais.includes(ultimoChar)) {
            display.value += "x";
        }
    });
}

// Divisão //
const btnDivisao = document.querySelector('.divisao');
let divisaoSinal = "\u00F7";
if (btnDivisao) {
    btnDivisao.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const ultimoChar = display.value.slice(-1);
        const sinais = ['+', '-', 'x', divisaoSinal];

        if (display.value != "" && !sinais.includes(ultimoChar)) {
            display.value += divisaoSinal;
        }
    });
}

// Porcentagem //
const btnPorcento = document.querySelector('.porcento');
if(btnPorcento) {
    btnPorcento.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const ultimoChar = display.value.slice(-1);
        const sinais = ['+', '-', 'x', '/', '%']

        if(display.value != "" && !sinais.includes(ultimoChar)) {
            display.value += "%";
        }
    });
}

// Virgula //
const btnVirgula = document.querySelector('.virgula');
btnVirgula.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const conteudo = display.value;
    const ultimoChar = conteudo.slice(-1);
    
    const partes = conteudo.split(/[+\-X\u00F7*\/]/);
    const ultimoNumero = partes[partes.length - 1];

    if (!ultimoNumero.includes(',') && !isNaN(ultimoChar)) {
        display.value += ",";
    }
});

window.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
        e.preventDefault(); 
        btnIgual.click();
    }
    
    if (e.key === 'Backspace') {
        btnApagar.click();
    }
    
    if (e.key === 'Escape') {
        btnLimpar.click();
    }
    
    const teclasPermitidas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', ',', '(', ')', '%'];

    if (teclasPermitidas.includes(e.key)) {
        
        if (e.key === '*' || e.key === 'x') {
            btnMultiplicacao.click();
        } 
        
        else if (e.key === '/') {
            btnDivisao.click();
        }
        
        else if (e.key === ',' || e.key === '.') {
            const btnVirgula = document.querySelector('.virgula');
            btnVirgula.click();
        }

        else {
            display.value += e.key;
        }
    }
});



