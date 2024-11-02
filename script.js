const messageTextarea = document.getElementById('message');
const charCountDisplay = document.getElementById('charCount');

messageTextarea.addEventListener('input', () => {
    const currentLength = messageTextarea.value.length;
    if (currentLength > 200) {
        messageTextarea.value = messageTextarea.value.substring(0, 200); // Limit to 200 characters
    }
    charCountDisplay.innerText = `Maksimal ${200 - messageTextarea.value.length} karakter tersisa`;
});

const countdown = () => {
    const countDate = new Date('December 27, 2024 08:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    document.getElementById('days').innerText = Math.floor(gap / day);
    document.getElementById('hours').innerText = Math.floor((gap % day) / hour);
    document.getElementById('minutes').innerText = Math.floor((gap % hour) / minute);
    document.getElementById('seconds').innerText = Math.floor((gap % minute) / second);
};

setInterval(countdown, 1000);

const backgroundMusic = document.getElementById("backgroundMusic");
const musicControlButton = document.getElementById("musicControlButton");

window.addEventListener("load", () => {
    backgroundMusic.play();
});

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicControlButton.innerHTML = "⏸️";
    } else {
        backgroundMusic.pause();
        musicControlButton.innerHTML = "▶️";
    }
}


function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options); // 'id-ID' for Indonesian format
}
// Display comments
function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Clear existing comments
    comments.forEach(comment => {
        const commentElement = document.createElement('div');

        commentElement.innerHTML = `
                <div class="border border-solid border-gray-300 rounded-lg text-left py-6 px-7 flex flex-col justify-between animasii">
                    <div class="mb-8">
                        <p class="font-kaisei font-bold text-xl">${comment.name}</p>
                        <p class="text-base text-gray-500 pesanini">${comment.message}</p>
                    </div>

                    <div>
                        <p class="font-medium">${comment.attendance}</p>
                        <p class="text-sm text-gray-500">${formatDate(comment.createdAt)}</p>
                    </div>
                </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

// Load latest comments on page load
async function loadComments() {
    const response = await fetch('http://localhost:5000/comments/all');
    const comments = await response.json();
    displayComments(comments);
}

// Submit new comment
async function submitComment() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const attendance = document.getElementById('attendance').value;

    if (!name || !message) {
        alert('Nama dan Ucapan tidak boleh kosong');
        return;
    }

    await fetch('http://localhost:5000/comment', { // Ensure the correct endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, attendance })
    });

    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.getElementById('attendance').value = 'Hadir';

    loadComments(); // Load comments after submission
}

// Load all comments when "Lihat Semua Ucapan" is clicked
async function loadAllComments() {
    const response = await fetch('http://localhost:5000/comments/all');
    const comments = await response.json();
    displayComments(comments);
}

// Load latest comments on page load
window.onload = loadComments;