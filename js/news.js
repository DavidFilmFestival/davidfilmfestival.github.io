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
    // Update news grid
    const newsGrid = document.getElementById('news-grid');
    newsGrid.innerHTML = festivalData.news.map(news => `
        <div class="col-md-6 col-lg-4">
            <div class="card news-card h-100">
                <img src="${news.image}" class="card-img-top" alt="${news.title}">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text text-muted">${formatDate(news.date)}</p>
                    <p class="card-text">${news.summary}</p>
                    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newsModal${news.id}">
                        Read More
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Modal for full news content -->
        <div class="modal fade" id="newsModal${news.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${news.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${news.image}" class="img-fluid mb-3" alt="${news.title}">
                        <p class="text-muted">${formatDate(news.date)}</p>
                        <p>${news.content}</p>
                    </div>
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

// Format date to a more readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
    document.querySelectorAll('section, .news-card').forEach(element => {
        observer.observe(element);
    });
}); 