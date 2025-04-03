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
        document.querySelector('.page-header h1').textContent = "Festival News";
        document.querySelector('.page-header p').textContent = "Stay updated with the latest festival announcements and highlights.";
    }
}

// Update page content with loaded data
function updatePageContent() {
    if (!festivalData) return;

    // Update news section
    const newsContainer = document.querySelector('.news-grid');
    if (newsContainer && festivalData.news && Array.isArray(festivalData.news.articles)) {
        const newsHTML = festivalData.news.articles.map(article => `
            <div class="news-card">
                <div class="news-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p class="news-date">${formatDate(article.date)}</p>
                    <p>${article.summary}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
        `).join('');
        newsContainer.innerHTML = newsHTML;
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