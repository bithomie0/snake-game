// ... (previous code) ...

// Remove the keyboard event listener
// document.addEventListener("keydown", (event) => { ...

// Add touch event listeners for mobile devices
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const swipeThreshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > swipeThreshold && direction !== "ArrowLeft") {
            direction = "ArrowRight";
        } else if (deltaX < -swipeThreshold && direction !== "ArrowRight") {
            direction = "ArrowLeft";
        }
    } else {
        if (deltaY > swipeThreshold && direction !== "ArrowUp") {
            direction = "ArrowDown";
        } else if (deltaY < -swipeThreshold && direction !== "ArrowDown") {
            direction = "ArrowUp";
        }
    }
});

