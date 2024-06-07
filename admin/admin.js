function login(event){
    event.preventDefault()
        const userInput = document.getElementById('userInput').value
        const passInput = document.getElementById('passInput').value
        const admin = "Endy"
        const pass = "EndyAlves24"
        if(userInput === admin && passInput === pass){
            function generateSessionToken(length) {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var token = '';
                for (var i = 0; i < length; i++) {
                    token += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return token;
            }
            
            // Exemplo de uso: gerar um token de sessão com 20 caracteres
            var sessionToken = generateSessionToken(20);
            console.log(sessionToken);
            localStorage.setItem('sessionToken', sessionToken);
            
            window.location.href = 'home.html'
        } else{
            alert("Erro ao logar")
        }
}
