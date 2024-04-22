// Define the function directly within studentDashboard.js
function describeBeds(bedCount) {
    switch (bedCount) {
        case 1:
            return 'Single';
        case 2:
            return 'Double';
        case 3:
            return 'Triple';
        case 4:
            return 'Quadruple';
        default:
            return `${bedCount} Beds`; // Handles cases where bed count is above 4
    }
}

// Existing code that uses this function
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/students/rooms', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcxMzcyMzcyOCwiZXhwIjoxNzEzNzI3MzI4fQ.CFm-Ek6CkCDIOHHmYYhi0SugocSEmhQPNp2_Iwb9e_U', // Replace YOUR_JWT_TOKEN with a valid token
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('rooms-container');
        data.forEach(room => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room';
            roomDiv.innerHTML = `
                <h2>Room Number: ${room.room_number}</h2>
                <p>Floor: ${room.floor}</p>
                <p>Beds: ${describeBeds(room.number_of_beds)}</p>
            `;
            container.appendChild(roomDiv);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
