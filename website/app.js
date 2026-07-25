/**
 * @file app.js
 * @description Client-side script for the Digital Portfolio website.
 * Manages active navigation link highlighting on scroll and fetches the dynamic visitor counter from AWS API Gateway.
 */

window.addEventListener('DOMContentLoaded', () => {
    getVisitorCount();
    initNavHighlight();
});

/**
 * AWS API Gateway endpoint URL routing GET requests to the DynamoDB counter Lambda function.
 * @type {string}
 */
const apiEndpoint = "https://a1lic7tac3.execute-api.us-east-2.amazonaws.com/counter";

/**
 * Asynchronously fetches the updated visitor count from the backend API and updates the DOM.
 * Includes graceful UI degradation to indicate an error state if the fetch fails.
 *
 * @async
 * @function getVisitorCount
 * @returns {Promise<void>}
 */
function getVisitorCount() {
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const counterElement = document.getElementById('counter');
            if (counterElement && data.count !== undefined) {
                counterElement.innerText = data.count.toLocaleString();
            }
        })
        .catch(error => {
            console.error('Failed to fetch visitor count:', error);
            const counterElement = document.getElementById('counter');
            if (counterElement) {
                counterElement.innerText = "Unavailable";
            }
        });
}

/**
 * Initializes IntersectionObserver to highlight navigation links dynamically as sections scroll into view.
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}