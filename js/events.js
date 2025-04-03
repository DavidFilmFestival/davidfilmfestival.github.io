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
    // Update events timeline
    const eventsTimeline = document.getElementById('events-timeline');
    eventsTimeline.innerHTML = festivalData.events.map((event, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-content">
                <div class="event-card">
                    <img src="${event.image}" alt="${event.title}" class="event-image">
                    <div class="event-info">
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-details">
                            <p class="event-date"><i class="far fa-calendar"></i> ${formatDate(event.date)}</p>
                            <p class="event-time"><i class="far fa-clock"></i> ${event.time}</p>
                            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        </div>
                        <p class="event-description">${event.description}</p>
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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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

    // Observe all sections and timeline items
    document.querySelectorAll('section, .timeline-item').forEach(element => {
        observer.observe(element);
    });
}); 