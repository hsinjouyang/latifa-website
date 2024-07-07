document.addEventListener('DOMContentLoaded', function() {
    // Home Link Event Listener
    const homeLink = document.getElementById('home-link');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'index.html'; // Navigate to the home page
    });

    // Menu Toggle
    const menuToggle = document.querySelector('.dropbtn');
    menuToggle.addEventListener('click', toggleMenu);

    function toggleMenu() {
        const menu = document.getElementById('sidebar-menu');
        const mainContent = document.querySelector('main');
        const body = document.body;

        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            mainContent.classList.remove('shift');
            body.classList.remove('menu-open');
        } else {
            menu.classList.add('show');
            mainContent.classList.add('shift');

            // Only add the menu-open class on desktop screens
            if (window.innerWidth >= 1024 && window.innerWidth <= 1365) {
                body.classList.add('menu-open');
            }
        }
    }

    // Handle Resize Events
    window.addEventListener('resize', function() {
        const body = document.body;
        const menu = document.getElementById('sidebar-menu');

        if (window.innerWidth < 1024 || window.innerWidth > 1365) {
            body.classList.remove('menu-open');
        } else if (menu.classList.contains('show')) {
            body.classList.add('menu-open');
        }
    });

    // About Page Image Swap
    const aboutImages = document.querySelectorAll('.about-image');
    setInterval(() => {
        aboutImages.forEach(img => {
            if (img.src.includes('images/latifa_head_01.png')) {
                img.src = 'images/latifa_head_02.png';
            } else {
                img.src = 'images/latifa_head_01.png';
            }
        });
    }, 300);

    // Frenchie Prints Animation
    const prints = document.querySelectorAll('.frenchie_prints img');
    let currentIndex = prints.length - 1;

    function showNextPrint() {
        if (prints.length === 0) return; // Ensure there are prints to show
        prints[currentIndex].style.opacity = '1';
        setTimeout(() => {
            prints[currentIndex].style.opacity = '0';
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = prints.length - 1;
            }
            showNextPrint();
        }, 300);
    }

    showNextPrint();

    // Carousel Functionality
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    // Product Info Carousel
    const productInfos = document.querySelectorAll('.product-info');

    productInfos.forEach(productInfo => {
        const list = productInfo.querySelector('.list');
        const products = productInfo.querySelectorAll('.product');
        const dotsContainer = productInfo.querySelector('.dots-container');

        // Check if dotsContainer is found
        if (!dotsContainer) {
            console.error('Dots container not found!');
            return;
        }

        // Create dots for each product
        products.forEach((product, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        let scrollTimeout;
        list.addEventListener('scroll', () => {
            const scrollLeft = list.scrollLeft;
            const width = list.scrollWidth - list.clientWidth;
            const percent = scrollLeft / width;

            const activeIndex = Math.round(percent * (products.length - 1));

            dots.forEach(dot => dot.classList.remove('active'));
            dots[activeIndex].classList.add('active');

            // Remove enlarged class from all products
            products.forEach(product => product.classList.remove('enlarged'));

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const activeProduct = products[activeIndex];
                activeProduct.classList.add('enlarged');
            }, 150); // Delay to determine when scrolling stops
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = dot.dataset.index;
                products[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
            });
        });
    });
});

// Diary 3D Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.update-carousel-container');
    const carouselItems = document.querySelectorAll('.update-carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * -100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.update-carousel-button.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    document.querySelector('.update-carousel-button.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Initialize the carousel
    updateCarousel();
});

// Gallery image diaplay
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const gallery = document.querySelector('.gallery');
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        gallery.classList.add('active');
        startX = e.pageX - galleryContainer.offsetLeft;
        scrollLeft = galleryContainer.scrollLeft;
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isDown = false;
        gallery.classList.remove('active');
    });

    galleryContainer.addEventListener('mouseup', () => {
        isDown = false;
        gallery.classList.remove('active');
    });

    galleryContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryContainer.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        galleryContainer.scrollLeft = scrollLeft - walk;
    });
});