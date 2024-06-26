const opcScore = document.querySelector("#score");
const opcStart = document.querySelector("#start");
const opcLog = document.querySelector("#login");
const container = document.querySelector(".container");
const scoreListDiv = document.getElementById('scoreList');
const playerList = document.getElementById('playerList');
const ul = document.getElementsByTagName("ul");
const inputUsuario = document.querySelector("#userName");
const usuario = document.querySelector(".usuario")
const submit = document.getElementById("submit")
const backMain = document.getElementById('returnButton').addEventListener('click', backToMain)
const backMain2 = document.getElementById('returnButton2').addEventListener('click', backToMain)
const backMain3 = document.getElementById('returnButton3').addEventListener('click', backToMain)
let juego = new Juego()

usuario.style.display = "none"
container.style.display = "flex"


async function mainMenu() {
    //menu de opciones
    opcStart.addEventListener("click", mainGame);
    opcScore.addEventListener("click", scoreList);
    opcLog.addEventListener("click", logIn);
    submit.addEventListener("click", sumbitUser);

    await juego.obtenerJugadoresRandom();

    function scoreList() {
        endofGame.style.display = "none"
        playerList.innerHTML = '';

        juego.actualizarMaxScores();

        juego.jugadores.forEach(nombre => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${nombre.nombre} | Máximo puntaje: ${nombre.maxScore}`;
            playerList.appendChild(li);
        });


        if (juego.jugadores.length > 0) {
            container.style.display = "none";
            scoreListDiv.style.display = 'flex';
            document.querySelector('.isEmpty').style.display = 'none';
        } else {
            document.querySelector('.isEmpty').style.display = 'block';
            container.style.display = "none";
            scoreListDiv.style.display = 'flex';
        }
    }
}

function logIn() {
    usuario.style.display = "flex"
    container.style.display = "none"
    endofGame.style.display = "none"
}

const formLog = document.querySelector(".formLog")
function sumbitUser() {
    let pLog = document.querySelector(".pLog")
    pLog.textContent = "registrado!";
    formLog.style.display = "none"
    const nombreUsuario = inputUsuario.value;
    juego.agregarJugador(nombreUsuario);

    inputUsuario.value = '';
    usuario.style.display = "flex";
}

function backToMain(event) {
    event.preventDefault();
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.usuario').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.querySelector('.endgame').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    document.querySelector('.singIn').style.display = 'none';
    document.getElementById("playMain").style.display = "none";
    formLog.style.display = 'flex';
};



mainMenu()      