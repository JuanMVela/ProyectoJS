//ELEMENTOS DEL DOM
const saludo = document.getElementById("saludo"); /* HTML */
const nombre = document.getElementById("nombre"); /* HTML */
const apellido = document.getElementById("apellido"); /* HTML */
const contFormulario = document.querySelector("#contFormulario"); /* HTML */
const contenedor = document.getElementById("contenedor"); /* HTML */
const formulario = document.getElementById("formulario"); /* HTML */


//VARIABLES JS
let gameCardCurrentInstance = 0; /*  SI CAMBIAMOS EL VALOR A 1 PASA A SIGUEITNE IMAGEN Y PALABRA */
// let answersCharactersEntered = 0; /*  Let */


const datosGame = [
  { imagen: "./assets/verano.jpg", palabra: "VERANO" },
  { imagen: "./assets/aceite.jpg", palabra: "ACEITE" },
];

//FUNCIONES
const mezclar = (palabra) => { /* recibe parametro palabra de array datosGame*/
  let a = palabra.split("");
  let n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

const generadorRandomDeCaracteres = (caracteresNecesarios) => {
  let randomcharacters = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (i = 1; i <= caracteresNecesarios; i++) {
    randomcharacters += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomcharacters;  
};


//CONTROLAMOS SI EXISTE UN USUARIO INGRESADO EN LOCALSTORAGE
const storedUser = JSON.parse(localStorage.getItem("user"));

//MEDIANTE UN OPERADOR TERNARIO, SI EL RESULTADO DE storedUser es VERDADERO, MOSTRAMOS EL MENSAJE DE BIENVENIDA.
storedUser
  ? (formulario.innerHTML = `<h3>Bienvenido ${storedUser.nombre} ${storedUser.apellido} 🚀</h3>`)
  : //SI ES QUE NO EXISTE UN USUARIO EN LOCALSTORAGE, MOSTRAMOS EL FORMULARIO DE INGRESO
    (formulario.onsubmit = (e) => {
      e.preventDefault();
    //  ALERTA BIENVENIDA
      Swal.fire({
        title: 'Bienvenid@',
        text: `${nombre.value} ${apellido.value}, que comience el juego!!`,
        icon: 'success',
        confirmButtonText: 'Gracias!'
      })
      // OBJETO USUARIO
      const user = {
        nombre: nombre.value,
        apellido: apellido.value,
      };
      localStorage.setItem("user", JSON.stringify(user));
      formulario.innerHTML = `<h3>Bienvenido ${nombre.value} ${apellido.value}</h3>`;
    });

//CONSTRUCCION DE CARD QUE VA A CONTENER LA FASE ACTUAL DEL JUEGO. SI EL JUGADOR SOLUCIONA LA FASE, SE MOSTRARA LA SIGUIENTE
const gameFase = document.createElement("div"); /* Dom div*/
gameFase.classList.add("fase"); /* Dom div class=fase*/

const imgContainer = document.createElement("div"); /* Dom div*/
imgContainer.classList.add("img_game"); /* Dom div class=img game*/
const imgFase = document.createElement("img"); /* Dom img*/
imgFase.classList.add("imagen"); /* Dom img class=imagen*/
imgFase.src = `${datosGame[gameCardCurrentInstance].imagen}`;
imgContainer.appendChild(imgFase);



//CREAMOS EL CONTENEDOR QUE CONTENDRA LAS LETRAS QUE VA A SELECCIONAR EL USUARIO
// const divContSpan = document.createElement("div"); /* Dom div*/
// divContSpan.classList.add("contenedorBoxes"); /* Dom div class=charsAnswerContainer*/
// for (let i = 0; i < datosGame[gameCardCurrentInstance].palabra.length; i++) {
//   let spanBoxes = document.createElement("span"); /* Dom Span*/
//   spanBoxes.classList.add("boxes"); /* Dom span class=charAnswerBox*/
//   divContSpan.appendChild(spanBoxes);
// }


// CREAMOS EL CONTENEDOR QUE TENDRA LOS BOTONES PARA RESOLVER LA PALABRA, SERA UN BOTON POR CADA LETRA DE LA PALABRA
const divButtom = document.createElement("div"); /* Dom div*/
divButtom.classList.add("letras"); /* Dom div class=letras*/


//SE RENDERIZAN 12 BOTONES, PARA ESTO TOMA EL LARGO DE LA PALABRA QUE CORRESPONDE AL "FASE", LE AGREGA LAS LETRAS FALTANTES Y MEZCLA
let originalPalabra = datosGame[gameCardCurrentInstance].palabra;
let caracteresAgenerar = 12 - originalPalabra.length;
let palabraRandom = mezclar(
  originalPalabra.concat(generadorRandomDeCaracteres(caracteresAgenerar))
);
console.log(originalPalabra);
console.log(caracteresAgenerar);
console.log(palabraRandom);

// CREACION BOTONES CON LETRAS
for (let i = 0; i < palabraRandom.length; i++) {   /* Dom buton*/
  let buttoms = document.createElement("button"); /* Dom buton*/  
  let buttonLetter = palabraRandom.charAt(i);
  buttoms.textContent = buttonLetter;
  divButtom.appendChild(buttoms);
  console.log(buttonLetter); 
}


//CON TODO LO GENERADO ARMAMOS LA TARJETA RENDERIZAR
const gameCard = document.createElement("div");
gameCard.classList.add("game");

gameFase.appendChild(imgContainer);
// gameFase.appendChild(divContSpan);
gameFase.appendChild(divButtom);
gameCard.appendChild(gameFase);
contenedor.appendChild(gameCard);


// FOMRULARIO INGRESO DE PALABRA USUARIO
const contKey = document.getElementById("contKey"); /* DIV HTML */
const resKey = document.getElementById("resKey"); /* P HTML */
const keyForm = document.getElementById("keyForm"); /* FORM HTML */
const keyWord = document.getElementById("keyWord"); /* INPUT HTML */


keyForm.onsubmit = (e) => {
  e.preventDefault();
resKey.innerHTML = keyWord.value /* IMPRIME EL IMPUT USUARIO EN UNA ETIQUETA DEL HTML */

// COMPARA EL VALOR DEL IMPUT CON LA PALABRA
switch (keyWord.value) {
  case "verano":  
    alert("CORRECTO");
    gameCardCurrentInstance++ ; /* AQUI DEBERIA SUMAR 1 A LA VARIABLE QUE ESTA MAS ARRIBA Y CAMBIAR A LA SIGUIENTE IMAGEN CON LA SIGUIENTE PALABRA */
    break;   
  default:
    alert("INCORRECTO");
    break;
}
}

