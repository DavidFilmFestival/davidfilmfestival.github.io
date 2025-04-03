// Load festival data
let festivalData = null;

async function loadFestivalData() {
    try {
        // Get the repository name from the URL path
        const pathSegments = window.location.pathname.split('/');
        const repoName = pathSegments[1]; // This will be 'home' or whatever name you chose
        const baseUrl = repoName ? `/${repoName}` : '';
            
        const response = await fetch(`${baseUrl}/data/festival-data.json`);
        if (!response.ok) {
            throw new Error('Failed to load festival data');
        }
        festivalData = await response.json();
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
    }
}
// Update page content with loaded data
function updatePageContent() {
    // Update feature films grid
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = festivalData.selection.features.map(film => `
        <div class="col-md-6 col-lg-4">
            <div class="film-card">
                <div class="film-image">
                    <img src="${film.image}" alt="${film.title}">
                    <div class="film-overlay">
                        <div class="film-details">
                            <p><i class="fas fa-clock"></i> ${film.duration}</p>
                            <p><i class="fas fa-globe"></i> ${film.country}</p>
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

    // Update short films grid
    const shortsGrid = document.getElementById('shorts-grid');
    shortsGrid.innerHTML = festivalData.selection.shorts.map(film => `
        <div class="col-md-6 col-lg-4">
            <div class="film-card">
                <div class="film-image">
                    <img src="${film.image}" alt="${film.title}">
                    <div class="film-overlay">
                        <div class="film-details">
                            <p><i class="fas fa-clock"></i> ${film.duration}</p>
                            <p><i class="fas fa-globe"></i> ${film.country}</p>
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

    // Update footer contact info
    const contact = festivalData.contact;
    document.querySelector('.contact-info').innerHTML = `
        <li>${contact.address}</li>
        <li>${contact.city}, ${contact.country} ${contact.postalCode}</li>
        <li>Phone: ${contact.phone}</li>
        <li>Email: ${contact.email}</li>
    `;

    // Update social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks[0].href = contact.socialMedia.facebook;
    socialLinks[1].href = contact.socialMedia.instagram;
    socialLinks[2].href = contact.socialMedia.twitter;

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
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