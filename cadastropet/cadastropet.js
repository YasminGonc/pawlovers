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
const form = document.querySelector('.formulario__opcoes');

btnNext.addEventListener('click', (evento) => {
    
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked != true) {
            console.log('false');
            evento.preventDefault();
        }
        else {
            console.log('true');
        }

    }
    
})


