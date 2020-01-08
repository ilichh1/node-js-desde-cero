function contarAUnNumero(numero) {
  let n = 0;
  while(n < numero) {
    n++;
  }
  console.log('Acabé de contar');
}

function contarConPromesa(numero) {
  return new Promise(function (resolve) {
    // setInterval
    setTimeout(() => {
      resolve('parametro');
    }, numero * 1000);
  });
}
 console.log(new Date().toLocaleTimeString());

// contarAUnNumero(1000);

contarConPromesa(1)
  .then((param) => { // 'parametro'
    console.log('1 segundo');
    return contarConPromesa(2);
  })
  .then(() => {
    console.log('2 segundos');
    return contarConPromesa(3);
  })
  .then(() => {
    console.log('3 segundos');
    return contarConPromesa(4);
  })
  .then(() => console.log('4 segundos'));

