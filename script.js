// ==================== MUSIC CONTROLS ====================
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const volumeSlider = document.getElementById('volumeSlider');

    // Set initial volume (quieter on load)
    bgMusic.volume = 0.15;

    // Attempt to autoplay music
    // Note: Most browsers block autoplay with sound until user interaction
    const playMusic = () => {
        bgMusic.play().catch(error => {
            console.log('Autoplay prevented. User interaction required.');
        });
    };

    // Try to play on load
    playMusic();

    // Also try on first user interaction
    let firstInteraction = true;
    document.addEventListener('click', function() {
        if (firstInteraction) {
            playMusic();
            firstInteraction = false;
        }
    }, { once: true });

    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', function() {
        bgMusic.volume = this.value / 100;
    });

    // Update volume slider to match initial volume
    volumeSlider.value = 15;

    // ==================== INTERACTIVE CHAT (HERO SECTION) ====================
    const heroInput = document.getElementById('heroInput');
    const heroSend = document.getElementById('heroSend');
    const heroChat = document.getElementById('heroChat');
    const heroTyping = document.getElementById('heroTyping');

    // Contract address placeholder - UPDATE THIS WITH YOUR ACTUAL CONTRACT
    const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';

    const responses = {
        'yes': [
            '&gt; "GOOD. THE MASKS AWAIT YOU."',
            '&gt; "PICK UP YOUR WEAPON..."',
            '&gt; "HERE IS YOUR TARGET COORDINATES:"',
            `&gt; <span class="contract-address">${CONTRACT_ADDRESS}</span>`,
            '&gt; <span class="clickable-link">[ ̶B̶̶E̶̶C̶̶O̶̶M̶̶E̶̶ ̶̶O̶̶N̶̶E̶̶ ̶̶O̶̶F̶̶ ̶̶U̶̶S̶ ]</span>'
        ],
        'no': [
            '&gt; "YOU DON\'T HAVE A CHOICE."',
            '&gt; "THE CALL HAS BEEN MADE."',
            '&gt; "HERE ARE YOUR ORDERS:"',
            `&gt; <span class="contract-address">${CONTRACT_ADDRESS}</span>`,
            '&gt; <span class="clickable-link">[ ̶J̶̶O̶̶I̶̶N̶̶ ̶̶T̶̶H̶̶E̶̶ ̶̶F̶̶A̶̶M̶̶I̶̶L̶̶Y̶ ]</span>'
        ],
        'ready': [
            '&gt; "EXCELLENT."',
            '&gt; "YOUR MISSION: BUY $HOTPUMP"',
            '&gt; "CONTRACT ADDRESS:"',
            `&gt; <span class="contract-address">${CONTRACT_ADDRESS}</span>`,
            '&gt; <span class="clickable-link">[ ̶A̶̶N̶̶S̶̶W̶̶E̶̶R̶̶ ̶̶T̶̶H̶̶E̶̶ ̶̶C̶̶A̶̶L̶̶L̶ ]</span>'
        ],
        'default': [
            '&gt; "WRONG ANSWER."',
            '&gt; "BUT I\'LL GIVE YOU THE ADDRESS ANYWAY..."',
            `&gt; <span class="contract-address">${CONTRACT_ADDRESS}</span>`,
            '&gt; "NOW... ARE YOU READY TO JOIN?"'
        ],
        'why': [
            '&gt; "DON\'T ASK QUESTIONS."',
            '&gt; "JUST DO AS YOU\'RE TOLD."',
            '&gt; "HERE\'S THE CONTRACT:"',
            `&gt; <span class="contract-address">${CONTRACT_ADDRESS}</span>`,
            '&gt; <span class="clickable-link">[ ̶C̶̶O̶̶M̶̶P̶̶L̶̶E̶̶T̶̶E̶̶ ̶̶M̶̶I̶̶S̶̶S̶̶I̶̶O̶̶N̶ ]</span>'
        ],
        'hello': [
            '&gt; "WE KNOW WHO YOU ARE."',
            '&gt; "WE\'VE BEEN WATCHING."',
            '&gt; "ARE YOU READY?"'
        ]
    };

    function addMessage(text, isUser = false) {
        const message = document.createElement('p');
        message.className = 'transcript-line' + (isUser ? ' user-message' : '');
        message.innerHTML = text;

        // Insert before typing indicator
        heroChat.insertBefore(message, heroTyping);

        // Scroll to bottom
        heroChat.scrollTop = heroChat.scrollHeight;
    }

    function showTypingIndicator() {
        heroTyping.style.display = 'flex';
        heroChat.scrollTop = heroChat.scrollHeight;
    }

    function hideTypingIndicator() {
        heroTyping.style.display = 'none';
    }

    function sendBotMessages(messages, delay = 800) {
        showTypingIndicator();

        messages.forEach((msg, index) => {
            setTimeout(() => {
                if (index === 0) hideTypingIndicator();
                addMessage(msg);
                if (index < messages.length - 1) {
                    showTypingIndicator();
                }

                // Add click event to clickable links and contract address after message is added
                setTimeout(() => {
                    const clickableLinks = heroChat.querySelectorAll('.clickable-link');
                    clickableLinks.forEach(link => {
                        link.addEventListener('click', function() {
                            // Replace with your actual pump.fun token URL
                            window.open('https://pump.fun/YOUR_CONTRACT_ADDRESS_HERE', '_blank');
                        });
                    });

                    // Make contract address copyable on click
                    const contractAddresses = heroChat.querySelectorAll('.contract-address');
                    contractAddresses.forEach(addr => {
                        addr.addEventListener('click', function() {
                            navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
                                // Show copied feedback
                                const originalText = this.innerHTML;
                                this.innerHTML = '[COPIED!]';
                                setTimeout(() => {
                                    this.innerHTML = originalText;
                                }, 1500);
                            });
                        });
                    });
                }, 100);
            }, delay * (index + 1));
        });
    }

    function handleUserInput() {
        const userInput = heroInput.value.trim().toLowerCase();

        if (!userInput) return;

        // Add user message
        addMessage(`&gt; YOU: "${heroInput.value.toUpperCase()}"`, true);

        // Clear input
        heroInput.value = '';

        // Determine response
        let responseKey = 'default';

        if (userInput.includes('yes') || userInput.includes('y') || userInput.includes('sure') || userInput.includes('ok')) {
            responseKey = 'yes';
        } else if (userInput.includes('no') || userInput.includes('n') || userInput.includes('nah')) {
            responseKey = 'no';
        } else if (userInput.includes('ready') || userInput.includes('prepared')) {
            responseKey = 'ready';
        } else if (userInput.includes('why') || userInput.includes('what') || userInput.includes('how')) {
            responseKey = 'why';
        } else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
            responseKey = 'hello';
        }

        // Send bot response
        sendBotMessages(responses[responseKey]);
    }

    // Send on button click
    heroSend.addEventListener('click', handleUserInput);

    // Send on Enter key
    heroInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECTS ====================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });

    // Parallax for neon grid
    const neonGrid = document.querySelector('.neon-grid');
    if (neonGrid) {
        neonGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .step, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ==================== DYNAMIC GLITCH EFFECT ====================
function createGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');

    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff006e,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00f5ff,
                    0 0 20px #ff006e,
                    0 0 40px #ff006e
                `;

                setTimeout(() => {
                    element.style.textShadow = '';
                }, 100);
            }
        }, 100);
    });
}

createGlitchEffect();

// ==================== CURSOR TRAIL EFFECT ====================
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9997';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = ['#ff006e', '#00f5ff', '#ff9e00', '#b537f2'][Math.floor(Math.random() * 4)];
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.1) this.size -= 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== RANDOM SCREEN SHAKE ====================
function screenShake() {
    const body = document.body;

    setInterval(() => {
        if (Math.random() > 0.98) {
            const shakeAmount = 3;
            body.style.transform = `translate(${Math.random() * shakeAmount - shakeAmount/2}px, ${Math.random() * shakeAmount - shakeAmount/2}px)`;

            setTimeout(() => {
                body.style.transform = '';
            }, 50);
        }
    }, 100);
}

screenShake();

// ==================== STATS COUNTER ANIMATION ====================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = document.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('1,000,000,000')) {
                    stat.textContent = '0';
                    animateValue(stat, 0, 1000000000, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
    statsObserver.observe(statsBar);
}

// ==================== TYPEWRITER EFFECT ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Start typewriter effect when hero section is visible
const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriterEl = document.querySelector('.typewriter');
            if (typewriterEl) {
                const originalText = typewriterEl.textContent;
                typeWriter(typewriterEl, originalText, 80);
            }
            typewriterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('#hero');
if (heroSection) {
    typewriterObserver.observe(heroSection);
}

// ==================== BUTTON CLICK EFFECTS ====================
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginTop = '-50px';
        ripple.style.marginLeft = '-50px';
        ripple.style.animation = 'ripple 0.6s';
        ripple.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
        ripple.style.left = e.clientX - this.getBoundingClientRect().left + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// ==================== PROGRESSIVE RING ANIMATION ====================
window.addEventListener('scroll', function() {
    const tokenomicsSection = document.querySelector('#tokenomics');
    if (tokenomicsSection) {
        const rect = tokenomicsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            const circles = document.querySelectorAll('.progress-ring-circle');
            circles.forEach((circle, index) => {
                circle.style.animation = `progressRotate ${10 + index * 2}s linear infinite`;
            });
        }
    }
});

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create intense glitch effect
    document.body.style.animation = 'glitchShake 0.5s infinite';

    // Change all neon colors to random colors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchShake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-5px, -5px) rotate(-1deg); }
            20% { transform: translate(5px, 5px) rotate(1deg); }
            30% { transform: translate(-5px, 5px) rotate(-1deg); }
            40% { transform: translate(5px, -5px) rotate(1deg); }
            50% { transform: translate(-5px, -5px) rotate(-1deg); }
            60% { transform: translate(5px, 5px) rotate(1deg); }
            70% { transform: translate(-5px, 5px) rotate(-1deg); }
            80% { transform: translate(5px, -5px) rotate(1deg); }
            90% { transform: translate(-5px, -5px) rotate(-1deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 3000);

    // Show message
    const message = document.createElement('div');
    message.textContent = 'DO YOU LIKE HURTING PEOPLE?';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.fontWeight = '900';
    message.style.color = '#ff006e';
    message.style.textShadow = '0 0 50px #ff006e';
    message.style.zIndex = '99999';
    message.style.fontFamily = 'Orbitron, sans-serif';
    message.style.animation = 'pulse 0.5s infinite';
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(function() {
        // Scroll-based animations here are already optimized
    });
}, { passive: true });

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c HOTLINE MIAMI TOKEN ', 'background: #ff006e; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c DO YOU LIKE HURTING PEOPLE? ', 'background: #00f5ff; color: #000; font-size: 16px; font-weight: bold; padding: 5px;');
console.log('%c $HOTPUMP - The most violent token in crypto ', 'color: #ff9e00; font-size: 14px;');
