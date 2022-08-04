const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');

const btnFormulario = document.querySelector('.card__formulário-botao');
const form = document.querySelector('.card__formulário-form');
const inputs = document.querySelectorAll('.formulário__input');
const textoErro = document.querySelectorAll('.formulario__textoerro');

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
            rua.setAttribute('disabled', 'disabled');

            bairro.value = consultaCepConvertida.bairro;
            bairro.setAttribute('disabled', 'disabled');

            cidade.value = consultaCepConvertida.localidade;
            cidade.setAttribute('disabled', 'disabled');

            estado.value = consultaCepConvertida.uf;
            estado.setAttribute('disabled', 'disabled');

            console.log(consultaCepConvertida);
        }

    } catch (erro) {}
}

cep.addEventListener('focusout', () => {
    buscaEndereco();
});


btnFormulario.addEventListener('click', (evento) => {
    evento.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length < 1) {
            textoErro[i].style.visibility = 'visible';
            inputs[i].style.border = '1px solid red';

            if (estado.value == 'null') {
                estado.nextElementSibling.style.visibility = 'visible';
                estado.style.border = '1px solid red';
            }
        }
        else if(inputs[i].name == 'telefone') { //validar telefone, montei a função mas a função não está fazendo o que eu quero. Assim dá certo
            if(inputs[i].value.length < 10) {
                inputs[i].nextElementSibling.innerText = 'Digite um número de celular válido';
                inputs[i].nextElementSibling.style.visibility = 'visible';
                inputs[i].style.border = '1px solid red';
            }
        }
        

        form.setAttribute('action', 'cadastropet/cadastropet.html'); //para ir para a próxima página, mas isso só vai acontecer se todos os inputs estiverem válidos 
    }

});

/*function validarTelefone(telefone) {
    if(telefone.value.length < 10) {
        telefone.nextElementSibling.innerText = 'Digite um número de celular válido';
        telefone.extElementSibling.style.visibility = 'visible';
        telefone.style.border = '1px solid red';
    }
}*/


