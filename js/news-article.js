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
        await loadArticle();
    } catch (error) {
        console.error('Error loading festival data:', error);
    }
}

async function loadArticle() {
    if (!festivalData || !festivalData.news) return;

    // Get the article slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = 'news.html';
        return;
    }

    // Find the article in the data
    const article = festivalData.news.articles.find(a => a.slug === slug);
    if (!article) {
        window.location.href = 'news.html';
        return;
    }

    // Update page title
    document.title = `${article.title} - International Film Festival`;

    // Update breadcrumb
    document.querySelector('.article-category').textContent = article.category;

    // Update article header
    document.querySelector('.article-title').textContent = article.title;
    document.querySelector('.date-text').textContent = formatDate(article.date);
    document.querySelector('.author-text').textContent = article.author;

    // Update featured image
    const featuredImage = document.querySelector('.article-featured-image img');
    featuredImage.src = article.image;
    featuredImage.alt = article.title;

    // Update article content
    const contentContainer = document.querySelector('.article-content');
    contentContainer.innerHTML = article.content.map(block => {
        switch (block.type) {
            case 'paragraph':
                return `<p class="mb-4">${block.text}</p>`;
            case 'subheading':
                return `<h2 class="h3 mb-4">${block.text}</h2>`;
            case 'image':
                return `
                    <figure class="figure mb-4">
                        <img src="${block.url}" alt="${block.caption}" class="figure-img img-fluid rounded">
                        <figcaption class="figure-caption">${block.caption}</figcaption>
                    </figure>
                `;
            case 'list':
                return `
                    <ul class="mb-4">
                        ${block.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            default:
                return '';
        }
    }).join('');

    // Update navigation links
    const currentIndex = festivalData.news.articles.findIndex(a => a.slug === slug);
    const prevArticle = currentIndex > 0 ? festivalData.news.articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < festivalData.news.articles.length - 1 ? festivalData.news.articles[currentIndex + 1] : null;

    const prevContainer = document.querySelector('.prev-article');
    const nextContainer = document.querySelector('.next-article');

    if (prevArticle) {
        prevContainer.innerHTML = `
            <a href="news-article.html?slug=${prevArticle.slug}" class="text-decoration-none">
                <small class="d-block text-muted">Previous Article</small>
                <span class="text-dark">${prevArticle.title}</span>
            </a>
        `;
    }

    if (nextArticle) {
        nextContainer.innerHTML = `
            <a href="news-article.html?slug=${nextArticle.slug}" class="text-decoration-none">
                <small class="d-block text-muted">Next Article</small>
                <span class="text-dark">${nextArticle.title}</span>
            </a>
        `;
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

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadFestivalData); 