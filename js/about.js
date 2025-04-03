let festivalData = null;

async function loadFestivalData() {
    try {
        // First try to load from the root path
        let response = await fetch('/data/festival-data.json');
        
        if (!response.ok) {
            // If that fails, try to construct the path based on the repository name
            const pathParts = window.location.pathname.split('/');
            const repoName = pathParts[1]; // This will be empty if served from root, or the repo name if served from GitHub Pages
            const basePath = repoName ? `/${repoName}` : '';
            response = await fetch(`${basePath}/data/festival-data.json`);
            
            if (!response.ok) {
                throw new Error('Failed to load festival data');
            }
        }
        
        festivalData = await response.json();
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
    }
}

function updatePageContent() {
    if (!festivalData || !festivalData.about) return;

    // Update about section content
    const description = document.querySelector('.about-text .description');
    if (description) {
        description.textContent = festivalData.about.description;
    }

    // Update festival details
    const detailsList = document.querySelector('.festival-details ul');
    if (detailsList && festivalData.about.details) {
        detailsList.innerHTML = festivalData.about.details
            .map(detail => `<li>${detail}</li>`)
            .join('');
    }

    // Update about image
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage && festivalData.about.image) {
        aboutImage.src = festivalData.about.image;
        aboutImage.alt = 'About the Festival';
    }

    // Update contact information in footer
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo && festivalData.contact) {
        contactInfo.innerHTML = `
            <li><i class="fas fa-map-marker-alt me-2"></i>${festivalData.contact.address}</li>
            <li><i class="fas fa-phone me-2"></i>${festivalData.contact.phone}</li>
            <li><i class="fas fa-envelope me-2"></i>${festivalData.contact.email}</li>
        `;
    }

    // Update social media links
    if (festivalData.contact.social) {
        const { facebook, instagram, twitter } = festivalData.contact.social;
        if (facebook) document.getElementById('facebook-link').href = facebook;
        if (instagram) document.getElementById('instagram-link').href = instagram;
        if (twitter) document.getElementById('twitter-link').href = twitter;
    }

    // Update copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadFestivalData();

    // Set up fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements for fade-in animation
    document.querySelectorAll('.about-content, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}); 