
function describeBeds(bedCount) {
    switch (bedCount) {
        case 1: return 'Single';
        case 2: return 'Double';
        case 3: return 'Triple';
        case 4: return 'Quadruple';
        default: return `${bedCount} Beds`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    function closeModal() {
        document.getElementById('room-request-form').style.display = 'none';
        document.querySelector('.modal-backdrop').style.display = 'none';
        
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {  // Check if the key pressed is the Escape key
            closeModal();  // Call the closeModal function
        }
    });
});


function selectRoom(roomId) {
    document.querySelector('.modal-backdrop').style.display = 'flex'; // Show the modal backdrop
    document.getElementById('selectedRoomId').value = roomId;  // Set the room ID in the hidden input
    document.getElementById('room-request-form').style.display = 'block';  // Display the form
}
window.selectRoom = selectRoom;
window.submitRoomRequest = submitRoomRequest;

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
        loadingIndicator.style.display = 'none';
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
                <button onclick="selectRoom(${room.room_id})">Reserve This Room</button>
            `;
            container.appendChild(roomElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        container.innerHTML = '<p>Error loading rooms.</p>';
    });
});

function submitRoomRequest() {
    const roomId = document.getElementById('selectedRoomId').value;
    const passportNumber = document.getElementById('passportNumber').value;
    const city = document.getElementById('city').value;
    const token = localStorage.getItem('jwt');
    console.log('Roomid',roomId)
    console.log('passport',passportNumber)
    console.log('C',city)
    console.log('Roomid',token)

    if (!confirm('Are you sure you want to submit this room request?')) {
        return; // Stop the function if the user cancels
    }

    fetch('http://localhost:5000/students/room-request', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId, passportNumber, city })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); }); // Throws an error with server message
        }
        return response.json();
    })
    .then(result => {
        alert(result.message);
        if (result.request) {
            console.log('Request details:', result.request);
            location.reload();
        }
    })
    .catch(error => {
        console.error('Error submitting room request:', error);
        alert('Failed to submit room request: ' + error.message); // Now includes server error message
    });
}

