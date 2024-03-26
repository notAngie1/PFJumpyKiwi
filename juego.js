
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
    document.querySelector('.endgame').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    const singIn = document.querySelector(".singIn")
    const msg = document.querySelector(".msg")
    const msg2 = document.querySelector(".msg2")
    const usuario = document.querySelector('.usuario')
    const submit2 = document.getElementById("submit2")
    document.getElementById('returnButton4').addEventListener('click', backToMain)

    singIn.style.display = "flex";

    submit2.addEventListener("click", function (event) {
        event.preventDefault(); 

        const inputSingin = document.querySelector("#opcsingIn");
        const nombreUsuario = inputSingin.value;
        const jugador = juego.jugadores.find(jugador => jugador.nombre === nombreUsuario);

       msg.innerHTML = '';
       msg2.innerHTML = '';

        if (jugador) {
            juego.jugadorActual = jugador;
            let parrafo = document.createElement("p");
            parrafo.textContent = "Inicio de sesión exitoso!";
            msg.appendChild(parrafo);

            let boton = document.createElement("button");
            msg.appendChild(boton);
            boton.innerText = "Continuar";

            boton.addEventListener("click", function () {
                singIn.style.display = "none";
                document.getElementById('game').style.display = 'flex';
            });
        } else {
            let parrafo = document.createElement("p");
            parrafo.textContent = "Usuario no encontrado, POR FAVOR REGISTRESE";
            msg2.appendChild(parrafo);
            usuario.style.display = "flex";
            singIn.style.display = "none";
        }
    });
}



function endGame() {
    const opcReload = document.querySelector("#reload");
    const finalScore = document.getElementById("finalScore");

    juego.jugadores.forEach(function (player) {
        const user = document.createElement('p');
        user.textContent = `Nombre: ${player.nombre}  
                            Máximo puntaje: ${player.maxScore} 
                            Puntaje actual: ${player.currentScore}`;
        finalScore.appendChild(user);
    });


    opcReload.addEventListener("click", reiniciarPagina)
}

