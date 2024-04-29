
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
            return `${bedCount} Beds`; 
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwt');
    const container = document.getElementById('rooms-container');
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block'; 

    fetch('http://localhost:5000/students/rooms', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        loadingIndicator.style.display = 'none';  // Hide loading indicator
        if (!response.ok) throw new Error('Failed to load rooms');
        return response.json();
    })
    .then(rooms => {
        rooms.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room';
            roomElement.innerHTML = `
            <h2>Room Number: ${room.room_number}</h2>
               <p>Floor: ${room.floor}</p>
               <p>Beds: ${describeBeds(room.number_of_beds)}</p>
                <button onclick="submitRoomRequest(${room.room_id})">Reserve This Room</button>
            `;
            container.appendChild(roomElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        container.innerHTML = '<p>Error loading rooms.</p>';
    });
});


function submitRoomRequest(roomId) {

    const token = localStorage.getItem('jwt');
    fetch('http://localhost:5000/students/room-request', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
    })

    .then(response => {
        if (!response.ok) throw new Error('Failed to submit room request');
        return response.json();
    })
    .then(result => {
        // alert('Room request submitted successfully.');
        message
        console.log(result);
        location.reload();  
    })
    .catch(error => {
        console.error('Error submitting room request:', error);
        alert('Failed to submit room request.');
    });
}
