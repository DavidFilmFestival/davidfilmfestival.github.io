// Load festival data
let festivalData = null;

async function loadFestivalData() {
    try {
        // Try the direct relative path first
        const response = await fetch('data/festival-data.json');
        if (!response.ok) {
            throw new Error('Failed to load festival data');
        }
        festivalData = await response.json();
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
        // Add fallback data for testing
        document.querySelector('.page-header h1').textContent = "Film Selection";
        document.querySelector('.page-header p').textContent = "Discover our curated selection of outstanding films.";
    }
}

function updatePageContent() {
    if (!festivalData || !festivalData.featured_films) return;

    // Update page header if there's a title
    if (festivalData.featured_films.title) {
        document.querySelector('.page-header h1').textContent = festivalData.featured_films.title;
    }

    // Update feature films section
    const featureFilmsContainer = document.getElementById('feature-films');
    if (featureFilmsContainer && Array.isArray(festivalData.featured_films.films)) {
        const featureFilmsHTML = festivalData.featured_films.films.map(film => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${film.image}" class="card-img-top" alt="${film.title}">
                    <div class="card-body">
                        <h3 class="card-title">${film.title}</h3>
                        <p class="card-subtitle mb-2 text-muted">${film.category}</p>
                        <div class="film-details mb-3">
                            <p class="mb-1"><i class="fas fa-video"></i> Directed by ${film.director}</p>
                            <p class="mb-1"><i class="fas fa-globe"></i> ${film.country}</p>
                            <p class="mb-1"><i class="fas fa-clock"></i> ${film.duration}</p>
                        </div>
                        <p class="card-text">${film.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
        featureFilmsContainer.innerHTML = featureFilmsHTML;
    }

    // Update contact info in footer
    const footerContactInfo = document.querySelector('footer .contact-info');
    if (footerContactInfo && festivalData.contact) {
        footerContactInfo.innerHTML = `
            <li><i class="fas fa-map-marker-alt"></i> ${festivalData.contact.address}</li>
            <li><i class="fas fa-envelope"></i> ${festivalData.contact.email}</li>
            <li><i class="fas fa-phone"></i> ${festivalData.contact.phone}</li>
        `;
    }

    // Update social media links
    if (festivalData.contact && festivalData.contact.social) {
        const socialLinks = document.querySelectorAll('.social-links a');
        if (socialLinks.length >= 3) {
            socialLinks[0].href = festivalData.contact.social.facebook;
            socialLinks[1].href = festivalData.contact.social.instagram;
            socialLinks[2].href = festivalData.contact.social.twitter;
        }
    }

    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFestivalData();
    
    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}); 