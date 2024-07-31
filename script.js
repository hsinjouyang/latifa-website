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

// Product Info Carousel for mobile
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.list');
    const dotsContainer = document.querySelector('.dots-container');
    const productsPerPage = 4;
    const totalDots = 3; // Set to 3 dots

    const products = Array.from(productList.children);
    const pageCount = Math.ceil(products.length / productsPerPage);

    // Create 3 dots
    dotsContainer.innerHTML = ''; // Clear existing dots
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

    // Initial update
    updateActiveDot();

    // Update on scroll
    productList.addEventListener('scroll', updateActiveDot);
});

// Diary Carousel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Diary carousel script is running');
    
    var carouselContainer = document.querySelector('.update-carousel-container');
    var carouselItems = document.querySelectorAll('.update-carousel-item');
    var totalItems = carouselItems.length;
    var currentIndex = 0;

    function updateCarousel() {
        var offset = currentIndex * -100;
        carouselContainer.style.transform = 'translateX(' + offset + '%)';
    }

    function moveToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    document.querySelector('.update-carousel-button.next').addEventListener('click', function() {
        moveToIndex((currentIndex + 1) % totalItems);
    });

    document.querySelector('.update-carousel-button.prev').addEventListener('click', function() {
        moveToIndex((currentIndex - 1 + totalItems) % totalItems);
    });

    // Linking anchor tags to carousel items
    var diaryLinks = document.querySelectorAll('.diary-link a');
    diaryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default link behavior
            var targetIndex = parseInt(this.getAttribute('data-target'));
            if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < totalItems) {
                moveToIndex(targetIndex);
            }
        });
    });

    // Handle image clicks for fullscreen view on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    carouselItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault(); // Prevent default click behavior
                var img = this.querySelector('img');
                var fullscreenDiv = document.createElement('div');
                fullscreenDiv.className = 'fullscreen-image';
                var fullscreenImg = document.createElement('img');
                fullscreenImg.src = img.src;
                fullscreenDiv.appendChild(fullscreenImg);
                document.body.appendChild(fullscreenDiv);

                fullscreenDiv.addEventListener('click', function() {
                    document.body.removeChild(fullscreenDiv);
                });
            }
        });
    });

    // Initialize the carousel
    updateCarousel();
});


// Side text fade out
document.addEventListener('DOMContentLoaded', function() {
    const sideText = document.querySelector('.side-text');
    const galleryPage = document.querySelector('.gallery-page');
    
    if (!sideText || !galleryPage) {
        console.error("Side text or gallery page element not found");
        return;
    }

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

        if (galleryPage.scrollLeft > 10) { // Small threshold to prevent accidental triggers
            if (isVisible) {
                fadeOutTimer = setTimeout(() => {
                    hideSideText();
                }); // Adjust this value to control how slowly the text fades out
            }
        } else {
            showSideText();
        }
    }, { passive: true });
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