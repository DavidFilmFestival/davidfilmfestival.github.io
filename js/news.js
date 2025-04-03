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
        document.querySelector('.page-header h1').textContent = "Latest News";
        document.querySelector('.page-header p').textContent = "Stay updated with festival announcements and highlights.";
    }
}

// Update page content with loaded data
function updatePageContent() {
    if (!festivalData || !festivalData.news) return;

    // Update page header if there's a title
    if (festivalData.news.title) {
        document.querySelector('.page-header h1').textContent = festivalData.news.title;
    }

    // Update news section
    const newsContainer = document.getElementById('news-grid');
    if (newsContainer && Array.isArray(festivalData.news.articles)) {
        const newsHTML = festivalData.news.articles.map(article => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <div class="mb-2">
                            <span class="badge bg-secondary">${article.category}</span>
                        </div>
                        <h3 class="card-title h4">${article.title}</h3>
                        <div class="article-meta mb-3">
                            <small class="text-muted">
                                <i class="far fa-calendar me-1"></i> ${formatDate(article.date)} |
                                <i class="far fa-user me-1"></i> ${article.author}
                            </small>
                        </div>
                        <p class="card-text">${article.summary}</p>
                        <a href="news-article.html?slug=${article.slug}" class="btn btn-outline-primary">Read More</a>
                    </div>
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

    // Observe all cards
    document.querySelectorAll('.card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}); 