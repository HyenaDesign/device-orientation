document.addEventListener("DOMContentLoaded", () => {
    const ship = document.getElementById("ship");
    const asteroid = document.getElementById("asteroid");
    
    let shipX = 50; // Initial ship position
    let asteroidY = 0; // Initial asteroid position
    let shipVelocity = 0; // Initial ship velocity
    const asteroidSpeed = 0.6; // Speed of asteroid
    const dampingFactor = 0.1; // Damping factor for ship movement

    // Function to handle device orientation
    function handleOrientation(event) {
        const gamma = event.gamma; // Tilt angle around the x-axis

        // Calculate new ship velocity based on device tilt
        shipVelocity += (gamma / 5 - shipVelocity) * dampingFactor;
        shipX += shipVelocity;
        
        // Ensure the ship stays within the game boundaries
        shipX = Math.max(0, Math.min(100, shipX));
        
        // Update ship position
        ship.style.left = `${shipX}%`;
    }

    // Function to move the asteroid downwards
    function moveAsteroid() {
        // Move asteroid down with a smoother descent
        asteroidY += asteroidSpeed;
        
        // Reset asteroid position if it goes out of the screen
        if (asteroidY > 100) {
            resetAsteroid();
        }
        
        asteroid.style.top = `${asteroidY}%`;

        // Check for collision
        checkCollision();
    }

    // Function to reset asteroid position
    function resetAsteroid() {
        asteroidY = 0;
        const randomX = Math.random() * 100; // Randomize asteroid position
        asteroid.style.left = `${randomX}%`;
    }

    // Function to check for collision between ship and asteroid
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
            resetAsteroid(); // Reset asteroid position
        }
    }

    // Event listener for device orientation
    window.addEventListener("deviceorientation", handleOrientation);

    // Game loop: move the asteroid continuously
    setInterval(moveAsteroid, 16); // Adjusted for smoother animation
});
