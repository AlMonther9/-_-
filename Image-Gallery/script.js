const galleryEl = document.getElementById('gallery');
const modal = document.getElementById('artworkModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.getElementsByClassName('prev')[0];
const nextBtn = document.getElementsByClassName('next')[0];

let artworks = [];
let currentIndex = 0;

async function fetchArtworks() {
    try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=100');
        const data = await response.json();
        artworks = data.data;
        
        artworks.forEach((artwork, index) => {
            const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`;
            const artworkEl = document.createElement('div');
            artworkEl.className = 'artwork';
            artworkEl.innerHTML = `
                <img src="${imageUrl}" alt="${artwork.title}">
                <div class="artwork-info">
                    <h3>${artwork.title}</h3>
                    <p>${artwork.artist_display}</p>
                </div>
            `;
            artworkEl.addEventListener('click', () => openModal(index));
            galleryEl.appendChild(artworkEl);
        });
    } catch (error) {
        console.error('Error fetching artworks:', error);
    }
}

function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.style.display = 'block';
}

function updateModalContent() {
    const artwork = artworks[currentIndex];
    const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    modalImg.src = imageUrl;
    captionText.innerHTML = `${artwork.title} by ${artwork.artist_display}`;
}

function closeModal() {
    modal.style.display = 'none';
}

function nextArtwork() {
    currentIndex = (currentIndex + 1) % artworks.length;
    updateModalContent();
}

function prevArtwork() {
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    updateModalContent();
}

closeBtn.onclick = closeModal;
prevBtn.onclick = prevArtwork;
nextBtn.onclick = nextArtwork;

// Close the modal when clicking outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

fetchArtworks();