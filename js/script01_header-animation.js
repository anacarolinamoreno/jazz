// SCRIPT 1 - WAVE EFFECT IN THE HEADER

let isBouncing = false;
let isWaving = false;

window.addEventListener('scroll', function() {
    // Music emoji bounce
    if (!isBouncing) {
        isBouncing = true;
        gsap.fromTo("#music-emoji",
            { y: 0 },
            {
                y: -5,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "bounce.inOut",
                onComplete: () => { isBouncing = false; }
            }
        );
    }

    // Header wave effect
    if (!isWaving) {
        isWaving = true;
        const letters = document.querySelectorAll('#wave-header span');
        gsap.set(letters, {display: "inline-block"});
        gsap.to(letters, {
            y: -2,
            duration: 0.04,
            yoyo: true,
            repeat: 1,
            ease: "bounce.inOut",
            stagger: {
                each: 0.02,
                yoyo: true, // This makes the first letters go up and down first
                from: "start"
            },
            onComplete: () => { isWaving = false; }
        });
    }
});