let deckArr = [];
let activePlaceArr = [];
let foundationPlaceArr = [];
let hasBeenDealt;
let cardsBelow = [];

const cards = document.getElementsByClassName("card");
const places = document.getElementsByClassName("place");
const Aplaces = document.getElementsByClassName("active-place");
const deckPile = document.getElementById("deck-pile");

// making the two arrays two dimensional so each nested arrray representents a "place" box.
for (let i = 0; i < 7; i++) activePlaceArr[i] = [];
for (let i = 0; i < 4; i++) foundationPlaceArr[i] = [];

for (card of cards) { // Capture the ID of the dragged card
    card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);

        cardsBelow = [];
        let nodeArray = Array.from(e.target.parentElement.children);
        let currentPosition = nodeArray.indexOf(e.target);
        console.log("current position: " + currentPosition);

        for (let i = currentPosition + 1; i < nodeArray.length; i++) {
            cardsBelow.push(e.target.parentElement.children[i]);
        } console.log(cardsBelow);
    })
}

for (place of places) { // setup the places to accept cards
    place.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    place.addEventListener("drop", (e) => {
        let draggedCardID = e.dataTransfer.getData("text/plain");
        let target = e.target;
        console.log(target);
        move(draggedCardID, target);
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
    if (hasBeenDealt) return;

    shuffleDeck();
    for (let i = 7; i > 0; i--) {
        let toBeRemoved = deckArr.splice(-i, i);
        for (let j = 0; j < toBeRemoved.length; j++) {
            activePlaceArr[j].push(toBeRemoved[j]);
        }
    }
    activePlaceArr.reverse(); // Because Aplace[0] needs to have 1 card but PlaceArr[0] has 7 cards
    populateActivePlaces();
    hasBeenDealt = true;
}

function populateActivePlaces() {
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
        }
    }

    for (card of cards) { // Capture the ID of the dragged card
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);

            cardsBelow = [];
            let nodeArray = Array.from(e.target.parentElement.children);
            let currentPosition = nodeArray.indexOf(e.target);
            console.log("current position: " + currentPosition);

            for (let i = currentPosition + 1; i < nodeArray.length; i++) {
                cardsBelow.push(e.target.parentElement.children[i]);
            } console.log(cardsBelow);
        })
    }
}


deckPile.addEventListener("click", () => {
    deal();
})

function move(cardID, target) {
    let draggedCard = document.getElementById(cardID);
    let cardRank = idToRank(cardID);
    let cardSuit = idToSuit(cardID)
    let targetRank = (target.classList.contains("card")) ? idToRank(target.parentElement.lastChild.id) : null;
    let targetSuit = (target.classList.contains("card")) ? idToSuit(target.parentElement.lastChild.id) : null;

    console.log("Card Id: " + cardID);

    if (target.classList.contains("foundation-place") || target.parentElement.classList.contains("foundation-place")) {
        console.log("Dropping on foundation.")
        if (target.classList.contains("place") && target.children.length === 0) { // when the foundation is empty
            if (cardRank === 1) {
                target.append(draggedCard);
                draggedCard.style.top = "0px";
            }
        }

        else if (target.classList.contains("card")) { // when there are other cards in the foundation
            console.log("there is a card here");
            if (cardRank === targetRank + 1 && cardSuit === targetSuit) {
                target.parentElement.append(draggedCard);
                draggedCard.style.top = "0px";
            }
        }
    }
    else {
        if (cardRank === targetRank - 1 || !targetRank) {
            let topDisplacement = 0;
            if (target.classList.contains("place")) {
                target.append(draggedCard);
                draggedCard.style.top = "0px";
                topDisplacement = 0;
                for (let i = 0; i < cardsBelow.length; i++) {
                    console.log("appending below cards");
                    target.append(cardsBelow[i]);
                    topDisplacement = 20 * (cardsBelow[i].parentElement.children.length - 1);
                    cardsBelow[i].style.top = `${topDisplacement}px`;
                }
            } else if (target.classList.contains("card")) {
                target.parentElement.append(draggedCard);
                for (let i = 0; i < cardsBelow.length; i++) {
                    console.log("appending below cards");
                    target.parentElement.append(cardsBelow[i]);
                    topDisplacement = 20 * (cardsBelow[i].parentElement.children.length - 1);
                    cardsBelow[i].style.top = `${topDisplacement}px`;
                }
                topDisplacement = 20 * (target.parentElement.children.length - cardsBelow.length - 1);
                console.log(topDisplacement);
                draggedCard.style.top = `${topDisplacement}px`;
            }
        }
    }


}


function idToRank(id) {
    let numRank;
    if (!parseInt(id)) {
        switch (true) {
            case /A/.test(id): numRank = 1; break;
            case /J/.test(id): numRank = 11; break;
            case /Q/.test(id): numRank = 12; break;
            case /K/.test(id): numRank = 13; break;
        }
    } else { numRank = parseInt(id); }
    return numRank;
}

function idToSuit(id) {
    return id[id.length - 1];
}
