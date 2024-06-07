// Função para fazer logout
function logout() {
    // Limpar o token de sessão
    localStorage.removeItem('sessionToken');
    // Redirecionar para a página de login
    window.location.href = '/admin.html';
}

// Verificar se o usuário está autorizado a acessar a página restrita
function isAuthorized() {
    // Verificar se há um token de sessão válido no localStorage
    return localStorage.getItem('sessionToken') !== null;
}

// Verificar se o usuário está autorizado quando a página é carregada
window.addEventListener('DOMContentLoaded', (event) => {
    if (!isAuthorized()) {
        // Se o usuário não estiver autorizado, redirecionar para a página de login
        window.location.href = '/admin.html';
    } else {
        // Se o usuário estiver autorizado, exibir a lista de usuários e botões de exclusão
        var users = JSON.parse(localStorage.getItem('User'));

        if (users && users.length > 0) {
            users.forEach(function(user) {
                console.log(user.username);
                var div = document.createElement('div');
                var h3 = document.createElement('h3');
                var button = document.createElement('button');

                button.innerHTML = 'DELETE';
                button.setAttribute('data-username', user.username); // Adiciona um atributo para armazenar o nome do usuário

                const listUser = document.getElementById('listUsers');
                const List = listUser.appendChild(div);
                List.setAttribute('class', 'List');
                const newList = List.appendChild(h3);
                const newList2 = List.appendChild(button);
                newList.innerHTML = `${user.username}`;

                // Adiciona um evento de clique ao botão de exclusão
                button.addEventListener('click', function(event) {
                    // Pergunta ao usuário se deseja excluir o usuário
                    var confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');

                    // Se o usuário confirmar a exclusão
                    if (confirmDelete) {
                        // Obtém o nome do usuário a ser excluído a partir do atributo do botão
                        var usernameToDelete = event.target.getAttribute('data-username');

                        // Remove o usuário correspondente do localStorage
                        users = users.filter(function(user) {
                            return user.username !== usernameToDelete;
                        });

                        // Atualiza o localStorage global
                        localStorage.setItem('User', JSON.stringify(users));

                        // Remove o elemento da lista de usuários na interface do usuário
                        List.remove();
                    }
                });
            });
        } else {
            console.log('Não há dados de usuário válidos no localStorage.');
        }
    }
});








