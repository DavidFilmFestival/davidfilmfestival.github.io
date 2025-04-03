let festivalData = null;

// Fetch and load festival data
async function loadFestivalData() {
    try {
        const response = await fetch('/data/festival-data.json');
        if (!response.ok) {
            throw new Error('Failed to load festival data');
        }
        festivalData = await response.json();
        updatePageContent();
    } catch (error) {
        console.error('Error loading festival data:', error);
    }
}

// Update page content with festival data
function updatePageContent() {
    // Update contact information
    document.getElementById('contact-address').textContent = festivalData.contact.address;
    document.getElementById('contact-phone').textContent = festivalData.contact.phone;
    document.getElementById('contact-email').textContent = festivalData.contact.email;

    // Update social media links
    document.getElementById('facebook-link').href = festivalData.contact.social.facebook;
    document.getElementById('instagram-link').href = festivalData.contact.social.instagram;
    document.getElementById('twitter-link').href = festivalData.contact.social.twitter;

    // Update footer contact info
    const contactInfo = document.querySelector('.contact-info');
    contactInfo.innerHTML = `
        <li><i class="fas fa-map-marker-alt"></i> ${festivalData.contact.address}</li>
        <li><i class="fas fa-envelope"></i> ${festivalData.contact.email}</li>
        <li><i class="fas fa-phone"></i> ${festivalData.contact.phone}</li>
    `;

    // Update footer social links
    const socialLinks = document.querySelectorAll('footer .social-links a');
    socialLinks[0].href = festivalData.contact.social.facebook;
    socialLinks[1].href = festivalData.contact.social.instagram;
    socialLinks[2].href = festivalData.contact.social.twitter;

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // TODO: Replace with actual form submission
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
        });
    }
}

// Add fade-in animation to elements
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFestivalData();
    handleContactForm();
    setupAnimations();

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
}); 