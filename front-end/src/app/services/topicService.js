const database  =   require('../../../database.json');

function getAll(){
    return database.users;
};

console.log(getAll());
