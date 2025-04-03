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
        document.querySelector('.page-header h1').textContent = "Festival Awards";
        document.querySelector('.page-header p').textContent = "Celebrating excellence in filmmaking.";
    }
}
// Update page content with loaded data
function updatePageContent() {
    // Update awards grid
    const awardsGrid = document.getElementById('awards-grid');
    awardsGrid.innerHTML = festivalData.awards.map(award => `
        <div class="col-md-6">
            <div class="award-card">
                <div class="award-image">
                    <img src="${award.image}" alt="${award.name}">
                </div>
                <div class="award-content">
                    <div class="award-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h3 class="award-name">${award.name}</h3>
                    <p class="award-category">${award.category}</p>
                    <p class="award-description">${award.description}</p>
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

    // Observe all sections and award cards
    document.querySelectorAll('section, .award-card').forEach(element => {
        observer.observe(element);
    });
}); 