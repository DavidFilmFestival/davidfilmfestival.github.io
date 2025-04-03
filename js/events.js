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
        document.querySelector('.page-header h1').textContent = "Festival Events";
        document.querySelector('.page-header p').textContent = "Explore our exciting lineup of events.";
    }
}

function updatePageContent() {
    if (!festivalData || !festivalData.events) return;

    // Update page header if there's a title
    if (festivalData.events.title) {
        document.querySelector('.page-header h1').textContent = festivalData.events.title;
    }

    // Update events section
    const eventsContainer = document.getElementById('events-grid');
    if (eventsContainer && Array.isArray(festivalData.events.categories)) {
        const eventsHTML = festivalData.events.categories.map(category => `
            <div class="col-12 mb-5">
                <h2 class="section-title mb-4">${category.name}</h2>
                <div class="row g-4">
                    ${category.events.map(event => `
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h3 class="card-title">${event.title}</h3>
                                    <div class="event-details mb-3">
                                        <p class="mb-2"><i class="far fa-calendar"></i> ${event.dates}</p>
                                        <p class="mb-2"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                                    </div>
                                    <p class="card-text">${event.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        eventsContainer.innerHTML = eventsHTML;
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