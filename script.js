const cards = document.getElementsByClassName("card");
const places = document.getElementsByClassName("place");

//Save the ID of the dragged card when dragging starts on each card
for (card of cards) { 
    card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    })
}


// Prevent default behaviour when drag is over and append the dragged card when dropped.
for (place of places) {
    place.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    place.addEventListener("drop", (e) => {
        console.log("there");
        let draggedCard = e.dataTransfer.getData("text/plain");
        if (e.target.classList.contains("place")) {
            e.target.append(document.getElementById(draggedCard));
        }
    })
}