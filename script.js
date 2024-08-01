document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');

    // Common functionality for all pages
    function commonInit() {
        console.log('Common initialization started');

        // Menu Toggle Function
        function toggleMenu() {
            const menu = document.getElementById('sidebar-menu');
            const mainContent = document.querySelector('main');
            const body = document.body;

            if (menu && mainContent) {
                menu.classList.toggle('show');
                mainContent.classList.toggle('shift');
                if (window.innerWidth >= 1024 && window.innerWidth <= 1365) {
                    body.classList.toggle('menu-open');
                }
            }
        }

        // Set up menu toggle
        const menuToggle = document.querySelector('.dropbtn');
        if (menuToggle) {
            menuToggle.onclick = toggleMenu;
        }

        // Handle Resize Events
        function handleResize() {
            const body = document.body;
            const menu = document.getElementById('sidebar-menu');

            if (menu) {
                if (window.innerWidth < 1024 || window.innerWidth > 1365) {
                    body.classList.remove('menu-open');
                } else if (menu.classList.contains('show')) {
                    body.classList.add('menu-open');
                }
            }
        }

        window.addEventListener('resize', handleResize);

        // Home Link Event Listener
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = 'index.html';
            });
        }

        console.log('Common initialization completed');
    }

    // Loading Screen for all pages
    function handleLoadingScreen() {
        console.log('Loading screen handler started');
        const loadingScreen = document.getElementById('loading-screen');
        const loadingImage1 = document.getElementById('loading-image-1');
        const loadingImage2 = document.getElementById('loading-image-2');

        if (!loadingScreen || !loadingImage1 || !loadingImage2) {
            console.log('Loading screen elements not found, showing content immediately');
            showContent();
            return;
        }

        console.log('Loading screen elements found');

        const firstImageDuration = 500; // 0.5 seconds
        const secondImageDuration = 500; // 0.5 seconds

        function switchToSecondImage() {
            console.log('Switching to second image');
            loadingImage1.style.display = 'none';
            loadingImage2.style.display = 'block';
        }

        function hideLoadingScreen() {
            console.log('Hiding loading screen');
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                showContent();
            }, 500);
        }

        loadingImage1.style.display = 'block';
        loadingImage2.style.display = 'none';

        setTimeout(() => {
            switchToSecondImage();
            setTimeout(hideLoadingScreen, secondImageDuration);
        }, firstImageDuration);
    }

    function showContent() {
        console.log('Showing content');
        document.body.classList.add('content-loaded');
    }

    // Scroll Animation Function
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;

        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('appear');
                }, delay);
            }
        });
    }

    // Home page specific functionality
    function initHomePage() {
        console.log('Initializing home page');

        // About Page Image Swap
        const aboutImages = document.querySelectorAll('.about-image');
        if (aboutImages.length > 0) {
            setInterval(() => {
                aboutImages.forEach(img => {
                    if (img.src.includes('images/latifa_head_01.png')) {
                        img.src = 'images/latifa_head_02.png';
                    } else {
                        img.src = 'images/latifa_head_01.png';
                    }
                });
            }, 300);
        }
    }

    // About page specific functionality
    function initAboutPage() {
        console.log('Initializing about page');

        // Carousel Functionality
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            const images = carousel.querySelectorAll('img');
            const prevButton = document.querySelector('.carousel .prev');
            const nextButton = document.querySelector('.carousel .next');
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

            if (nextButton) nextButton.addEventListener('click', showNextImage);
            if (prevButton) prevButton.addEventListener('click', showPrevImage);
        }

        // Diary Carousel
        const carouselContainer = document.querySelector('.update-carousel-container');
        const carouselItems = document.querySelectorAll('.update-carousel-item');
        const prevButton = document.querySelector('.update-carousel-button.prev');
        const nextButton = document.querySelector('.update-carousel-button.next');
        
        if (carouselContainer && carouselItems.length > 0) {
            let currentIndex = 0;

            function updateCarousel() {
                const offset = currentIndex * -100;
                carouselContainer.style.transform = `translateX(${offset}%)`;
            }

            function moveToIndex(index) {
                currentIndex = index;
                updateCarousel();
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % carouselItems.length;
                    updateCarousel();
                });
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                    updateCarousel();
                });
            }

            // Diary link functionality
            const diaryLinks = document.querySelectorAll('.diary-link a');
            diaryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetIndex = parseInt(this.getAttribute('data-target'));
                    if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < carouselItems.length) {
                        moveToIndex(targetIndex);
                    }
                });
            });

            updateCarousel();
        }

        // Product Info Carousel with Dots
        const productInfos = document.querySelectorAll('.product-info');
        productInfos.forEach(productInfo => {
            const list = productInfo.querySelector('.list');
            const products = productInfo.querySelectorAll('.product');
            const dotsContainer = productInfo.querySelector('.dots-container');

            if (!list || !dotsContainer) {
                console.log('List or dots container not found');
                return;
            }

            console.log(`Found ${products.length} products`);

            // Calculate number of products per group based on screen width
            let productsPerGroup = window.innerWidth <= 768 ? 4 : 3; // 2x2 on mobile, 3x1 on desktop
            let numberOfGroups = Math.ceil(products.length / productsPerGroup);

            function updateDots() {
                // Clear existing dots
                dotsContainer.innerHTML = '';

                // Create dots for each group
                for (let i = 0; i < numberOfGroups; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.dataset.index = i;
                    dotsContainer.appendChild(dot);
                }

                console.log(`Created ${numberOfGroups} dots`);
            }

            updateDots();

            list.addEventListener('scroll', () => {
                const scrollLeft = list.scrollLeft;
                const width = list.scrollWidth - list.clientWidth;
                const percent = scrollLeft / width;

                const activeGroupIndex = Math.round(percent * (numberOfGroups - 1));

                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeGroupIndex);
                });
            });

            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const groupIndex = parseInt(e.target.dataset.index);
                    if (!isNaN(groupIndex)) {
                        const scrollPosition = (groupIndex * productsPerGroup * list.scrollWidth) / products.length;
                        list.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                    }
                }
            });

            // Update dots on window resize
            window.addEventListener('resize', () => {
                const newProductsPerGroup = window.innerWidth <= 768 ? 4 : 3;
                if (newProductsPerGroup !== productsPerGroup) {
                    productsPerGroup = newProductsPerGroup;
                    numberOfGroups = Math.ceil(products.length / productsPerGroup);
                    updateDots();
                }
            });
        });
    }

    // Run common initialization
    console.log('Running common initialization');
    commonInit();

    // Determine which page we're on and run the appropriate init function
    console.log('Current page id:', document.body.id);
    const currentPage = document.body.id || '';
    switch (currentPage) {
        case 'home-page':
            initHomePage();
            break;
        case 'about-page':
            initAboutPage();
            break;
        case 'gallery-page':
            // Add gallery page specific initialization if needed
            break;
        default:
            console.log('Unknown page');
    }

    // Always run the loading screen
    console.log('Starting loading screen');
    handleLoadingScreen();

    // Add event listener for scroll
    window.addEventListener('scroll', handleScrollAnimation);

    // Initial check for elements in view on page load
    handleScrollAnimation();
});