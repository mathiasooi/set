var selected = [];
var deck = [];
var color = ["red", "green", "purple"];
var pattern = ["filled", "dashed", "empty"];
var shape = ["squiggle", "oval", "diamond"];

function remove(arr) {
    // Stupid js doesnt have remove by value
    // python better
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
}

function cardClicked(card) {
    // Add card to selected or remove if its already inside & change box shadow
    console.log(card);
    if (selected.includes(card)) {
        remove(selected, card);
        document.getElementById("c" + String(card)).classList.remove("card-td-selected");
        return;
    }
    selected.push(card);
    document.getElementById("c" + String(card)).classList.add("card-td-selected");

    // Check if the selected are a set and then unselect them
    if (selected.length == 3) {
        for (var i = 0; i < 3; ++i) {
            var elm = document.getElementById("c" + String(selected[i]));
            elm.classList.remove("card-td-correct");
            elm.classList.remove("card-td-incorrect");
            elm.classList.remove("card-td-selected");
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
        }
        if (isSet()) {
            console.log("IS SET", selected);
            for (var i = 0; i < 3; ++i) {
                document.getElementById("c" + String(selected[i])).classList.add("card-td-correct");
            }
            // Remove cards if is set
            console.log(deck);
            toRemove = [];
            for (var i = 0; i < 3; ++i) {
                i = selected[i];
                [deck[i], deck[i + 12]] = [deck[i + 12], deck[i]];
                toRemove.push(deck[i + 12]);
            }
            remove(deck, toRemove[0], toRemove[1], toRemove[2]);
            display();
        }
        else {
            console.log("NOT SET", selected);
            for (var i = 0; i < 3; ++i) {
                document.getElementById("c" + String(selected[i])).classList.add("card-td-incorrect");
            }
        }
        selected = [];
    }
}

function isSet() {
    console.log(selected);
    var a = deck[selected[0]].members(), b = deck[selected[1]].members(), c = deck[selected[2]].members();
    for (var i = 0; i < 4; ++i) {
        if (!((a[i] != b[i] && a[i] != c[i] && b[i] != c[i]) || (a[i] == b[i] && a[i] == c[i]))) {
            return false;
        }
    }
    return true;
}

function loadDeck() {
    deck = []
    for (let i = 1; i < 4; ++i) {
        for (let j = 0; j < color.length; ++j) {
            for (let k = 0; k < pattern.length; ++k) {
                for (let x = 0; x < shape.length; ++x) {
                    deck.push(new Card(i, color[j], pattern[k], shape[x]));

                }
            }
        }
    }
}

function shuffle() {
    // Fisher-Yates shuffle
    var i = deck.length, k;
    while (i !== 0) {
        k = Math.floor(Math.random() * i);
        i--;
        [deck[i], deck[k]] = [deck[k], deck[i]];
    }
}

class Card {
    constructor(num, shape, pattern, color) {
        this.num = num;
        this.shape = shape;
        this.pattern = pattern;
        this.color = color;
    }

    members() {
        return [this.num, this.shape, this.pattern, this.color];
    }

    svg() {
        // bruh svgs are hard how to do them help
        return String(this.num + " " + this.shape + " " + this.pattern + " " + this.color);  // Gonna stay with this until i feel like doing svgs :(
    }
}

function display() {
    for (var i = 0; i < 12; ++i) {
        document.getElementById("c" + i).innerHTML = deck[i].svg();
    }
}

function main() {
    loadDeck();
    console.log("Loaded deck", deck);
    // shuffle();
    // console.log("Shuffled deck", deck);
    display();
}