const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const form = document.querySelector('.card__formulário-form');

form.addEventListener('click', () => {
    form.setAttribute('action', 'cadastropet/cadastropet.html'); //para ir para a próxima página, mas isso só vai acontecer se todos os inputs estiverem válidos 
});

cep.addEventListener('focusout', () => {
    buscaEndereco();
});

async function buscaEndereco() {
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        let consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro) {
            throw Error ('CEP não existe');
        }
        rua.value = consultaCepConvertida.logradouro;
        rua.setAttribute('disabled', 'disabled');

        bairro.value = consultaCepConvertida.bairro;
        bairro.setAttribute('disabled', 'disabled');

        cidade.value = consultaCepConvertida.localidade;
        cidade.setAttribute('disabled', 'disabled');
        console.log(consultaCepConvertida);
        
    } catch(erro) {
        console.log(erro);
    }
    
}