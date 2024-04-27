document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json(); // This must be within try block and await should succeed

        if (response.ok) {
            // Store the token in localStorage or session
            
            localStorage.setItem('jwt', result.token);
            console.log("from localStroge",localStorage);
            console.log(localStorage)
            console.log('Login successful: ', result.message);
            window.location.href = '/client/studentDashboard.html';
            console.log('Success:', result);
        } else {
            messageElement.textContent = 'Error: ' + result.message;
            messageElement.style.color = 'red'; // Ensure it's red for errors
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Failed to login.';
        messageElement.style.color = 'red';
    }
});
