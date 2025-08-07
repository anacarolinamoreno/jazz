// SCRIPT 2 - AUDIO AND PLAY/PAUSE BUTTONS -->
    const video = document.getElementById('video');
    const audioButton = document.getElementById('audio-button-container');
    const playPauseButton = document.getElementById('play-button-container');
    const audioSvg = audioButton.querySelector('svg');
    const playPauseSvg = playPauseButton.querySelector('svg');
    const progressFill = d3.select('#progress-fill');
    const endImage = document.getElementById('end-image');
    const circumference = 2 * Math.PI * 18;
    const audioOnIcon = document.getElementById('audio-on-icon');
    const audioOffIcon = document.getElementById('audio-off-icon');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    function updateAudioIcon() {
        if (video.muted) {
            audioOnIcon.style.display = 'none';
            audioOffIcon.style.display = 'block';
        } else {
            audioOnIcon.style.display = 'block';
            audioOffIcon.style.display = 'none';
        }
    }

    function updatePlayPauseIcon() {
        if (video.paused) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    }

    // Set video to autoplay, no loop, and muted (for autoplay to work)
    video.muted = true;
    video.loop = false;
    video.autoplay = true;

    // Make entire SVGs clickable - ensure all child elements allow pointer events to bubble up
    audioSvg.style.pointerEvents = 'auto';
    audioSvg.style.cursor = 'pointer';
    playPauseSvg.style.pointerEvents = 'auto';
    playPauseSvg.style.cursor = 'pointer';
    
    // Ensure all SVG child elements don't block pointer events, except progress circles
    const audioSvgElements = audioSvg.querySelectorAll('*');
    audioSvgElements.forEach(element => {
        if (element.id !== 'progress-circle' && element.id !== 'progress-fill') {
            element.style.pointerEvents = 'none';
        }
    });

    const playPauseSvgElements = playPauseSvg.querySelectorAll('*');
    playPauseSvgElements.forEach(element => {
        if (element.id !== 'play-progress-circle') {
            element.style.pointerEvents = 'none';
        }
    });

    // Audio button click event
    audioButton.addEventListener('click', function(e) {
        e.preventDefault();
        video.muted = !video.muted;
        audioButton.title = video.muted ? "Unmute" : "Mute";
        updateAudioIcon();
    });

    // Play/Pause button click event
    playPauseButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (endImage.style.display === 'block') {
            // If end image is showing, restart video
            video.currentTime = 0;
            endImage.style.display = 'none';
            video.play();
            playPauseButton.title = "Pause";
        } else if (video.paused) {
            video.play();
            playPauseButton.title = "Pause";
        } else {
            video.pause();
            playPauseButton.title = "Play";
        }
        updatePlayPauseIcon();
    });

    // Call once on load to set initial state
    updateAudioIcon();
    updatePlayPauseIcon();

    // Hide end image initially
    endImage.style.display = 'none';

    // Initialize progress circle
    progressFill.attr('stroke-dasharray', circumference)
                .attr('stroke-dashoffset', circumference);

    // Wait for video to be ready
    video.addEventListener('loadedmetadata', function() {
        video.addEventListener('timeupdate', updateProgressCircle);
        video.play().catch(e => {
            console.log("Autoplay prevented:", e);
            audioButton.style.display = 'block';
            playPauseButton.style.display = 'block';
        });
    }); 

    // Handle video end event
    video.addEventListener('ended', function() {
        endImage.style.display = 'block';
        updatePlayPauseIcon(); // Update to show play icon
    });

    // Handle play/pause events to update icons
    video.addEventListener('play', updatePlayPauseIcon);
    video.addEventListener('pause', updatePlayPauseIcon);

    function updateProgressCircle() {
        if (video.duration) {
            const progress = video.currentTime / video.duration;
            const offset = circumference - (progress * circumference);
            progressFill.attr('stroke-dashoffset', Math.max(0, offset));
        }
    }

    // Set initial button titles
    audioButton.title = "Unmute";
    playPauseButton.title = "Pause";