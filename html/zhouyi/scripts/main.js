// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Knowledge card hover effect
document.addEventListener('DOMContentLoaded', function() {
    const knowledgeCards = document.querySelectorAll('.knowledge-card');
    
    knowledgeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== '#') {
            link.style.opacity = '0.5';
        }
    });
});

// Symbol animation for Taiji page only
document.addEventListener('DOMContentLoaded', function() {
    const symbols = document.querySelectorAll('.symbol-large');
    
    symbols.forEach(symbol => {
        // Only rotate if it's the Taiji page
        if (document.querySelector('.page-title') && 
            document.querySelector('.page-title').textContent === '太极') {
            let rotation = 0;
            setInterval(() => {
                rotation += 0.5;
                symbol.style.transform = `rotate(${rotation}deg)`;
            }, 50);
        }
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            if (diff > 0) {
                // Swipe left - close menu
                navMenu.classList.remove('active');
            } else {
                // Swipe right - open menu
                navMenu.classList.add('active');
            }
        }
    }
}

// Dark mode toggle (optional - can be enabled if needed)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
});

// Font size adjustment
function increaseFontSize() {
    document.body.style.fontSize = 'larger';
}

function decreaseFontSize() {
    document.body.style.fontSize = 'smaller';
}

function resetFontSize() {
    document.body.style.fontSize = '';
}

// Accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add aria-labels to dynamically created elements
    const knowledgeCards = document.querySelectorAll('.knowledge-card');
    knowledgeCards.forEach((card, index) => {
        card.setAttribute('aria-label', `知识卡片 ${index + 1}`);
    });
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = '跳转到主要内容';
    skipLink.style.cssText = 'position: absolute; top: -40px; left: 0; background: #000; color: #fff; padding: 8px; z-index: 100;';
    skipLink.setAttribute('aria-label', '跳转到主要内容');
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Performance optimization: lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.message);
    // Add user-friendly error message here if needed
});
