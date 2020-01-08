const crearPersonaPlaticadora = nombre => {
  const personaCreada = {
    nombre
  };
  personaCreada.hablar = function(dialogo) {
    return new Promise(resolve => setTimeout(() => {
      console.log(this.nombre + ':' + dialogo);
      resolve(new Date().toLocaleTimeString());
    }, 1000));
  };
  return personaCreada;
};


const manuel = crearPersonaPlaticadora('Manuel');
const alberto = crearPersonaPlaticadora('Alberto');

manuel.hablar('Hola como estas')
  .then(horaFin => {
    console.log('Manuel acabo de hablar a '+horaFin);
    return alberto.hablar('Bien, gracias');
  })
  .then(horaFin => {
    console.log('Alberto acabo de hablar '+horaFin);
  });