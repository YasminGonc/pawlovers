const dados = JSON.parse(localStorage.getItem('dados'));
const nomeUsuario = document.querySelector('#nome-usuario');

function mostrarNome() {
    const ultimoDadoCadastrado = (dados.length) - 1;
    nomeUsuario.innerText = dados[ultimoDadoCadastrado].nome;
}

mostrarNome();

const radios = document.querySelectorAll('.radios');
const div = document.querySelectorAll('.formulario__opcoes-card');
const btnNext = document.querySelector('#next');
const form = document.querySelector('.form');

form.addEventListener('click', () => {
    for(let i = 0; i < radios.length; i++) {
        div[i].style.backgroundColor = 'transparent';

        if(radios[i].checked == true) {
            div[i].style.backgroundColor = '#F1CFCD';
        }
    }
});

btnNext.addEventListener('click', (evento) => {
    
    for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked == true){
            break;
        }
        else {
            evento.preventDefault();
        }
    }
});

