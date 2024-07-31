// Wrap everything in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');

    // Utility function to safely query elements
    function $(selector) {
        return document.querySelector(selector);
    }

    // Utility function to safely query all elements
    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    // Menu Toggle Function
    function toggleMenu() {
        const menu = $('#sidebar-menu');
        const mainContent = $('main');
        const body = document.body;

        if (menu && mainContent) {
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
    }

    // Set up menu toggle
    const menuToggle = $('.dropbtn');
    if (menuToggle) {
        menuToggle.onclick = toggleMenu;
    }

    // Loading Screen 
    function handleLoadingScreen() {
        const loadingScreen = $('#loading-screen');
        const loadingImage1 = $('#loading-image-1');
        const loadingImage2 = $('#loading-image-2');

        if (!loadingScreen || !loadingImage1 || !loadingImage2) return;

        const firstImageDuration = 1000;
        const secondImageDuration = 2000;

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

    // Handle Resize Events
    function handleResize() {
        const body = document.body;
        const menu = $('#sidebar-menu');

        if (menu) {
            if (window.innerWidth < 1024 || window.innerWidth > 1365) {
                body.classList.remove('menu-open');
            } else if (menu.classList.contains('show')) {
                body.classList.add('menu-open');
            }
        }
    }

    // Initialize all functionality
    function initializePage() {
        const homeLink = $('#home-link');
        if (homeLink) {
            homeLink.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = 'index.html';
            });
        }

        window.addEventListener('resize', handleResize);
    }

    // Run loading screen and initialization
    handleLoadingScreen();
    initializePage();

    // About Page Image Swap
    const aboutImages = $$('.about-image');
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

    // Carousel Functionality
    const carousel = $('.carousel-container');
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        const prevButton = $('.prev');
        const nextButton = $('.next');
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

    // Product Info Carousel
    const productInfos = $$('.product-info');
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

    // Product Info Carousel for mobile
    const productList = $('.list');
    const dotsContainer = $('.dots-container');
    if (productList && dotsContainer) {
        const productsPerPage = 4;
        const totalDots = 3;

        const products = Array.from(productList.children);
        const pageCount = Math.ceil(products.length / productsPerPage);

        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dotsContainer.appendChild(dot);
        }

        const dots = Array.from(dotsContainer.children);

        function updateActiveDot() {
            const scrollPosition = productList.scrollLeft;
            const pageWidth = productList.offsetWidth;
            const currentPage = Math.floor(scrollPosition / pageWidth);

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.min(currentPage, totalDots - 1));
            });
        }

        updateActiveDot();
        productList.addEventListener('scroll', updateActiveDot);
    }

    // Diary Carousel
    console.log('Diary carousel script is running');
    const carouselContainer = $('.update-carousel-container');
    const carouselItems = $$('.update-carousel-item');
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

        const nextButton = $('.update-carousel-button.next');
        const prevButton = $('.update-carousel-button.prev');

        if (nextButton) {
            nextButton.addEventListener('click', () => moveToIndex((currentIndex + 1) % totalItems));
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => moveToIndex((currentIndex - 1 + totalItems) % totalItems));
        }

        const diaryLinks = $$('.diary-link a');
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

    // Side text fade out
    const sideText = $('.side-text');
    const galleryPage = $('.gallery-page');
    
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

    // Gallery image display
    const galleryContainer = $('.gallery-container');
    const gallery = $('.gallery');
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
});