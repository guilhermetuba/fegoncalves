// Função que valida e envia o formulário
function validarFormulario(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Captura os dados do formulário
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const endereco = document.getElementById('endereco').value;
  const observacoes = document.getElementById('observacoes').value;

  // Envia os dados via POST para a API
  fetch('meu-backend-xi.vercel.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      cpf,
      telefone,
      email,
      endereco,
      observacoes
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    document.getElementById('result').innerHTML = 'Cliente cadastrado com sucesso!';
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('result').innerHTML = 'Erro ao cadastrar cliente.';
  });
}
