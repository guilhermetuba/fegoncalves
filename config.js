// config.js
const URL_API = "https://script.google.com/macros/s/AKfycbyFQTDC6M7dvWxp-YXi8YbLMkaoha_-sRUfBHLsH12dajjvsTlf8sDfZmc5WdwxDhXl/exec";
console.log("Config.js carregado! URL_API:", URL_API);
  <script>
    const apiKey = 'AIzaSyDmAzDeFQv1DeMwSMKJuTz0c224kI74Mo8';  // Substitua com sua chave de API
    const spreadsheetId = '1-r5uYv0yTB3__2rrHNLiosd2mFHHCdJAjwMdvxUKXRQ';  // Substitua com o ID da sua planilha
    const range = 'Clientes!A2:F';  // Altere se a aba "Clientes" tiver outro nome ou se quiser inserir em outro intervalo

      function loadClient() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyDmAzDeFQv1DeMwSMKJuTz0c224kI74Mo8',  // Coloque sua API Key aqui (do passo 1)
      clientId: '725223031596-4eq0aunstjfpdtmti9il6v7paou8fs7t.apps.googleusercontent.com',  // Coloque seu ID do Cliente OAuth aqui
      scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
      console.log('Cliente OAuth inicializado');
    }, function(error) {
      console.log('Erro ao inicializar cliente OAuth:', error);
    });
  }

    function signIn() {
    gapi.auth2.getAuthInstance().signIn().then(function() {
      console.log('Usuário autenticado');
      document.getElementById('loginButton').style.display = 'none'; // Oculta o botão após login

      // Solicitar permissão para acessar a planilha
      gapi.client.request({
        path: 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId
      }).then(function(response) {
        console.log("Permissões concedidas:", response);
        });
    });
  }

   
  function checkAuthStatus() {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (isSignedIn) {
      console.log('Usuário já autenticado');
      // Aqui você pode agora fazer operações com a planilha
    } else {
      console.log('Usuário não autenticado');
    }
  }


    
    // Função para aplicar a máscara no CPF
    function aplicarMascaraCPF() {
      let cpf = document.getElementById("cpf");
      cpf.value = cpf.value.replace(/\D/g, '').slice(0, 11);
      cpf.value = cpf.value.replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    // Função para aplicar a máscara no telefone
    function aplicarMascaraTelefone() {
      let telefone = document.getElementById("telefone");
      telefone.value = telefone.value.replace(/\D/g, '').slice(0, 11);
      telefone.value = telefone.value.length <= 10
        ? telefone.value.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2')
        : telefone.value.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }

    // Função para validar o CPF
    function validarCPF(cpf) {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11) return false;

      let soma = 0;
      let resto;
      for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
      }
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.charAt(9))) return false;

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
      }
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.charAt(10))) return false;

      return true;
    }

    // Função para adicionar um novo cliente
      function adicionarCliente(cliente) {
     const values = [
      [
        cliente.nome,
        cliente.cpf,
        cliente.telefone,
        cliente.email,
        cliente.endereco,
        cliente.observacoes,
      ]
    ];

    const request = gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: "RAW",
      values: values
    });

    request.then(function(response) {
      console.log("Cliente adicionado:", response);
    }, function(error) {
      console.error("Erro ao adicionar cliente:", error);
    });
  }

    // Função para validar o formulário antes de enviar
 function validarFormulario(event) {
    event.preventDefault();
    let form = document.getElementById("clienteForm");
    let formData = new FormData(form);

    // Obter os dados do formulário
    const cliente = {
      nome: formData.get('nome'),
      cpf: formData.get('cpf'),
      telefone: formData.get('telefone'),
      email: formData.get('email'),
      endereco: formData.get('endereco'),
      observacoes: formData.get('observacoes')
    };

    // Adicionar o cliente à planilha
    adicionarCliente(cliente);

    // Limpar o formulário após o envio
    form.reset();
  }
    
  </script>
