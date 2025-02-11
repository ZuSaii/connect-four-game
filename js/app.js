const $gameBoard = document.querySelector(".game-board");
const $columns = document.querySelectorAll(".columns")
const $cells = document.querySelectorAll(".cells")

let currentPlayer = "red"
let gameGridBoard = [
    [""], [""], [""], [""], [""], [""], [""],
    [""], [""], [""], [""], [""], [""], [""],
    [""], [""], [""], [""], [""], [""], [""],
    [""], [""], [""], [""], [""], [""], [""],
    [""], [""], [""], [""], [""], [""], [""],
    [""], [""], [""], [""], [""], [""], [""],
]


$cells.forEach(function (cell) {
    cell.innerHTML = ""
})

$cells.forEach(function ($cell) {

    const dataX = $cell.getAttribute("data-x")
    const dataY = $cell.getAttribute("data-y")

    function checkWin(gridBoard) {
        let result = 0

        for (let i = 0; i < 4; i++) {
            if (gridBoard[dataX+i][dataY] === currentPlayer) {
                result++;
            }
            if (result = 4) {
                console.log("gagner en bien")
                return true
            }
        }

        for (let col = 0; col < 7 ; col++)
        for (let row = 0; row <= 3; row++) {
            if (
                gridBoard[row][col] !== "" &&
                gridBoard[row][col] === gridBoard[row][col + 1] &&
                gridBoard[row][col] === gridBoard[row][col + 2] &&
                gridBoard[row][col] === gridBoard[row][col + 3]
            ) {
                return true;
            }
        }

        // Vérifier la diagonale principale
        if (
            gridBoard[0][0] !== "" &&
            gridBoard[0][0] === gridBoard[1][1] &&
            gridBoard[1][1] === gridBoard[2][2] &&
            gridBoard[2][2] === gridBoard[3][3]
        ) {
            // return true;
        }

        // Vérifier la diagonale secondaire
        if (
            gridBoard[0][3] !== "" &&
            gridBoard[0][3] === gridBoard[1][2] &&
            gridBoard[1][2] === gridBoard[2][1] &&
            gridBoard[2][1] === gridBoard[3][0]
        ) {
            // return true;
        }

        return false;
    }

    // i5--drop 63 72 23 362

    $cell.addEventListener("click", function (event) {

        gameGridBoard[dataY][dataX] = currentPlayer

        console.log(gameGridBoard)

        // const winCheck = checkWin(gameGridBoard)

        console.log("oe")
        if ($cell.hasChildNodes() === false)
            if (currentPlayer === "red") {
                $cell.classList.add("red")
                currentPlayer = "yellow"
                if (checkWin(gameGridBoard) === true) {
                    console.log("Bien jouer au rouge")
                }
            } else {
                $cell.classList.add("yellow")
                currentPlayer = "red"
                if (checkWin(gameGridBoard) === true) {
                    console.log("bien jouer au rouge")
                }
            }

        if (winCheck) {
            console.log(currentPlayer)
        }
    })
})


