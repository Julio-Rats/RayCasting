// Dados
let data = {
    screen: {
        width: 1028,
        height: 720,
        halfWidth: null,
        halfHeight: null
    },
    render: {
        delay: 20
    },
    rayCasting: {
        incrementAngle: null,
        precision: 500
    },
    player: {
        fov: 50,
        halfFov: null,
        x: 7,
        y: 2,
        angle: 90,
        speed: {
            movement: 0.5,
            rotation: 15.0
        }
    },
    map:[
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 0, 0, 2],
        [2, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [1, 3, 1, 0, 0, 2, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 2, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 1, 2, 0, 1],
        [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2],
        [1, 1, 3, 0, 0, 2, 0, 0, 2, 1, 3, 2, 0, 2, 0, 0, 3, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 3, 0, 1, 2, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]
    ],
    colors : [
            "#00FF00", 
            "#FF0000", 
            "#0000FF" 
    ],
    key: {
        upKey:     "KeyW",
        downKey:   "KeyS",
        rightKey:  "KeyD",
        leftKey:   "KeyA",
        upArrow:   "ArrowUp"  ,
        downArrow: "ArrowDown",
        leftArrow: "ArrowLeft",
        rightArrow:"ArrowRight",
        lookUp:    "ShiftLeft" ,
        lookDown:  "ControlLeft",
        lookCenter:"KeyC"
    }
}

// Calculando Dados
data.screen.halfWidth = data.screen.width / 2;
data.screen.halfHeight = data.screen.height / 2;
data.rayCasting.incrementAngle = data.player.fov / data.screen.width;
data.player.halfFov = data.player.fov / 2;

// Canvas
const screen  = document.createElement('canvas');
screen.width  = data.screen.width;
screen.height = data.screen.height;
screen.style.border = "1px solid black";
document.body.appendChild(screen);

// Canvas context
const screenContext = screen.getContext("2d");

/**
 * Converdento graus em radianos
 * @param {Number} degree 
 */
function degreeToRadians(degree) {
    let pi = Math.PI;
    return degree * pi / 180;
}

/**
 * Desenhando as linhas na tela
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {String} cssColor 
 */
function drawLine(x1, y1, x2, y2, cssColor) {
    screenContext.strokeStyle = cssColor;
    screenContext.beginPath();
    screenContext.moveTo(x1, y1);
    screenContext.lineTo(x2, y2);
    screenContext.stroke();
}

// Start
main();

/**
 * Main 
 */
function main() {
    setInterval(function() {
        clearScreen();
        rayCasting();
    }, data.render.delay);
}

/**
 * Raycasting Algoritmo
 */
function rayCasting() {
    let rayAngle = data.player.angle - data.player.halfFov;
    for (let rayCount = 0; rayCount < data.screen.width; rayCount++) {
        // Player dados
        let ray = {
            x: data.player.x,
            y: data.player.y
        }

        // Direção do raio sobre o grid a partir do ponto de visão.
        let rayCos = Math.cos(degreeToRadians(rayAngle)) / data.rayCasting.precision;
        let raySin = Math.sin(degreeToRadians(rayAngle)) / data.rayCasting.precision;

        // Colisão do raio com as paredes
        let wall = 0;
        while (wall == 0) {
            ray.x += rayCos;
            ray.y += raySin;
            wall = data.map[Math.floor(ray.y)][Math.floor(ray.x)];
        }

        // Distancia até a parede (teorema de pitagoras)
        let distance = Math.sqrt(Math.pow(data.player.x - ray.x, 2) + Math.pow(data.player.y - ray.y, 2));

        // correção olho de peixe (sem colisão com a parede)
        distance = distance * Math.cos(degreeToRadians(rayAngle - data.player.angle));

        // Altura da parede
        let wallHeight = Math.floor(data.screen.halfHeight / distance);
        if (wallHeight > data.screen.halfHeight){
            wallHeight = data.screen.halfHeight
        }

        // Desenhando as paredes
        drawLine(rayCount, 0, rayCount, data.screen.halfHeight - wallHeight, "cyan");
        drawLine(rayCount, data.screen.halfHeight - wallHeight, rayCount, data.screen.halfHeight + wallHeight, data.colors[wall-1]);
        drawLine(rayCount, data.screen.halfHeight + wallHeight, rayCount, data.screen.height, "gray");

        // Incremento da ray
        rayAngle += data.rayCasting.incrementAngle;
    }
}

/**
 * Clear screen
 */
function clearScreen() {
    screenContext.clearRect(0, 0, data.screen.width, data.screen.height);
}

/**
 * Movemento player
 */
document.addEventListener('keydown', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.upKey || keyCode === data.key.upArrow) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x + playerCos;
        let newY = data.player.y + playerSin;

        // Colisão player
        if(data.map[Math.floor(newY)][Math.floor(newX)] == 0) {
            data.player.x = newX;
            data.player.y = newY;
        }
    } else if(keyCode === data.key.downKey || keyCode === data.key.downArrow) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x - playerCos;
        let newY = data.player.y - playerSin;

        // Colisão player
        if(data.map[Math.floor(newY)][Math.floor(newX)] == 0) {
            data.player.x = newX;
            data.player.y = newY;
        }
    // Rotação vertical do player
    } else if(keyCode === data.key.leftKey || keyCode === data.key.leftArrow) {
        data.player.angle -= data.player.speed.rotation;
    } else if(keyCode === data.key.rightKey || keyCode === data.key.rightArrow) {
        data.player.angle += data.player.speed.rotation;
    }else if(keyCode == data.key.lookUp){
        data.screen.halfHeight += data.player.speed.rotation;
    }else if(keyCode == data.key.lookDown){
        data.screen.halfHeight -= data.player.speed.rotation;
    }else if(keyCode == data.key.lookCenter){
        data.screen.halfHeight = data.screen.height/2;
    }
});
