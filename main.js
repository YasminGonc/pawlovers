const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');

const btnFormulario = document.querySelector('.card__formulário-botao');
const form = document.querySelector('.card__formulário-form');
const inputs = document.querySelectorAll('.formulário__input');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');

const dados = JSON.parse(localStorage.getItem('dados')) || [];//acessar o local storage, caso esteja vazio criar um array vazio;

function bloquearInput(parametro) {
    parametro.setAttribute('disabled', 'disabled');
}

async function buscaEndereco() {
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        let consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            cep.nextElementSibling.innerText = 'CEP não existe';
            cep.nextElementSibling.style.visibility = 'visible';
            cep.style.border = '1px solid red';
        } 
        else {
            rua.value = consultaCepConvertida.logradouro;
            bloquearInput(rua);

            bairro.value = consultaCepConvertida.bairro;
            bloquearInput(bairro);

            cidade.value = consultaCepConvertida.localidade;
            bloquearInput(cidade);

            estado.value = consultaCepConvertida.uf;
            bloquearInput(estado);
        }

    } catch (erro) {}
}

function validaCep(cep) {
    if(cep.value.length < 8) {
        return true;
    }
}

function mostrarTextoErroEMudarBorda(input) {
    input.nextElementSibling.style.visibility = 'visible';
    input.style.border = '1px solid red';
}

function resetInputs(input) { 
    input.nextElementSibling.style.visibility = 'hidden';
    input.style.border = '1px solid transparent';
}

cep.addEventListener('focusout', () => {
    resetInputs(cep);

    if(validaCep(cep) == true) {
        cep.nextElementSibling.innerText = 'Quantidade de dígitos do CEP insuficiente. Digite um CEP válido';
        mostrarTextoErroEMudarBorda(cep);
    }
    else {
       buscaEndereco(); 
    }
});

function validarTelefone(telefone) {
    if(telefone.value.length < 10) {
        return true;
    }
}

function validarSenha(senha) {
    const regexSenha = /^(?=.*\d).{4,8}$/;
    return (regexSenha.test(senha.value));
}

function validarEmail(email) {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return (regexEmail.test(email.value));
}

btnFormulario.addEventListener('click', (evento) => {
    evento.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        resetInputs(inputs[i]);

        if (inputs[i].value.length < 1) {
            evento.preventDefault();
            mostrarTextoErroEMudarBorda(inputs[i]);

            if (estado.value == 'null') {
                evento.preventDefault();
                mostrarTextoErroEMudarBorda(estado);
            }
        }
        else if(inputs[i].name == 'telefone') { 
            if(validarTelefone(inputs[i]) == true) {
                evento.preventDefault();
                inputs[i].nextElementSibling.innerText = 'Digite um número de celular válido';
                mostrarTextoErroEMudarBorda(inputs[i]);
            }
        }
        else if(inputs[i].name == 'email') {
            if(validarEmail(inputs[i]) == false) {
                evento.preventDefault();
                inputs[i].nextElementSibling.innerText = 'Digite um email válido';
                mostrarTextoErroEMudarBorda(inputs[i]);
            }
        }
        else if(inputs[i].name == 'senha') {
            if(validarSenha(inputs[i]) == false) {
                evento.preventDefault();
                inputs[i].nextElementSibling.innerText = 'Digite uma senha com letras e números, de 4 a 8 dígitos';
                mostrarTextoErroEMudarBorda(inputs[i]);
            }
        }
  
    }
    evento.preventDefault();
    adicionarDados(nome.value, email.value, senha.value);
    localStorage.setItem('dados', JSON.stringify(dados));
});

console.log(dados);

function adicionarDados(nome, email, senha) {
    const novoDado = {
        'nome': nome,
        'email': email,
        'senha': senha
    }

    dados.push(novoDado);

    console.log(dados);
}
//fazer o formulário receber outras respostas depois do erro. FEITO -> ver se ficou bom
//colocar máscara no telefone




