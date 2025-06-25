let deckArr = [];
let activePlaceArr = [];
let foundationPlaceArr = [];

const cards = document.getElementsByClassName("card");
const places = document.getElementsByClassName("place");
const Aplaces = document.getElementsByClassName("active-place");
const deckPile = document.getElementById("deck-pile");

// making the two arrays two dimensional so each nested arrray representents a "place" box.
for (let i = 0; i < 7; i++) activePlaceArr[i] = [];
for (let i = 0; i < 4; i++) foundationPlaceArr[i] = [];

for (place of places) { // initiate the places to accept cards
    place.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    place.addEventListener("drop", (e) => {
        let topDisplacement = 0;


        let draggedCard = document.getElementById(e.dataTransfer.getData("text/plain"));
        if (e.target.classList.contains("place")) {
            e.target.append(draggedCard);
            topDisplacement = 0;
        } else if (e.target.classList.contains("card")) {
            e.target.parentElement.append(draggedCard);
            topDisplacement = 20 * (e.target.parentElement.children.length - 1);
            console.log(topDisplacement);
            draggedCard.style.top =  `${topDisplacement}px`;
        }
        draggedCard.style.top =  `${topDisplacement}px`;
    })
}


// The loop initiates the deck (fills it with the 52 standard cards.)
function initiateDeck() {
    for (let i = 1; i <= 13; i++) {
        let rank;
        switch (i) {
            case 1: rank = "A"; break;
            case 11: rank = "J"; break;
            case 12: rank = "Q"; break;
            case 13: rank = "K"; break;
            default: rank = i;
        }
        for (let j = 0; j < 4; j++) {
            let suit;
            switch (j) {
                case 0: suit = "H"; break;
                case 1: suit = "D"; break;
                case 2: suit = "S"; break;
                case 3: suit = "C"; break;
            }
            deckArr.push(`${rank}${suit}`);
        }
    }
}; initiateDeck();


// function for Shuffling the deck
function shuffleDeck() {
    let deckCopy = [...deckArr];
    let randUniqueIndex;
    let listOfProccessedIndex = [];

    for (let i = 0; i < deckArr.length; i++) {
        generateUniqueIndex();
        deckArr[i] = deckCopy[randUniqueIndex];
    }

    function isIndexUnique(randIndex) {
        if (listOfProccessedIndex.indexOf(randIndex) === -1) {
            listOfProccessedIndex.push(randIndex);
            return true;
        }
        else {
            return false;
        }
    }

    function generateUniqueIndex() {
        do {
            randUniqueIndex = Math.floor(Math.random() * deckCopy.length);
        } while (!isIndexUnique(randUniqueIndex))

        return randUniqueIndex;
    }

}

function deal() {
    shuffleDeck();
    for (let i = 7; i > 0; i--) {
        let toBeRemoved = deckArr.splice(-i, i);
        for (let j = 0; j < toBeRemoved.length; j++) {
            activePlaceArr[j].push(toBeRemoved[j]);
        }
    }
    activePlaceArr.reverse();
    populateActivePlace();
    initiateDeck();
}

function populateActivePlace() {
    let activePlaceArrCopy = activePlaceArr;
    for (let i = 0; i < activePlaceArrCopy.length; i++) {
        for (let j = 0; j < activePlaceArrCopy[i].length; j++) {
            let dealtCard = document.createElement("img");
            dealtCard.id = activePlaceArrCopy[i][j];
            dealtCard.classList.add("card");
            dealtCard.setAttribute("draggable", "true");
            dealtCard.src = `img/${activePlaceArrCopy[i][j]}.jpg`;

            Aplaces[i].append(dealtCard);
            topDisplacement = 20 * (Aplaces[i].children.length - 1);
            dealtCard.style.top = `${topDisplacement}px`;

            for (card of cards) { // Capture the ID of the dragged card
                card.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", e.target.id);
                })
            }
        }
    }

}


deckPile.addEventListener("click", () => {
    deal();
})

function move() {

}

