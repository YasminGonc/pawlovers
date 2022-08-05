const dados = JSON.parse(localStorage.getItem('dados'));
const nomeUsuario = document.querySelector('#nome-usuario');

function mostrarNome() {
    const ultimoDadoCadastrado = (dados.length) - 1;
    nomeUsuario.innerText = dados[ultimoDadoCadastrado].nome;
}

mostrarNome();

const radios = document.querySelectorAll('.radios');