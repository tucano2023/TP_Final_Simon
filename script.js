//Referencias para querySelector
var countValue = document.getElementById("conteo");
var colorPart = document.querySelectorAll(".porcion-color");
var contenedor = document.querySelector(".contenedor");
var startButton = document.querySelector("#start");
var result = document.querySelector("#result");
var tablero = document.querySelector(".tablero");

//Mapeo de colores para los efectos de Gama
var colors = {
  verde: {
    actual: "#068e06",
    nuevo: "#11e711",
  },
  rojo: {
    actual: "#950303",
    nuevo: "#fd2a2a",
  },
  azul: {
    actual: "#01018a",
    nuevo: "#2062fc",
  },
  amarillo: {
    actual: "#919102",
    nuevo: "#fafa18",
  },
};

var randomColors = [];
var pathGeneratorBool = false;
var conteo, clickCount = 0;

//Evento COMENZAR
startButton.addEventListener("click", () => {
  conteo = 0;
  clickCount = 0;
  randomColors = [];
  pathGeneratorBool = false;
  tablero.classList.remove("ocultar");
  contenedor.classList.add("ocultar");
  pathGenerate();
});

//Function DEFINIR SECUENCIA
pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  conteo = randomColors.length;
  pathGeneratorBool = true;
  pathDecide(conteo);
};

//Function OBTENER VALOR ALEATORIO
generateRandomValue = (obj) => {
  var arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

//Function EJECUTAR LA SECUENCIA
pathDecide = async (conteo) => {
  countValue.innerText = conteo;
  for (var i of randomColors) {
    var currentColor = document.querySelector(`.${i}`);
    await delay(500);
    currentColor.style.backgroundColor = `${colors[i]["nuevo"]}`;
    await delay(300);
    currentColor.style.backgroundColor = `${colors[i]["actual"]}`;
    await delay(300);
  }
  pathGeneratorBool = false;
};

//Espera entre efectos
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

//Evento click sobre el color
colorPart.forEach((element) => {
  element.addEventListener("click", async (e) => {
    //Si la secuencia es correcta, avanzamos al próximo nivel
    if (pathGeneratorBool) {
      return false;
    }
    if (e.target.classList[0] == randomColors[clickCount]) {
      //Efecto del click
      e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["nuevo"]
      }`;
      await delay(300); // Tiempo que debe esperar el usuario entre clicks

      e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["actual"]
      }`;

      //Contador de Clicks
      clickCount += 1;

      //Avanzar al próximo nivel si los clicks son iguales a "conteo"
      if (clickCount == conteo) {
        clickCount = 0;
        pathGenerate();
      }
    } else {
      lose();
    }
  });
});

//Función para activar cuando la secuencia no es correcta
const lose = () => {
  result.innerHTML = `<span> GAME OVER!! Su puntaje:  </span> ${conteo}`;
  result.classList.remove("ocultar");
  contenedor.classList.remove("ocultar");
  tablero.classList.add("ocultar");
  startButton.innerText = "Jugar nuevamente";
  startButton.classList.remove("ocultar");
};

