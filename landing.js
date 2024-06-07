var users = JSON.parse(localStorage.getItem('User'));

if (users && users.length > 0) {
    users.forEach(function(user) {
        console.log(user.username);
        var div = document.createElement('div');
        var h3 = document.createElement('h3');
        var h4 = document.createElement('h4')

        const listUser = document.getElementById('listUsers');
        const List = listUser.appendChild(div);
        List.setAttribute('class', 'List');
        const newList = List.appendChild(h3);
        const newList2 = List.appendChild(h4);
        newList.innerHTML = `${user.username}`
        newList2.innerHTML = `${user.birthday.split('-').reverse().join('-')}`;
    });
} else {
    console.log('Não há dados de usuário válidos no localStorage.');
}