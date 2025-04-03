// Load festival data
let festivalData = null;

async function loadFestivalData() {
    try {
        const response = await fetch('/data/festival-data.json');
        festivalData = await response.json();
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
    }
}

// Update page content with loaded data
function updatePageContent() {
    // Update films grid
    const filmsGrid = document.getElementById('films-grid');
    filmsGrid.innerHTML = festivalData.films.items.map(film => `
        <div class="col-md-4">
            <div class="card film-card">
                <img src="${film.image}" class="card-img-top" alt="${film.title}">
                <div class="card-body">
                    <h5 class="card-title">${film.title}</h5>
                    <p class="card-text text-muted">${film.director}</p>
                    <p class="card-text"><small class="text-muted">${film.category} • ${film.duration}</small></p>
                    <p class="card-text">${film.description}</p>
                    <a href="#" class="btn btn-outline-primary w-100">Learn More</a>
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

    // Observe all sections and cards
    document.querySelectorAll('section, .film-card').forEach(element => {
        observer.observe(element);
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