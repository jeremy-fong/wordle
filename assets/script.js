var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for the attempt

var gameOver = false;
var word = "SLOTH";

window.onload = function() {
    initialize();
}

function initialize() {
    // Create game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // key press for guess
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // alert(e.code);
        if("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText =  e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                currTile.innerText ="";
            }
        }
        else if (e.code == "Enter") {
            update();
            row += 1; //start new row
            col = 0; //start at 0 for new row

        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < word.length; i++) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }

    // first check, check all the correct ones
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        } 
        
        if (correct == width) {
            gameOver = true;
        }
    }

    // run again and mark which ones are present but in wrong position 
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")) {
            // Is it in the word?
             if (word.includes(letter) && letterCount[letter] > 0) {
                 currTile.classList.add("present");
                 letterCount[letter] -= 1;
             } // Not in word
             else {
                 currTile.classList.add("absent");
             }
        }
    }
}