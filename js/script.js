//Das sind die buttons, um das gewünschte grid zu erstellen

document.getElementById('btnlvl1').addEventListener('click', () => {
    // 2 mal 2 grid
    generateGrid(2);
});

document.getElementById('btnlvl2').addEventListener('click', () => {
    // 4 mal 4 grid
    generateGrid(4);
});

document.getElementById('btnlvl3').addEventListener('click', () => {
    // 6 mal 6 grid
    generateGrid(6);
});


//in dem array images befinden sich die pfade aller bilder
const images = [
    './Bilder/audi-logo.png',
    './Bilder/BMW_logo.png',
    './Bilder/ferrari_logo.png',
    './Bilder/lamborghini_logo.png',
    './Bilder/lotus_logo.png',
    './Bilder/maserati_logo.png',
    './Bilder/mercedes_logo.png',
    './Bilder/bentley_logo.png',
    './Bilder/porsche_logo.png',
    './Bilder/yamaha_logo.png',
    './Bilder/kawa_logo.png',
    './Bilder/ktm_logo.png',
    './Bilder/alpine_logo.png',
    './Bilder/aston_logo.png',
    './Bilder/koenigsegg_logo.png',
    './Bilder/suzuki_logo.png',
    './Bilder/aprilia_logo.png',
    './Bilder/ducati_logo.png',
];

let flippedCards = [];
let columns;


//Hier wird das grid Layout und die nötige anzahl an cards erstellt
function generateGrid(numColumns) {
    columns = numColumns;
    const gridDiv = document.getElementById('gridDiv');
    // 1fr ist eine einheit (fractional unit)
    gridDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    //Die width setzt sich aus der anzahl der columns (die mit 92px multipliziert werden)
    gridDiv.style.width = `${columns * 92 + (columns - 1) * 10}px`;

    const cards = [];

    //Hier werden die cards erstellt und ein eventlistener hinzugefügt

    for (let index = 0; index < columns * columns; index++) {
        let divElement = document.createElement('div');
        //Hier werden die ID's für die karten erstellt. math.floor() rundet ab.
        let cardId = Math.floor(index / 2);
        divElement.id = `card${cardId}`;
        divElement.classList.add('cards');
        divElement.dataset.cardId = cardId;
        gridDiv.appendChild(divElement);
        divElement.addEventListener('click', function () {
            console.log(cardId)
            flipCard(this);
            checkMatch();
        });

        cards.push(divElement);
    }
    shuffleCards(cards);

}

let matchedCards = [];

function flipCard(card) {
    //some() überprüft, ob mindestens ein element in dem array ist
    //entry ist ein element in dem array "flippedCards"

    //überprüfung, ob umgedreht werden kann
    if (flippedCards.length < 2 && !flippedCards.some(entry => entry.card === card) && !matchedCards.includes(card)) {
        const cardId = card.dataset.cardId;
        const imageIndex = cardId % (columns * columns / 2);
        const imageUrl = `url(${images[imageIndex]})`;

        //überprüfung, ob die classlist die card ehh nicht bereits enthält
        if (!card.classList.contains(card)) {
            card.style.backgroundImage = imageUrl;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.style.backgroundRepeat = 'no-repeat';
            card.style.backgroundColor = 'rgb(241, 107, 107)';

            //push() fügt einem array ein element hinzu. Hier: die card und die dazugehörige cardId
            flippedCards.push({ card, cardId });

            //setTimeout() ist ein Timer (in diesem Fall eine halbe Sekunde). Dieser sorgt dafür, dass der Benutzer die Card noch sehen kann, bevor sie sich wieder umdreht
            if (flippedCards.length === 2) {
                setTimeout(() => {
                    checkMatch();
                    checkWin();
                }, 500);
            }
        }
    }
}

//dreht die karte wieder um
function flipBack(card) {
    card.style.backgroundColor = 'rgb(241, 107, 107)';
    card.style.backgroundImage = '';
    flippedCards = [];
}


//diese funktion checkt, ob alle cards geflipped wurden und gibt einen alert zurück
function checkWin() {
    const allCards = document.querySelectorAll('.cards');
    const matchedCardsCount = matchedCards.length;

    if (matchedCardsCount === allCards.length) {

        alert('Du hast gewonnen!');

        location.reload();
    }
}


//diese funktion checkt, ob die cards zueinander passen
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.cardId === card2.cardId) {
        flippedCards.forEach(entry => matchedCards.push(entry.card));
        flippedCards = [];
    } else {
        setTimeout(() => {
            if (flippedCards.includes(card1) && flippedCards.includes(card2)) {
                flipBack(card1.card);
                flipBack(card2.card);
                flippedCards = [];
            }
        }, 500);
    }

    checkWin();
}



//Hier werden die cards vermischt
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const gridDiv = document.getElementById('gridDiv');
    gridDiv.innerHTML = '';

    for (const card of cards) {
        //appendChild hängt dem gridDiv hier eine card dazu
        gridDiv.appendChild(card);
    }
}