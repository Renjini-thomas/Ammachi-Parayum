document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Display user message
        displayMessage(message, 'user-message');
        userInput.value = '';

        // Send message to server
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            const data = await response.json();
            if (data.response) {
                displayMessage(data.response, 'ammachi-message');
            } else if (data.error) {
                displayMessage('Ammachi is busy. Please try again later.', 'ammachi-message');
                console.error('Error from server:', data.error);
            }
        } catch (error) {
            displayMessage('Ammachi is taking a nap. Please try again later.', 'ammachi-message');
            console.error('Error sending message:', error);
        }
    }

    function displayMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', className);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});