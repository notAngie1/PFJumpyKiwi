function mainGame() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    document.getElementById('returnButton4').addEventListener('click', backToMain)
    const singIn = document.querySelector(".singIn")
    const msg = document.querySelector(".msg")
    const msg2 = document.querySelector(".msg2")
    const usuario = document.querySelector('.usuario')
    const submit2 = document.getElementById("submit2")
    const sectionGame = document.getElementById('game')
    const sectionPlayMain = document.getElementById("playMain")

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
        sectionGame.style.display = "none";
        sectionPlayMain.style.display = "block";
        let obstaculo = document.getElementById("obstaculo");
        let espacio = document.getElementById("espacio");
        let bird = document.getElementById("kiwibird");
        let saltarBird = 0;
        let contador = 0;


        espacio.addEventListener("animationiteration", () => {
            let random = -((Math.random() * 600) + 200);
            espacio.style.top = random + "px";
            contador++;

        });

        setInterval(function () {
            let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
            if (saltarBird == 0) {
                bird.style.top = (birdTop + 3) + "px";
            }
            let obstaculoLeft = parseInt(window.getComputedStyle(obstaculo).getPropertyValue("left"));
            let espacioTop = parseInt(window.getComputedStyle(espacio).getPropertyValue("top"));
            let cTop = -(750-birdTop);
            if((birdTop>750)||((obstaculoLeft<50)&&(obstaculoLeft>-50)&&((cTop<espacioTop)||(cTop>espacioTop+150)))){
                console.log("Colisión con el obstáculo");
                endGame();
            }

            // Actualizar el puntaje máximo del jugador
            if (juego.jugadorActual) {
                juego.jugadorActual.currentScore = contador;
                if (contador > juego.jugadorActual.maxScore) {
                    juego.jugadorActual.maxScore = contador;
                }
            }
        }, 10);


    sectionPlayMain.addEventListener("click", saltar)
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            saltar();

        }
    });

    function saltar() {
        saltarBird = 1;
        let saltarcont = 0;
        let saltarIntervalo = setInterval(function () {
            let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
            if ((birdTop > 6) && (saltarcont < 15)) {
                bird.style.top = (birdTop - 3) + "px";
            }
            if (saltarcont > 50) {
                clearInterval(saltarIntervalo);
                saltarBird = 0;
                saltarcont = 0;
            }
            saltarcont++;
        }, 10);

    }

}

}


function endGame() {
    const endofGame = document.querySelector('.endgame')
    const opcReload = document.querySelector("#reload");
    const finalScore = document.getElementById("finalScore");
    const sectionPlayMain = document.getElementById("playMain");
    endofGame.style.display = "flex"
    sectionPlayMain.style.display = "none"

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

