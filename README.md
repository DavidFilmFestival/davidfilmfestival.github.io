# International Film Festival Website

A modern, responsive website for an international film festival, built with HTML, CSS, and JavaScript. The website features dynamic content loading, smooth animations, and a mobile-friendly design.

## 🌟 Features

- Responsive design that works on all devices
- Dynamic content loading from JSON data
- Interactive film cards with hover effects
- Festival schedule with timeline view
- Contact form with validation
- Google Maps integration
- Smooth scrolling and animations
- Mobile-friendly navigation menu

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.2
- Font Awesome 6.5.1
- Google Fonts (Playfair Display & Inter)

## 📁 Project Structure

```
your-repo-name/
├── index.html
├── data/
│   └── festival-data.json
├── js/
│   ├── main.js
│   └── contact.js
├── css/
│   ├── style.css
│   └── contact.css
└── images/
    ├── films/
    ├── jury/
    ├── awards/
    ├── news/
    └── about/
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/your-repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Open `index.html` in your web browser or use a local server.

## 📝 Content Management

All website content is managed through `data/festival-data.json`. You can easily update:
- Festival information
- Featured films
- Schedule
- Jury members
- Awards
- News articles
- Contact information

## 🖼️ Images

Replace the placeholder images in the following directories with your own:
- `images/films/` - Film posters and stills
- `images/jury/` - Jury member photos
- `images/awards/` - Award images
- `images/news/` - News article images
- `images/about/` - Festival images

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-friendly navigation
- Responsive grid layouts
- Flexible image handling
- Touch-friendly interactions

## 🌐 Deployment

This website is designed to be easily deployed to GitHub Pages:

1. Create a new repository on GitHub with your chosen name (e.g., 'home', 'festival', etc.)
2. Push your code to the repository
3. Go to Settings > Pages
4. Select your main branch as the source
5. Your site will be available at: `https://YOUR_USERNAME.github.io/your-repo-name/`

> Note: Replace 'your-repo-name' with whatever name you chose for your repository (e.g., 'home')

## 🔄 Updates and Maintenance

To update the website content:
1. Edit the `data/festival-data.json` file
2. Update images in their respective directories
3. Push changes to GitHub
4. GitHub Pages will automatically update

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact us through the website's contact form.

## Project Structure

```
film_website/
├── css/
│   ├── style.css
│   ├── news.css
│   └── awards.css
├── js/
│   ├── news.js
│   ├── news-article.js
│   ├── jury.js
│   ├── events.js
│   ├── awards.js
│   └── selection.js
├── data/
│   └── festival-data.json
├── images/
│   ├── films/
│   ├── jury/
│   ├── awards/
│   ├── news/
│   └── about/
├── index.html
├── news.html
├── news-article.html
├── jury.html
├── events.html
├── awards.html
├── selection.html
├── about.html
└── contact.html
```

## Data Management

The website's content is managed through the `data/festival-data.json` file. Here's how to update dISFFerent sections:

### News Articles
To add or update news articles, modify the `news.articles` array in festival-data.json. Each article should follow this structure:
```json
{
    "title": "Article Title",
    "date": "YYYY-MM-DD",
    "summary": "Brief summary of the article",
    "image": "path/to/image.jpg",
    "slug": "article-title-slug",
    "author": "Author Name",
    "category": "Article Category",
    "content": [
        {
            "type": "paragraph",
            "text": "Paragraph text"
        },
        {
            "type": "subheading",
            "text": "Subheading text"
        },
        {
            "type": "image",
            "url": "path/to/image.jpg",
            "caption": "Image caption"
        },
        {
            "type": "list",
            "items": [
                "List item 1",
                "List item 2"
            ]
        }
    ]
}
```

### Featured Films
Update the `featured_films.films` array with film information:
```json
{
    "title": "Film Title",
    "director": "Director Name",
    "country": "Country of Origin",
    "duration": "Duration in minutes",
    "category": "Film Category",
    "description": "Brief film description",
    "image": "path/to/film-image.jpg"
}
```

### Jury Members
Modify the `jury.members` array for jury information:
```json
{
    "name": "Jury Member Name",
    "role": "Role in Jury",
    "country": "Country",
    "bio": "Brief biography",
    "image": "path/to/jury-member-image.jpg"
}
```

### Events
Update the `events.categories` array to organize events by category:
```json
{
    "name": "Category Name",
    "events": [
        {
            "title": "Event Title",
            "location": "Event Location",
            "dates": "Event Dates",
            "description": "Event description"
        }
    ]
}
```

### Awards
Modify the `awards.categories` array for award information:
```json
{
    "name": "Award Category",
    "description": "Award description",
    "image": "path/to/award-image.jpg"
}
```

### Contact Information
Update the `contact` section with current contact details:
```json
{
    "address": "Full Address",
    "phone": "Phone Number",
    "email": "Email Address",
    "social": {
        "facebook": "Facebook URL",
        "instagram": "Instagram URL",
        "twitter": "Twitter URL"
    }
}
```

## Image Requirements

1. All images should be optimized for web use
2. Recommended sizes:
   - News article featured images: 1200x800px
   - Film posters: 800x1200px
   - Jury member photos: 600x800px
   - Award images: 800x800px
   - Event images: 1200x800px

3. Image formats:
   - Use .jpg for photographs
   - Use .png for logos and graphics with transparency
   - Use .webp for optimized web images (with fallbacks)

4. File naming convention:
   - Use lowercase letters
   - Replace spaces with hyphens
   - Include descriptive terms
   - Example: `festival-opening-ceremony-2025.jpg`

## Development

1. Clone the repository
2. Open index.html in a web browser
3. Make changes to HTML, CSS, or JavaScript files
4. Update festival-data.json with new content
5. Test all pages and functionality
6. Commit and push changes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

- Bootstrap 5.3.2
- Font Awesome 6.5.1
- Google Fonts (Playfair Display, Inter) 