// SCRIPT 3 - SCROLLYTELLING: MAPPING MANHATTAN JAZZ CLUBS

        // Configuration with your content
        const config = {
            chapters: [
                {
                    id: 'step1',
                    title: 'Jazz-in-the-City',
                    image: 'img/jazz_map/step0.webp',
                    description: ""
                },
                {
                    id: 'step2',
                    title: '',
                    image: 'img/jazz_map/step1.webp',
                    description: "Manhattan has dozens of destinations for jazz lovers."
                },
                {
                    id: 'step3',
                    title: '',
                    image: 'img/jazz_map/step2.webp',
                    description: "Here's a non-comprehensive map."
                },
                {
                    id: 'step4',
                    title: '',
                    image: 'img/jazz_map/step3.webp',
                    description: "There's the Village Vanguard, the oldest one still running, where legends such as Miles Davis, Thelonious Monk and Charlie Mingus played since it opened its doors in 1935."
                },
                {
                    id: 'step5',
                    title: '',
                    image: 'img/jazz_map/step4.webp',
                    description: "There's Birdland, which opened in 1949 and had Charlie Parker (aka the 'Bird') as a headliner, and hosted Ella Fitzgerald, John Coltrane and other legends."
                },
                {
                    id: 'step6',
                    title: '',
                    image: 'img/jazz_map/step5.webp',
                    description: "But none is homier than Parlor Entertainment, the up further north of the island."
                },
                {
                    id: 'step7',
                    title: '',
                    image: 'img/jazz_map/step5.webp',
                    description: "Marjorie's apartment is on 555 Edgecomb Avenue, a centennial building that was once home to jazz musician Count Basie and actor and activist Paul Robeson."
                }
            ]
        };

        document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('image-container');
    const textContainer = document.getElementById('text-container');
    
    // Create all images
    config.chapters.forEach(chapter => {
        const img = document.createElement('img');
        img.src = chapter.image;
        img.alt = chapter.title || chapter.description;
        img.classList.add('scrolly-image');
        imageContainer.appendChild(img);
    });
    
    // Create all steps with content
    config.chapters.forEach((chapter, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.id = chapter.id;
        stepDiv.dataset.index = index; // Add data attribute for tracking
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'step-content';
        contentDiv.innerHTML = `
            ${chapter.title ? `<h2>${chapter.title}</h2>` : ''}
            <p>${chapter.description}</p>
        `;
        
        stepDiv.appendChild(contentDiv);
        textContainer.appendChild(stepDiv);
    });

    // Initialize first image as active
    const images = document.querySelectorAll('.scrolly-image');
    images[0].classList.add('active');

    // Set up Intersection Observer with proper desktop detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentIndex = parseInt(entry.target.dataset.index);
                
                // Update all images
                images.forEach(img => img.classList.remove('active'));
                
                // Activate current image with delay for smoother transition
                setTimeout(() => {
                    if (images[currentIndex]) {
                        images[currentIndex].classList.add('active');
                    }
                }, 50);
            }
        });
    }, {
        threshold: 0.6,
        root: null, // Observe relative to viewport
        rootMargin: '0px 0px -30% 0px' // Adjusted margin for better detection
    });

    // Observe all steps
    document.querySelectorAll('.step').forEach(step => {
        observer.observe(step);
    });

    // Force redraw to prevent transition issues
    setTimeout(() => {
        imageContainer.style.opacity = '1';
    }, 100);
});