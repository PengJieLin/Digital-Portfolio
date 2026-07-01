window.addEventListener('DOMContentLoaded', (event) => {
    getVisitorCount();
});

const apiEndpoint = "https://a1lic7tac3.execute-api.us-east-2.amazonaws.com/counter"; 

function getVisitorCount() {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            document.getElementById('counter').innerText = data.count;
        })
        .catch(error => {
            console.error('Error fetching visitor counter:', error);
            document.getElementById('counter').innerText = "Err";
        });
}