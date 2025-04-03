// Load festival data
let festivalData = null;

// Fetch and load festival data
async function loadFestivalData() {
    try {
        const response = await fetch('data/festival-data.json');
        if (!response.ok) {
            // If direct fetch fails, try with repository name
            const pathSegments = window.location.pathname.split('/');
            const repoName = pathSegments[1];
            const baseUrl = repoName ? `/${repoName}` : '';
            const secondResponse = await fetch(`${baseUrl}/data/festival-data.json`);
            
            if (!secondResponse.ok) {
                throw new Error('Failed to load festival data');
            }
            festivalData = await secondResponse.json();
        } else {
            festivalData = await response.json();
        }
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
        // Add fallback data for testing
        document.getElementById('festival-title').textContent = "International Film Festival 2024";
        document.getElementById('festival-subtitle').textContent = "Celebrating the Art of Cinema";
        
        // Update contact info with fallback data
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <li><i class="fas fa-map-marker-alt"></i> 123 Festival Avenue, Los Angeles, CA 90001</li>
                <li><i class="fas fa-envelope"></i> info@filmfestival.com</li>
                <li><i class="fas fa-phone"></i> +1 (323) 555-0123</li>
            `;
        }
    }
}

// Update page content with festival data
function updatePageContent() {
    // Update festival title and subtitle
    document.getElementById('festival-title').textContent = festivalData.festival.name;
    document.getElementById('festival-subtitle').textContent = festivalData.festival.subtitle;

    // Update featured films
    if (festivalData.featured_films && festivalData.featured_films.films) {
        const filmsGrid = document.getElementById('films-grid');
        document.getElementById('films-title').textContent = festivalData.featured_films.title;
        
        filmsGrid.innerHTML = festivalData.featured_films.films.map(film => `
            <div class="col-md-4">
                <div class="film-card">
                    <div class="film-image">
                        <img src="${film.image}" alt="${film.title}">
                        <div class="film-overlay">
                            <div class="film-details">
                                <p><i class="fas fa-clock"></i>${film.duration}</p>
                                <p><i class="fas fa-globe"></i>${film.country}</p>
                            </div>
                        </div>
                    </div>
                    <div class="film-content">
                        <span class="film-category">${film.category}</span>
                        <h3 class="film-title">${film.title}</h3>
                        <p class="film-director">Directed by ${film.director}</p>
                        <p class="film-description">${film.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update schedule
    if (festivalData.schedule && festivalData.schedule.days) {
        const scheduleGrid = document.getElementById('schedule-grid');
        document.getElementById('schedule-title').textContent = festivalData.schedule.title;
        
        scheduleGrid.innerHTML = festivalData.schedule.days.map(day => `
            <div class="col-md-6">
                <div class="schedule-day mb-4">
                    <h3 class="day-title">${day.date}</h3>
                    ${day.events.map(event => `
                        <div class="schedule-event">
                            <div class="event-time">${event.time}</div>
                            <div class="event-details">
                                <h4>${event.title}</h4>
                                <p class="location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                                <p class="description">${event.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Update about section
    if (festivalData.about) {
        document.getElementById('about-title').textContent = festivalData.about.title;
        document.getElementById('about-description').textContent = festivalData.about.description;
        document.getElementById('about-image').src = festivalData.about.image;
        
        const aboutDetails = document.getElementById('about-details');
        aboutDetails.innerHTML = festivalData.about.details.map(detail => `
            <li><i class="fas fa-check"></i> ${detail}</li>
        `).join('');
    }

    // Update contact info in footer
    const contactInfo = document.querySelector('.contact-info');
    contactInfo.innerHTML = `
        <li><i class="fas fa-map-marker-alt"></i> ${festivalData.contact.address}</li>
        <li><i class="fas fa-envelope"></i> ${festivalData.contact.email}</li>
        <li><i class="fas fa-phone"></i> ${festivalData.contact.phone}</li>
    `;

    // Update social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks[0].href = festivalData.contact.social.facebook;
    socialLinks[1].href = festivalData.contact.social.instagram;
    socialLinks[2].href = festivalData.contact.social.twitter;

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Add fade-in animation to elements
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.film-card, .schedule-event').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFestivalData();
    setupAnimations();
    
    // Smooth scrolling for anchor links
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

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }

    // Mobile menu close on link click
    const mobileMenuLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const mobileMenu = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(mobileMenu, { toggle: false });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
}); 