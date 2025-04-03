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
        document.querySelector('.page-header h1').textContent = "About the Festival";
        document.querySelector('.page-header p').textContent = "Celebrating the art of cinema and fostering creativity in filmmaking";
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

    // Observe all sections and content blocks
    document.querySelectorAll('.about-content, .about-image').forEach(element => {
        observer.observe(element);
    });
}); 