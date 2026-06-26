
window.addEventListener('DOMContentLoaded', (event) => {
    getVisitorCount();
});

const apiEndpoint = 'YOUR_API_GATEWAY_URL_HERE'; 

function getVisitorCount() {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Adjust data.count based on how your Lambda function returns the JSON
            document.getElementById('counter').innerText = data.count;
        })
        .catch(error => {
            console.error('Error fetching visitor counter:', error);
            document.getElementById('counter').innerText = "Err";
        });
}