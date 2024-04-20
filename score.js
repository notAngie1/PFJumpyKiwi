class Jugador {
    constructor(nombre) {
        this.nombre = nombre
        this.maxScore = 0
        this.currentScore = 0
    }
}


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
            Swal.fire({
                title: "NOMBRE DE USUARIO INVALIDO",
                text: "Reingrese su nombre por favor.",
                imageUrl: "https://media.tenor.com/3pX4U3Jk24MAAAAi/popato-cute.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "imagen de error",
                confirmButtonColor: "#45a049"
              });
        }
    }

    guardarJugadores() {
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
    }

    async obtenerUsuariosRandom() {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        const usuarios = data.results.map(user => user.name.first);
        return usuarios;
    }
}

    