class Jugador {
    constructor(nombre) {
        this.nombre = nombre
        this.maxScore = 0
        this.currentScore = 0
    }
}


class Juego {
    constructor() {
        this.jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
        this.jugadorActual = null
    }


    agregarJugador = nombre => {
        if (nombre) {

            if (this.jugadores.find(jugador => jugador.nombre === nombre)) {
                Swal.fire({
                    title: "NOMBRE DE USUARIO DUPLICADO",
                    text: "El nombre de usuario ya existe. Por favor, elija otro.",
                    imageUrl: "https://media.tenor.com/3pX4U3Jk24MAAAAi/popato-cute.gif",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "imagen de error",
                    confirmButtonColor: "#45a049"
                });
                return;
            }
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

    guardarJugadores = () => {
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
    }

    async obtenerJugadoresRandom() {
        const response = await fetch('https://randomuser.me/api/?results=3');
        const data = await response.json();
        const jugadoresRandom = data.results.map(result => {
            const nombre = `${result.name.first} ${result.name.last}`;
            const jugador = new Jugador(nombre);
            jugador.maxScore = Math.floor(Math.random() * (500 - 100 + 1));
            return jugador;
        });
    
        jugadoresRandom.forEach(jugador => {
            if (!this.jugadores.find(j => j.nombre === jugador.nombre)) {
                this.jugadores.push(jugador);
            }
        });
        this.guardarJugadores();
    }

    actualizarMaxScores = () => {
        this.jugadores.forEach(jugador => {
            if (jugador.currentScore > jugador.maxScore) {
                jugador.maxScore = jugador.currentScore;
            }
        });
        this.guardarJugadores();
    }
}
