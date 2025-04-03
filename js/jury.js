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
    // Update jury grid
    const juryGrid = document.getElementById('jury-grid');
    juryGrid.innerHTML = festivalData.jury.map(member => `
        <div class="col-md-4">
            <div class="jury-card">
                <div class="jury-image">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="jury-overlay">
                        <p class="jury-bio">${member.bio}</p>
                    </div>
                </div>
                <div class="jury-info">
                    <h3 class="jury-name">${member.name}</h3>
                    <p class="jury-role">${member.role}</p>
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
    document.querySelectorAll('section, .jury-card').forEach(element => {
        observer.observe(element);
    });
}); 