const $gameBoard = document.querySelector(".game-board");
const $columns = document.querySelectorAll(".columns")
const $cells = document.querySelectorAll(".cells")

let currentPlayer = "red"
let gameGridBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]


$cells.forEach(function (cell) {
    cell.innerHTML = ""
})

$cells.forEach(function ($cell) {
    function checkWin(gridBoard) {

        for (let x = 0; x < 6; x++) {
            for (let y = 0; y <= 5; y++) {
                if (
                    gridBoard[y][x] !== "" &&
                    gridBoard[y][x] === gridBoard[y][x + 1] &&
                    gridBoard[y][x] === gridBoard[y][x + 2] &&
                    gridBoard[y][x] === gridBoard[y][x + 3]
                ) {
                    return true;
                }
            }
        }

        for (let x = 0; x < 6; x++) {
            for (let y = 0; y <= 2; y++) {
                if (
                    gridBoard[y][x] !== "" &&
                    gridBoard[y][x] === gridBoard[y + 1][x] &&
                    gridBoard[y][x] === gridBoard[y + 2][x] &&
                    gridBoard[y][x] === gridBoard[y + 3][x]
                ) {
                    return true;
                }
            }
        }

        for (let x = 0; x <= 3; x++) {
            for (let y = 0; y <= 2; y++) {
                if (
                    gridBoard[y][x] !== "" &&
                    gridBoard[y][x] === gridBoard[y + 1][x + 1] &&
                    gridBoard[y][x] === gridBoard[y + 2][x + 2] &&
                    gridBoard[y][x] === gridBoard[y + 3][x + 3]
                ) {
                    return true;
                }
            }
        }

        for (let x = 3; x < 6; x++) {
            for (let y = 0; y <= 2; y++) {
                if (
                    gridBoard[y][x] !== "" &&
                    gridBoard[y][x] === gridBoard[y - 1][x - 1] &&
                    gridBoard[y][x] === gridBoard[y - 2][x - 2] &&
                    gridBoard[y][x] === gridBoard[y - 3][x - 3]
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    $cell.addEventListener("click", function (event) {

        const dataX = $cell.getAttribute("data-x")
        const dataY = $cell.getAttribute("data-y")

        console.log(gameGridBoard)

        function dropPions(index) {
            for (let i = 5; i >= 0; i--) {
                if (gameGridBoard[i][index] === "") {
                    gameGridBoard[i][index] = currentPlayer
                    return [i, index]
                } else {
                    continue
                }
            }
        }
        const location = dropPions(dataX)
            const y = location[0]
            const x = location[1]
            const $selectedCell = document.querySelector(`.cells[data-x="${location[1]}"][data-y="${location[0]}"]`)
            let selectedCell = $selectedCell
        // const winCheck = checkWin(gameGridBoard)
        if (currentPlayer === "red") {
            selectedCell.classList.add("red")
            currentPlayer = "yellow"
            if (checkWin(gameGridBoard) === true) {
                console.log("Bien jouer au rouge")
            }
        } else {
            selectedCell.classList.add("yellow")
            currentPlayer = "red"
            if (checkWin(gameGridBoard) === true) {
                console.log("bien jouer au jaune")
             }
        }

        // if (winCheck) {
        //     console.log(currentPlayer)
        // }
    })
})


