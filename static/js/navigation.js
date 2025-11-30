/**
 * Custom navigation and interaction for Nuclear Energy project
 */

(function($) {
    'use strict';

    // Keyboard navigation
    $(document).on('keydown', function(e) {
        // Left arrow or 'a' key
        if (e.keyCode === 37 || e.keyCode === 65) {
            var prevLink = $('.nav-prev');
            if (prevLink.length) {
                window.location.href = prevLink.attr('href');
            }
        }
        // Right arrow or 'd' key
        else if (e.keyCode === 39 || e.keyCode === 68) {
            var nextLink = $('.nav-next');
            if (nextLink.length) {
                window.location.href = nextLink.attr('href');
            }
        }
    });

    // Image carousel functionality
    function initCarousel() {
        $('.image-carousel').each(function() {
            var $carousel = $(this);
            var $container = $carousel.find('.carousel-container');
            var $items = $container.find('.carousel-item');
            var currentIndex = 0;
            var totalItems = $items.length;
            var captionTimer;

            if (totalItems <= 1) return;

            // Create indicators container
            var $indicators = $('<div class="carousel-indicators"></div>');
            
            // Create all indicators
            $items.each(function(index) {
                var $indicator = $('<span class="indicator" data-index="' + index + '"></span>');
                if (index === 0) $indicator.addClass('active');
                $indicator.on('click', function() {
                    goToSlide(parseInt($(this).attr('data-index')));
                });
                $indicators.append($indicator);
            });
            $carousel.append($indicators);

            // Create controls if they don't exist
            if (!$carousel.find('.carousel-controls').length) {
                var $controls = $('<div class="carousel-controls"></div>');
                $controls.append('<button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>');
                $controls.append('<button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>');
                $carousel.append($controls);
            }

            // Show caption temporarily when changing slides
            function showCaptionTemporarily() {
                var $currentCaption = $items.eq(currentIndex).find('.carousel-caption');
                $currentCaption.addClass('visible');
                
                clearTimeout(captionTimer);
                captionTimer = setTimeout(function() {
                    $currentCaption.removeClass('visible');
                }, 3000); // Hide after 3 seconds
            }

            // Add click handler for full-screen images
            $items.find('img').on('click', function(e) {
                e.stopPropagation();
                var imgSrc = $(this).attr('src');
                var imgAlt = $(this).attr('alt');
                openImageModal(imgSrc, imgAlt);
            });

            function updateVisibleIndicators() {
                var $allIndicators = $indicators.find('.indicator');
                
                // If 5 or fewer indicators, show all
                if (totalItems <= 5) {
                    $allIndicators.show();
                    return;
                }
                
                // If more than 5, show only 5 centered around the current index
                $allIndicators.hide();
                
                var start, end;
                if (currentIndex <= 2) {
                    // Near the beginning
                    start = 0;
                    end = 4;
                } else if (currentIndex >= totalItems - 3) {
                    // Near the end
                    start = totalItems - 5;
                    end = totalItems - 1;
                } else {
                    // In the middle
                    start = currentIndex - 2;
                    end = currentIndex + 2;
                }
                
                for (var i = start; i <= end; i++) {
                    $allIndicators.eq(i).show();
                }
            }

            function goToSlide(index) {
                if (index < 0) index = totalItems - 1;
                if (index >= totalItems) index = 0;
                
                currentIndex = index;
                $container.css('transform', 'translateX(-' + (currentIndex * 100) + '%)');
                
                // Update indicators
                $indicators.find('.indicator').removeClass('active');
                $indicators.find('.indicator').eq(currentIndex).addClass('active');
                
                // Update which indicators are visible
                updateVisibleIndicators();
                
                // Show caption temporarily
                showCaptionTemporarily();
            }
            
            // Initialize visible indicators
            updateVisibleIndicators();
            
            // Show caption on first load
            showCaptionTemporarily();

            // Button controls
            $carousel.on('click', '.prev-btn', function(e) {
                e.preventDefault();
                goToSlide(currentIndex - 1);
            });

            $carousel.on('click', '.next-btn', function(e) {
                e.preventDefault();
                goToSlide(currentIndex + 1);
            });

            // Touch/swipe support
            var touchStartX = 0;
            var touchEndX = 0;

            $carousel.on('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            $carousel.on('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left
                    goToSlide(currentIndex + 1);
                }
                if (touchEndX > touchStartX + 50) {
                    // Swipe right
                    goToSlide(currentIndex - 1);
                }
            }

            // Auto-play (optional, commented out by default)
            /*
            setInterval(function() {
                goToSlide(currentIndex + 1);
            }, 5000);
            */
        });
    }

    // Full-screen image modal
    function openImageModal(imgSrc, imgAlt) {
        // Create modal if it doesn't exist
        if (!$('#imageModal').length) {
            var modalHtml = '<div id="imageModal" class="image-modal">' +
                '<span class="image-modal-close">&times;</span>' +
                '<img src="" alt="" />' +
                '</div>';
            $('body').append(modalHtml);
            
            // Close modal on click
            $('#imageModal').on('click', function(e) {
                if (e.target.id === 'imageModal' || $(e.target).hasClass('image-modal-close')) {
                    closeImageModal();
                }
            });
            
            // Close modal on ESC key
            $(document).on('keydown', function(e) {
                if (e.keyCode === 27 && $('#imageModal').hasClass('active')) {
                    closeImageModal();
                }
            });
        }
        
        // Set image and show modal
        $('#imageModal img').attr('src', imgSrc).attr('alt', imgAlt);
        $('#imageModal').addClass('active');
        $('body').css('overflow', 'hidden'); // Prevent scrolling
    }

    function closeImageModal() {
        $('#imageModal').removeClass('active');
        $('body').css('overflow', ''); // Restore scrolling
    }

    // Smooth scroll for internal links
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

    // Lazy load images
    function lazyLoadImages() {
        var lazyImages = document.querySelectorAll('img[data-src]');
        
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Fade-in elements on scroll
    function fadeInOnScroll() {
        $('.fade-in-scroll').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Initialize on document ready
    $(document).ready(function() {
        initCarousel();
        lazyLoadImages();
        fadeInOnScroll();
        
        $(window).on('scroll', fadeInOnScroll);

        // Add fade-in-scroll class to content sections
        $('.content-section').addClass('fade-in-scroll');
    });

})(jQuery);

