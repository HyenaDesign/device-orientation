document.addEventListener("DOMContentLoaded", () => {
    const ship = document.getElementById("ship");
    let shipX = 50;
    let shipVelocity = 0;
    const dampingFactor = 0.1;
    let asteroidSpeed = 0.6;
    let asteroidY = 0;
    const asteroidInterval = 12000;
    const speedInterval = 5000;
    
    function handleOrientation(event) {
        const gamma = event.gamma;

        shipVelocity += (gamma / 5 - shipVelocity) * dampingFactor;
        shipX += shipVelocity;

        shipX = Math.max(0, Math.min(100, shipX));

        ship.style.left = `${shipX}%`;
    }

    function moveAsteroid() {
        asteroidY += asteroidSpeed;
        
        if (asteroidY > 100) {
            resetAsteroid();
        }
        
        asteroid.style.top = `${asteroidY}%`;

        checkCollision();
    }

    function resetAsteroid() {
        asteroidY = 0;
        const randomX = Math.random() * 100;
        asteroid.style.left = `${randomX}%`;
    }

    function checkCollision() {
        const shipRect = ship.getBoundingClientRect();
        const asteroidRect = asteroid.getBoundingClientRect();

        if (
            shipRect.bottom >= asteroidRect.top &&
            shipRect.top <= asteroidRect.bottom &&
            shipRect.right >= asteroidRect.left &&
            shipRect.left <= asteroidRect.right
        ) {
            alert("Game Over!");
            resetAsteroid();
        }
    }

    window.addEventListener("deviceorientation", handleOrientation);

    setInterval(moveAsteroid, 16);
    
    setInterval(() => {
        const newAsteroid = document.createElement("div");
        newAsteroid.className = "asteroid";
        document.body.appendChild(newAsteroid);
        const randomX = Math.random() * 100;
        newAsteroid.style.left = `${randomX}%`;
    }, asteroidInterval);
    
    setInterval(() => {
        asteroidSpeed += 0.1;
    }, speedInterval);
});
