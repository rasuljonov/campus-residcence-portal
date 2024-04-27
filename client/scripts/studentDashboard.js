// // Define the function directly within studentDashboard.js
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

// // Existing code that uses this function
// document.addEventListener('DOMContentLoaded', function() {
//     const token = localStorage.getItem('jwt');
//     fetch('http://localhost:5000/students/rooms', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`, 
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         const container = document.getElementById('rooms-container');
//         data.forEach(room => {
//             const roomDiv = document.createElement('div');
//             roomDiv.className = 'room';
//             roomDiv.innerHTML = `
//                 <h2>Room Number: ${room.room_number}</h2>
//                 <p>Floor: ${room.floor}</p>
//                 <p>Beds: ${describeBeds(room.number_of_beds)}</p>
//             `;
//             container.appendChild(roomDiv);
//         });
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// });

// function submitRoomRequest(roomId) {

//     const token = localStorage.getItem('jwt');
//     fetch('http://localhost:5000/students/room-request', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`, 
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ roomId })
//     })
//     .then(response => response.json())
//     .then(result => {
//         alert(result.message); // Notify user of success or failure
//         if (result.request) {
//             console.log('Request details:', result.request);
//         }
//     })
//     .catch(error => {
//         console.error('Error submitting room request:', error);
//     });
// }


document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwt');
    const container = document.getElementById('rooms-container');
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';  // Show loading indicator

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
                <button onclick="submitRoomRequest(${room.room_id})">Request This Room</button>
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
        alert('Room request submitted successfully.');
        console.log(result);
        location.reload();  // Optional: reload the page to update the room list
    })
    .catch(error => {
        console.error('Error submitting room request:', error);
        alert('Failed to submit room request.');
    });
}
