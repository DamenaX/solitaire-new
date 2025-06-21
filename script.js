let deckArr = [];
let activePlaceArr = [];
let foundationPlaceArr = [];

// making the two arrays two dimensional so each nested arrray representents a "place" box.
for (let i = 0; i < 7; i++) activePlaceArr[i] = [];
for (let i = 0; i < 4; i++) foundationPlaceArr[i] = [];

// The loop initiates the deck (fills it with the 52 standard cards.)
for (let i = 0; i < 13; i++) {
    let rank;
    switch (i) {
        case 0: rank = "A"; break;
        case 10: rank = "J"; break;
        case 11: rank = "Q"; break;
        case 12: rank = "K"; break;
        default: rank = i;
    }
    for (let j = 0; j < 4; j++){
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

// function for Shuffling the deck
function shuffleDeck() {
    let deckCopy = [...deckArr];
    let randUniqueIndex;
    let listOfProccessedIndex =[];

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
        let toBeRemoved = deckArr.splice(-i,i);
        for (let j = 0; j < 7; j++) {
            activePlaceArr[j].push(toBeRemoved[j]);
        }
    }
}