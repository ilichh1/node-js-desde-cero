function createActor({ name, age, phone }) {
  if (!name) {
    throw 'No puedes crear un actor sin un nombre';
  }
  return {
    name: name,
    age: age || null,
    phone: phone || null,
  };
}

function composeGreeter(person) {
  person.greet = function(textToSay) {
    return new Promise(resolve => {
      console.log(`${this.name} esta pensando...`);
      setTimeout(() => {
        console.log(`${this.name} dice: ${textToSay}`);
        resolve(Date.now());
      }, 5000);
    });
  };
  return person;
}

function composeReplier(person) {
  person.askFor = function(keyName) {
    return new Promise((resolve, reject) => {
      console.log(`${this.name}: Dejame ver...`);
      setTimeout(() => {
        if (!this[keyName]) {
          reject(`${this.name}: "${keyName}" no existe dentro de mí D:"`);
          return;
        }
        resolve(`${this.name}: Mi clave "${keyName}" actualmente vale ${this[keyName]}`);
      }, 2000);
    });
  };
  return person;
};

console.log('Inicio de la ejecucion del programa a las: ' + new Date().toLocaleTimeString());
let willy = createActor({ name: 'William' });
willy = composeGreeter(willy);

willy.greet('Buenas vecino!')
  .then(timestamp => {
    const localeTimeString = new Date(timestamp).toLocaleTimeString();
    console.log(`Willy terminó su dialogo a las ${localeTimeString}`);
  });

let jhon = createActor({ name: 'Jhone', age: 12 });
jhon = composeReplier(jhon);
jhon['phone'] = '33 33 33 33';
jhon.birthDate = '1989-12-05';

jhon.askFor('birthDate')
  .then(jhonReply => console.log(jhonReply))
  .catch(jhonBadReply => console.log(jhonBadReply));