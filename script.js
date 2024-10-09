document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        overlay.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
    });

    // Close the menu when clicking outside
    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.style.display = 'none';
    });

    // Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.right');
    const prevButton = document.querySelector('.carousel-btn.left');

    let currentSlide = track.querySelector('.current-slide');
    let slideWidth = currentSlide.getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // Move to target slide
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // When I click left, move slides to the left
    prevButton.addEventListener('click', () => {
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(track, currentSlide, prevSlide);
        currentSlide = prevSlide;
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', () => {
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(track, currentSlide, nextSlide);
        currentSlide = nextSlide;
    });

    // Update slideWidth on window resize
    window.addEventListener('resize', () => {
        slideWidth = currentSlide.getBoundingClientRect().width;
        slides.forEach(setSlidePosition);
        track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    });

    // Active Navigation Link Highlighting (Optional)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // Adjust as needed
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-link');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active-link');
            }
        });
    });
});
