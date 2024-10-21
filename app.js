// Initialize Lucide icons
lucide.createIcons();

// Get the main content container
const mainContent = document.getElementById('main-content');

// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);
    });
});

// Load page content
function loadPage(page) {
    switch(page) {
        case 'home':
            renderHomePage();
            break;
        case 'report':
            renderReportPage();
            break;
        case 'feed':
            renderFeedPage();
            break;
        case 'lost-found':
            renderLostAndFoundPage();
            break;
        case 'safety-tips':
            renderSafetyTipsPage();
            break;
        case 'contact':
            renderContactPage();
            break;
        default:
            renderHomePage();
    }
}

// Render Home Page
function renderHomePage() {
    mainContent.innerHTML = `
        <div class="container">
            <h1>Welcome to Digital Neighborhood Watch</h1>
            <p>Keeping our community safe, together.</p>
            <div class="cta-buttons">
                <a href="#" class="btn btn-primary" onclick="loadPage('report')">Report Incident</a>
                <a href="#" class="btn btn-secondary" onclick="loadPage('feed')">View Reports</a>
            </div>
            <div class="notification-info">
                <h2>Real-Time Notifications</h2>
                <p>Stay informed about important updates in your neighborhood. Subscribe to receive instant alerts about incidents, lost items, and community announcements.</p>
                <button id="subscribe-alerts-btn" class="btn btn-primary">Subscribe for Alerts</button>
            </div>
        </div>
    `;
}

// Render Report Incident Page
function renderReportPage() {
    mainContent.innerHTML = `
        <div class="container">
            <h1>Report an Incident</h1>
            <form id="report-form">
                <select id="incident-type" required>
                    <option value="">Select incident type</option>
                    <option value="suspicious">Suspicious Activity</option>
                    <option value="lost">Lost Item</option>
                    <option value="emergency">Emergency</option>
                </select>
                <textarea id="description" placeholder="Describe the incident" required></textarea>
                <input type="text" id="location" placeholder="Location" required>
                <input type="file" id="image" accept="image/*">
                <button type="submit">Submit Report</button>
            </form>
        </div>
    `;

    document.getElementById('report-form').addEventListener('submit', handleReportSubmit);
}

// Handle report form submission
function handleReportSubmit(e) {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Report submitted:', {
        type: document.getElementById('incident-type').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        image: document.getElementById('image').files[0]
    });
    alert('Report submitted successfully!');
}

// Render Community Feed Page
function renderFeedPage() {
    // Mock data for incidents
    const incidents = [
        { id: 1, type: 'suspicious', title: 'Suspicious person in park', date: '2023-04-15', location: 'Central Park', description: 'A person in a black hoodie was seen loitering near the playground.', comments: 3 },
        { id: 2, type: 'lost', title: 'Lost cat', date: '2023-04-14', location: 'Maple Street', description: 'Orange tabby cat named Whiskers, last seen near 123 Maple St.', comments: 5 },
        { id: 3, type: 'emergency', title: 'Car accident', date: '2023-04-13', location: 'Main St & Oak Ave', description: 'Two-car collision at the intersection. No serious injuries reported.', comments: 8 },
    ];

    let feedHTML = `
        <div class="container">
            <h1>Community Feed</h1>
            <select id="feed-filter">
                <option value="all">All Incidents</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="lost">Lost Items</option>
                <option value="emergency">Emergencies</option>
            </select>
            <div id="incidents-list">
    `;

    incidents.forEach(incident => {
        feedHTML += `
            <div class="card incident-card" data-type="${incident.type}">
                <h2>${incident.title}</h2>
                <p><strong>Date:</strong> ${incident.date}</p>
                <p><strong>Location:</strong> ${incident.location}</p>
                <p>${incident.description}</p>
                <p>${incident.comments} comments</p>
            </div>
        `;
    });

    feedHTML += `
            </div>
        </div>
    `;

    mainContent.innerHTML = feedHTML;

    document.getElementById('feed-filter').addEventListener('change', filterFeed);
}

// Filter feed based on incident type
function filterFeed(e) {
    const filter = e.target.value;
    document.querySelectorAll('.incident-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Render Lost and Found Page
function renderLostAndFoundPage() {
    // Mock data for lost and found items
    const items = [
        { id: 1, type: 'lost', category: 'pets', title: 'Missing Dog', description: 'Golden Retriever, answers to "Max"', date: '2023-04-15', location: 'City Park' },
        { id: 2, type: 'found', category: 'electronics', title: 'Found Smartphone', description: 'iPhone 12, black case', date: '2023-04-14', location: 'Main Street Coffee Shop' },
        { id: 3, type: 'lost', category: 'jewelry', title: 'Lost Wedding Ring', description: 'Gold band with diamond', date: '2023-04-13', location: 'Beach Boardwalk' },
    ];

    let lostFoundHTML = `
        <div class="container">
            <h1>Lost & Found Board</h1>
            <select id="category-filter">
                <option value="all">All Categories</option>
                <option value="pets">Pets</option>
                <option value="electronics">Electronics</option>
                <option value="jewelry">Jewelry</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
            </select>
            <div id="items-list">
    `;

    items.forEach(item => {
        lostFoundHTML += `
            <div class="card item-card" data-category="${item.category}" data-type="${item.type}">
                <h2>${item.title}</h2>
                <p><strong>Status:</strong> ${item.type === 'lost' ? 'Lost' : 'Found'}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p>${item.description}</p>
            </div>
        `;
    });

    lostFoundHTML += `
            </div>
        </div>
    `;

    mainContent.innerHTML = lostFoundHTML;

    document.getElementById('category-filter').addEventListener('change', filterLostAndFound);
}

// Filter lost and found items based on category
function filterLostAndFound(e) {
    const filter = e.target.value;
    document.querySelectorAll('.item-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Render Safety Tips Page
function renderSafetyTipsPage() {
    const tips = [
        { id: 1, title: 'Home Security', content: 'Always lock your doors and windows, even when you are home.' },
        { id: 2, title: 'Street Safety', content: 'Be aware of your surroundings and avoid walking alone at night.' },
        { id: 3, title: 'Online Safety', content: 'Use strong, unique passwords for all your online accounts.' },
    ];

    const news = [
        { id: 1, title: 'Community Watch Meeting', date: '2023-04-20', content: 'Join us for our monthly community watch meeting at the Town Hall.' },
        { id: 2, title: 'New Streetlights Installation', date: '2023-04-25', content: 'The city will be installing new streetlights on Oak Avenue to improve night-time visibility.' },
    ];

    let safetyHTML = `
        <div class="container">
            <h1>Safety Tips and News</h1>
            <div class="safety-tips">
                <h2>Safety Tips</h2>
                ${tips.map(tip => `
                    <div class="card">
                        <h3>${tip.title}</h3>
                        <p>${tip.content}</p>
                    </div>
                `).join('')}
            </div>
            <div class="safety-news">
                <h2>Local Safety News</h2>
                ${news.map(item => `
                    <div class="card">
                        <h3>${item.title}</h3>
                        <p><strong>Date:</strong> ${item.date}</p>
                        <p>${item.content}</p>
                    </div>
                `).join('')}
            </div>
            <div class="stay-informed">
                <h2>Stay Informed</h2>
                <p>For the latest updates from local authorities, visit the official city website or follow our social media channels.</p>
            </div>
        </div>
    `;

    mainContent.innerHTML = safetyHTML;
}

// Render Contact Page
function renderContactPage() {
    mainContent.innerHTML = `
        <div class="container">
            <h1>Contact Us</h1>
            <div class="emergency-contacts">
                <h2>Emergency Hotlines</h2>
                <p><strong>Police:</strong> 911</p>
                <p><strong>Fire Department:</strong> 911</p>
                <p><strong>Ambulance:</strong> 911</p>
                <p><strong>Non-Emergency Police:</strong> 555-0123</p>
            </div>
            <form id="contact-form">
                <input type="text" id="name" placeholder="Your Name" required>
                <input type="email" id="email" placeholder="Your Email" required>
                <textarea id="message" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    `;

    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Contact form submitted:', {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    });
    alert('Message sent successfully!');
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initial page load
loadPage('home');