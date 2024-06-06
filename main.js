fetch('usuarios.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(data => {
    async function sendBirthdayEmail(users) {
      console.log('Entrou na função ');
      const today = new Date();
  
      // Convertendo o objeto users em um array
      const usersArray = Object.values(users);
      for (const birthdayUser of usersArray) {
        const birthday = new Date(birthdayUser.birthday);
        console.log(birthdayUser.username)
        console.log(today, birthday);
        console.log('Birthday Month:', birthday.getMonth(), 'Today Month:', today.getMonth());
        console.log('Birthday Date:', birthday.getDate(), 'Today Date:', today.getDate());
        const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        if (birthday.getUTCMonth() === todayUTC.getUTCMonth() && birthday.getUTCDate() === todayUTC.getUTCDate()) {
          console.log(`É o aniversário de ${birthdayUser.username}!`);
          try {
            const params = {
              destinatario: "endyalves095@gmail.com",
              assunto: "Aniversário!",
              mensagem: `É o aniversário de: ${birthdayUser.username}`
            }
  
            const url = `https://pm.rancharia.sp.gov.br/prefeitura/api_email/?destinatario=${params.destinatario}&assunto=${params.assunto}&mensagem=${params.mensagem}`
  
            // Faz a chamada da API usando fetch
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });
  
            if (!response.ok) {
              throw new Error('Erro ao enviar a mensagem');
            }
  
            const responseData = await response.json();
            console.log(responseData);
            sentEmails.push(birthdayUser.username);
          } catch (error) {
            console.error(`Erro ao enviar a mensagem: ${error.message}`);
          }
        }
      }
    }
    const Users = Object.values(data.users);
  for(const username of Users){
    var div = document.createElement('div')
    var h3 = document.createElement('h3')
    var h4 = document.createElement('h4')
    const listUser = document.getElementById('listUsers')
    const List = listUser.appendChild(div)
    List.setAttribute('class', 'List')
    const newList = List.appendChild(h3)
    const newList2 = List.appendChild(h4)
    newList.innerHTML = `${username.username}`
    newList2.innerHTML = `${username.birthday}`
   }
    
   function agendarFuncao(horario, sendBirthdayEmail) {
    setInterval(function() {
      const agora = new Date();
      if (agora.getHours() === horario.horas && agora.getMinutes() === horario.minutos && agora.getSeconds() === 0) {
        sendBirthdayEmail(data.users);
      }
    }, 60000); // Verifica a cada minuto
  }
  
  // Exemplo de uso:
  var horarioDesejado = { horas: 14, minutos: 33 };
  agendarFuncao(horarioDesejado, sendBirthdayEmail(data.users));
  
      
  
  })
  
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
