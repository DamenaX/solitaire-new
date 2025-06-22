let deckArr = [];
let activePlaceArr = [];
let foundationPlaceArr = [];

const places = document.getElementsByClassName("place");
const Aplaces = document.getElementsByClassName("active-place");
const deckPile = document.getElementById("deck-pile");



// making the two arrays two dimensional so each nested arrray representents a "place" box.
for (let i = 0; i < 7; i++) activePlaceArr[i] = [];
for (let i = 0; i < 4; i++) foundationPlaceArr[i] = [];

// The loop initiates the deck (fills it with the 52 standard cards.)
function initiateDeck () {
    for (let i = 1; i <= 13; i++) {
        let rank;
        switch (i) {
            case 1: rank = "A"; break;
            case 11: rank = "J"; break;
            case 12: rank = "Q"; break;
            case 13: rank = "K"; break;
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
}; initiateDeck();


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
        console.log(toBeRemoved);
        for (let j = 0; j < toBeRemoved.length; j++) {
            console.log("length is:" + toBeRemoved.length);
            activePlaceArr[j].unshift(toBeRemoved[j]);
            let dealtCard = document.createElement("img")
            dealtCard.id = toBeRemoved[j];
            dealtCard.src = `img/${toBeRemoved[j]}.jpg`
            Aplaces[toBeRemoved.length - 1].append(dealtCard)
            topDisplacement = 20 * (Aplaces[toBeRemoved.length - 1].children.length - 1);
            dealtCard.style.top =  `${topDisplacement}px`;
        }
        
    }
    initiateDeck();
}

deckPile.addEventListener("click", () => {
    deal();
})


