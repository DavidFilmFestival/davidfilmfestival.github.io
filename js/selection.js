// Load festival data
let festivalData = null;

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
        document.querySelector('.page-header h1').textContent = "Official Selection";
        document.querySelector('.page-header p').textContent = "Discover our curated selection of outstanding films.";
    }
}

function updatePageContent() {
    if (!festivalData) return;

    // Update feature films section
    const featureFilmsContainer = document.querySelector('#feature-films .films-grid');
    if (featureFilmsContainer && festivalData.featured_films && Array.isArray(festivalData.featured_films.films)) {
        const featureFilmsHTML = festivalData.featured_films.films.map(film => `
            <div class="film-card">
                <div class="film-image">
                    <img src="${film.image}" alt="${film.title}">
                </div>
                <div class="film-content">
                    <h3>${film.title}</h3>
                    <p class="film-category">${film.category}</p>
                    <p class="director">Directed by ${film.director}</p>
                    <p class="country">${film.country}</p>
                    <p class="duration">${film.duration}</p>
                    <p class="description">${film.description}</p>
                </div>
            </div>
        `).join('');
        featureFilmsContainer.innerHTML = featureFilmsHTML;
    }

    // Update short films section
    const shortFilmsContainer = document.querySelector('#short-films .films-grid');
    if (shortFilmsContainer && festivalData.shortFilms && Array.isArray(festivalData.shortFilms)) {
        const shortFilmsHTML = festivalData.shortFilms.map(film => `
            <div class="film-card">
                <div class="film-image">
                    <img src="${film.image}" alt="${film.title}">
                </div>
                <div class="film-content">
                    <h3>${film.title}</h3>
                    <p class="director">Directed by ${film.director}</p>
                    <p class="country">${film.country}</p>
                    <p class="duration">${film.duration} min</p>
                    <p class="description">${film.description}</p>
                </div>
            </div>
        `).join('');
        shortFilmsContainer.innerHTML = shortFilmsHTML;
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
        const socialLinks = {
            facebook: document.getElementById('facebook-link'),
            twitter: document.getElementById('twitter-link'),
            instagram: document.getElementById('instagram-link')
        };

        Object.keys(socialLinks).forEach(platform => {
            if (socialLinks[platform] && festivalData.contact.social[platform]) {
                socialLinks[platform].href = festivalData.contact.social[platform];
            }
        });
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

    // Observe all sections and film cards
    document.querySelectorAll('section, .film-card').forEach(element => {
        observer.observe(element);
    });
}); 