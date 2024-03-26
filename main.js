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

function mainMenu() {

    //menu de opciones
    opcStart.addEventListener("click", mainGame);
    opcScore.addEventListener("click", scoreList);
    opcLog.addEventListener("click", logIn);
    submit.addEventListener("click", sumbitUser);


    function scoreList() {
  
            // Limpiamos la lista de jugadores antes de mostrarla
            playerList.innerHTML = '';
    
            // Iteramos sobre la lista de jugadores y creamos elementos <li> para cada uno
            juego.jugadores.forEach(function (player) {
                const li = document.createElement('li');
                li.textContent = `Nombre: ${player.nombre} | Máximo puntaje: ${player.maxScore}`;
                playerList.appendChild(li);
            });
            
            if (juego.jugadores.length > 0) {
                // Mostramos la lista de jugadores
                container.style.display = "none";
                scoreListDiv.style.display = 'flex';
        
                // Ocultamos la imagen y el párrafo
                document.querySelector('.isEmpty').style.display = 'none';
            } else {
                // Mostramos la imagen y el párrafo
                document.querySelector('.isEmpty').style.display = 'block';
        
                // Ocultamos la lista de jugadores
                container.style.display = "none";
                scoreListDiv.style.display = 'flex';
            }
    }
    
    
    function logIn() {
        usuario.style.display = "flex"
        container.style.display = "none"
    }
    
    
    
}

function sumbitUser() {
    submit.value="registrado!"
    const nombreUsuario = inputUsuario.value;
    juego.agregarJugador(nombreUsuario);
}
function backToMain() {
    document.querySelector('.container').style.display = 'flex';

    document.querySelector('.usuario').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.querySelector('.endgame').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    document.querySelector('.singIn').style.display = 'none';
};

//funcion para recargar la pagina
function reiniciarPagina() {
    window.location.reload();
}

mainMenu()