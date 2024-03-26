
class Juego {
    constructor() {
        this.jugadores = []
        this.jugadorActual = null
    }


    agregarJugador(nombre) {
        if (nombre) {
            const nuevoJugador = new Jugador(nombre);
            this.jugadores.push(nuevoJugador);
            this.guardarJugadores();
        } else {
            alert("El nombre de usuario es inválido.");
        }
    }

    guardarJugadores() {
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
    }
}

function mainGame() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    document.getElementById('returnButton4').addEventListener('click', backToMain)
    const endofGame = document.querySelector('.endgame')
    const singIn = document.querySelector(".singIn")
    const msg = document.querySelector(".msg")
    const msg2 = document.querySelector(".msg2")
    const usuario = document.querySelector('.usuario')
    const submit2 = document.getElementById("submit2")
    const sectionGame = document.getElementById('game')

    singIn.style.display = "flex";

    submit2.addEventListener("click", function (event) {
        event.preventDefault();

        const inputSingin = document.querySelector("#opcsingIn");
        const nombreUsuario = inputSingin.value;
        const jugador = juego.jugadores.find(jugador => jugador.nombre === nombreUsuario);
        const formSingin = document.querySelector(".formSingin")

        msg.innerHTML = '';
        msg2.innerHTML = '';

        if (jugador) {
            formSingin.style.display = "none"
            juego.jugadorActual = jugador;
            let parrafo = document.createElement("p");
            parrafo.textContent = "Inicio de sesión exitoso!";
            parrafo.className = "pLog"
            msg.appendChild(parrafo);

            let boton = document.createElement("button");
            msg.appendChild(boton);
            boton.innerText = "Continuar";
            boton.className = "button";

            boton.addEventListener("click", function () {
                singIn.style.display = "none";
                sectionGame.style.display = 'flex';
            });
        } else {
            let imgLogin = document.createElement("img");
            imgLogin.src = "./img/abajo.gif"
            imgLogin.className = "gifAbajo"
            let parrafo = document.createElement("p");
            parrafo.textContent = "Usuario no encontrado, POR FAVOR REGISTRESE";
            parrafo.className = "pLog"
            msg2.appendChild(parrafo);
            msg2.appendChild(imgLogin);
            usuario.style.display = "flex";
            singIn.style.display = "none";
        }
    });



    sectionGame.addEventListener("click", playGame)

    function playGame() {
        sectionGame.style.display = "none"
        endofGame.style.display = "flex"
        endGame()
    }

}



function endGame() {
    const opcReload = document.querySelector("#reload");
    const finalScore = document.getElementById("finalScore");

    finalScore.innerHTML = '';

    const jugadorActual = juego.jugadorActual;

    const user = document.createElement('p');
    user.textContent = `Nombre: ${jugadorActual.nombre}
                        Máximo puntaje: ${jugadorActual.maxScore}
                        Puntaje actual: ${jugadorActual.currentScore}`;
    finalScore.appendChild(user);

    opcReload.addEventListener("click", reiniciarPagina);
}


//funcion para recargar la pagina
function reiniciarPagina() {
    window.location.reload();
}