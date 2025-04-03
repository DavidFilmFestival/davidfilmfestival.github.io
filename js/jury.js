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
        document.querySelector('.page-header h1').textContent = "Festival Jury";
        document.querySelector('.page-header p').textContent = "Meet our distinguished panel of judges.";
    }
}

// Update page content with loaded data
function updatePageContent() {
    if (!festivalData || !festivalData.jury) return;

    // Update page header if there's a title and description
    if (festivalData.jury.title) {
        document.querySelector('.page-header h1').textContent = festivalData.jury.title;
    }
    if (festivalData.jury.description) {
        document.querySelector('.page-header .lead').textContent = festivalData.jury.description;
    }

    // Update jury section
    const juryContainer = document.getElementById('jury-grid');
    if (juryContainer && Array.isArray(festivalData.jury.members)) {
        const juryHTML = festivalData.jury.members.map(member => `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${member.image}" class="img-fluid rounded-start h-100" alt="${member.name}" style="object-fit: cover;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${member.name}</h3>
                                <h5 class="card-subtitle mb-2 text-muted">${member.role}</h5>
                                <p class="card-text"><small class="text-muted">${member.country}</small></p>
                                <p class="card-text">${member.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        juryContainer.innerHTML = juryHTML;
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

    // Observe all sections and cards
    document.querySelectorAll('.card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}); 