// =========================================
// INTERACTION 1: Nav Button Highlights Card
// Event: click
// =========================================
const gameMap = {
    'The Last of Us II': 'the last of us ii',
    'RDR 2': 'red dead redemption 2',
    'Life is Strange': 'life is strange',
    'The Walking Dead': 'the walking dead'
};

function highlightCard(event) {
    const btn = event.currentTarget;
    const gameName = gameMap[btn.textContent.trim()];
    const allCards = document.querySelectorAll('.card');
    const allNavBtns = document.querySelectorAll('.nav-btn');

    // If already active, reset everything
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        allCards.forEach(function (card) {
            card.classList.remove('highlighted', 'dimmed');
            const img = card.querySelector('.card-img');
            img.style.filter = 'grayscale(100%)';
            img.style.transform = 'scale(1)';
        });
        return;
    }

    // Remove active from all nav buttons
    allNavBtns.forEach(function (b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // Highlight matching card, dim the rest
    allCards.forEach(function (card) {
        const img = card.querySelector('.card-img');
        if (card.getAttribute('data-game') === gameName) {
            card.classList.add('highlighted');
            card.classList.remove('dimmed');
            
            // Set inline styles to match highlight
            img.style.filter = 'grayscale(0%)';
            img.style.transform = 'scale(1.05)';
            
            // Scroll to the card smoothly
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            card.classList.add('dimmed');
            card.classList.remove('highlighted');
            
            // Reset inline styles for dimmed cards
            img.style.filter = 'grayscale(100%)';
            img.style.transform = 'scale(1)';
        }
    });
}

const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(function (btn) {
    btn.addEventListener('click', highlightCard);
});


// =========================================
// INTERACTION 2: Trailer Button Click
// Event: click
// =========================================
function handleTrailerClick(event) {
    const card = event.currentTarget.closest('.card');
    const gameName = card.querySelector('h2').textContent;
    showToast('🎬 Opening trailer for ' + gameName + '...');
}

const trailerButtons = document.querySelectorAll('.trailer-btn');
trailerButtons.forEach(function (btn) {
    btn.addEventListener('click', handleTrailerClick);
});


// =========================================
// INTERACTION 3: Details Button Click
// Event: click
// =========================================
function handleDetailsClick(event) {
    const card = event.currentTarget.closest('.card');
    const gameName = card.querySelector('h2').textContent;
    showToast('🔗 Visiting ' + gameName + ' official site...');
}

const detailsButtons = document.querySelectorAll('.details-btn');
detailsButtons.forEach(function (btn) {
    btn.addEventListener('click', handleDetailsClick);
});


// =========================================
// INTERACTION 4: Favorite Toggle
// Event: click
// =========================================
function toggleFavorite(event) {
    const btn = event.currentTarget;
    const card = btn.closest('.card');
    const gameName = card.querySelector('h2').textContent;
    const isFavorited = btn.getAttribute('data-favorited') === 'true';

    if (isFavorited) {
        btn.setAttribute('data-favorited', 'false');
        btn.textContent = '🤍';
        btn.classList.remove('favorited');
        showToast('Removed ' + gameName + ' from favorites');
    } else {
        btn.setAttribute('data-favorited', 'true');
        btn.textContent = '❤️';
        btn.classList.add('favorited');
        showToast('Added ' + gameName + ' to favorites ❤️');
    }
}

const favButtons = document.querySelectorAll('.fav-btn');
favButtons.forEach(function (btn) {
    btn.addEventListener('click', toggleFavorite);
});


// =========================================
// INTERACTION 5: Hover on Card Image
// Events: mouseenter / mouseleave
// =========================================
function handleCardEnter(event) {
    const card = event.currentTarget;
    const img = card.querySelector('.card-img');
    img.style.filter = 'grayscale(0%)';
    img.style.transform = 'scale(1.05)';
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    const img = card.querySelector('.card-img');
    // Only restore grayscale if the card isn't currently highlighted by nav
    if (!card.classList.contains('highlighted')) {
        img.style.filter = 'grayscale(100%)';
        img.style.transform = 'scale(1)';
    }
}

const allCards = document.querySelectorAll('.card');
allCards.forEach(function (card) {
    card.addEventListener('mouseenter', handleCardEnter);
    card.addEventListener('mouseleave', handleCardLeave);
});


// Toast Helper
// =========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('visible');

    setTimeout(function () {
        toast.classList.remove('visible');
        toast.classList.add('hidden');
    }, 2500);
}
