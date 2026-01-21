const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema
const temasalvo = localStorage.getItem('tema');
temaEscuro(temasalvo === 'escuro');

//Função para alterar entre tema claro e escuro
function temaEscuro(tipo) {
    if (tipo == true) {
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

 //Função para o uso dos botões no display
const display = document.querySelector('#display');
const botoes = document.querySelectorAll('#edit');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        display.value += botao.innerText;
    });
});