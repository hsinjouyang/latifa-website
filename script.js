document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for all pages
    function commonInit() {
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
    }

    // Home page specific functionality
    function initHomePage() {
        // Loading Screen 
        function handleLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingImage1 = document.getElementById('loading-image-1');
            const loadingImage2 = document.getElementById('loading-image-2');

            if (!loadingScreen || !loadingImage1 || !loadingImage2) return;

            const firstImageDuration = 2000;
            const secondImageDuration = 3000;

            function switchToSecondImage() {
                loadingImage1.style.display = 'none';
                loadingImage2.style.display = 'block';
            }

            function hideLoadingScreen() {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }

            loadingImage1.style.display = 'block';
            loadingImage2.style.display = 'none';

            if (document.readyState === 'complete') {
                setTimeout(() => {
                    switchToSecondImage();
                    setTimeout(hideLoadingScreen, secondImageDuration);
                }, firstImageDuration);
            } else {
                setTimeout(switchToSecondImage, firstImageDuration);
                window.addEventListener('load', function() {
                    setTimeout(hideLoadingScreen, secondImageDuration);
                });
            }
        }

        handleLoadingScreen();

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

        // Product Info Carousel
        const productInfos = document.querySelectorAll('.product-info');
        productInfos.forEach(productInfo => {
            const list = productInfo.querySelector('.list');
            const products = productInfo.querySelectorAll('.product');
            const dotsContainer = productInfo.querySelector('.dots-container');

            if (!list || !dotsContainer) return;

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
                if (dots[activeIndex]) dots[activeIndex].classList.add('active');

                products.forEach(product => product.classList.remove('enlarged'));

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const activeProduct = products[activeIndex];
                    if (activeProduct) activeProduct.classList.add('enlarged');
                }, 150);
            });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = dot.dataset.index;
                    if (products[index]) products[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                });
            });
        });
    }

    // About page specific functionality
    function initAboutPage() {
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

            if (nextButton) nextButton.addEventListener('click', showNextImage);
            if (prevButton) prevButton.addEventListener('click', showPrevImage);
        }

        // Diary Carousel
        console.log('Diary carousel script is running');
        const carouselContainer = document.querySelector('.update-carousel-container');
        const carouselItems = document.querySelectorAll('.update-carousel-item');
        if (carouselContainer && carouselItems.length > 0) {
            const totalItems = carouselItems.length;
            let currentIndex = 0;

            function updateCarousel() {
                const offset = currentIndex * -100;
                carouselContainer.style.transform = `translateX(${offset}%)`;
            }

            function moveToIndex(index) {
                currentIndex = index;
                updateCarousel();
            }

            const nextButton = document.querySelector('.update-carousel-button.next');
            const prevButton = document.querySelector('.update-carousel-button.prev');

            if (nextButton) {
                nextButton.addEventListener('click', () => moveToIndex((currentIndex + 1) % totalItems));
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => moveToIndex((currentIndex - 1 + totalItems) % totalItems));
            }

            const diaryLinks = document.querySelectorAll('.diary-link a');
            diaryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetIndex = parseInt(this.getAttribute('data-target'));
                    if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < totalItems) {
                        moveToIndex(targetIndex);
                    }
                });
            });

            function isMobile() {
                return window.innerWidth <= 768;
            }

            carouselItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (isMobile()) {
                        e.preventDefault();
                        const img = this.querySelector('img');
                        if (img) {
                            const fullscreenDiv = document.createElement('div');
                            fullscreenDiv.className = 'fullscreen-image';
                            const fullscreenImg = document.createElement('img');
                            fullscreenImg.src = img.src;
                            fullscreenDiv.appendChild(fullscreenImg);
                            document.body.appendChild(fullscreenDiv);

                            fullscreenDiv.addEventListener('click', () => {
                                document.body.removeChild(fullscreenDiv);
                            });
                        }
                    }
                });
            });

            updateCarousel();
        }
    }

    // Gallery page specific functionality
    function initGalleryPage() {
        // Gallery image display
        const galleryContainer = document.querySelector('.gallery-container');
        const gallery = document.querySelector('.gallery');
        if (galleryContainer && gallery) {
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
                const walk = (x - startX) * 3;
                galleryContainer.scrollLeft = scrollLeft - walk;
            });
        }

        // Side text fade out
        const sideText = document.querySelector('.side-text');
        const galleryPage = document.querySelector('.gallery-page');
        
        if (sideText && galleryPage) {
            let isVisible = true;
            let fadeOutTimer;

            function hideSideText() {
                sideText.style.opacity = '0';
                isVisible = false;
            }

            function showSideText() {
                sideText.style.opacity = '1';
                isVisible = true;
            }

            galleryPage.addEventListener('scroll', function() {
                clearTimeout(fadeOutTimer);

                if (galleryPage.scrollLeft > 10) {
                    if (isVisible) {
                        fadeOutTimer = setTimeout(hideSideText, 200);
                    }
                } else {
                    showSideText();
                }
            }, { passive: true });
        }
    }

    // Run common initialization
    commonInit();

    // Determine which page we're on and run the appropriate init function
    if (document.querySelector('.intro')) {
        initHomePage();
    } else if (document.querySelector('.update-carousel-container')) {
        initAboutPage();
    } else if (document.querySelector('.gallery-container')) {
        initGalleryPage();
    }
});