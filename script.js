var selected = [false, false, false, false, false, false, false, false, false, false, false, false];
var deck = [];
var color = ["red", "green", "purple"];
var pattern = ["filled", "dashed", "empty"];
var shape = ["squiggle", "oval", "diamond"];

function cardClicked(card) {
    selected[card] = !selected[card];
    console.log(card);
    if (selected[card])
        document.getElementById("c" + String(card)).classList.add("card-td-selected");
    else
        document.getElementById("c" + String(card)).classList.remove("card-td-selected");

}

function loadDeck() {
    for (let i = 1; i < 4; ++i) {
        for (let j = 0; j < color.length; ++j) {
            for (let k = 0; k < pattern.length; ++k) {
                for (let x = 0; x < shape.length; ++x) {
                    deck.push(new Card(i, color[j], pattern[k], shape[x]));

                }
            }
        }
    }
    console.log("Loaded Deck:", deck);
}

class Card {
    constructor(num, shape, pattern, color) {
        this.num = num;
        this.shape = shape;
        this.pattern = pattern;
        this.color = color;
    }

    svg() {
        // bruh svgs are hard how to do them help
        return this.num, this.shape, this.pattern, this.color;
    }
}