const $gameBoard = document.querySelector(".game-board");
const $columns = document.querySelectorAll(".columns")
const $cells = document.querySelectorAll(".cells")
const $time = document.querySelector(".time")
const $homeContainer = document.querySelector(".home-container")
const $bottom = document.querySelector(".bottom")
const $header = document.querySelector("header")
const $homeButtonVs = document.querySelector(".home-button-vs")
const $homeButtonRules = document.querySelector(".home-button-rules")
const $middlePage = document.querySelector(".middle-page")
const $headerButtonMenu = document.querySelector(".header-button-menu")
const $rulesMenuCheck = document.querySelector(".rules-menu-check")
const $rulesMenu = document.querySelector(".rules-menu")
const $headerButtonRestart = document.querySelector(".header-button-restart")

let locked = false
let boucle
let currentPlayer = "red"
let gameGridBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]

$homeButtonVs.addEventListener("click", function() {
    $homeContainer.classList.add("hidden")
    $header.classList.remove("hidden")
    $middlePage.classList.remove("hidden")
    $bottom.classList.remove("hidden")
})

$headerButtonMenu.addEventListener("click", function() {
    $homeContainer.classList.remove("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $bottom.classList.add("hidden")
})

$homeButtonRules.addEventListener("click", function() {
    $rulesMenu.classList.remove("hidden")
    $homeContainer.classList.add("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $bottom.classList.add("hidden")
})

$rulesMenuCheck.addEventListener("click", function() {
    $homeContainer.classList.remove("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $bottom.classList.add("hidden")
    $rulesMenu.classList.add("hidden")
})

function timerBoucle() {
    let temps = 20
    $time.textContent = `${temps}s`

    let boucle = setInterval(() => {
        temps--
        $time.textContent = `${temps}s`
        if (temps === 0) {
            if(currentPlayer === "red") {
                currentPlayer === ""
            } else if (currentPlayer === "yellow") {
                currentPlayer === "red"
            }
            timerBoucle()
        }
    }, 1000) 
}

setInterval(timerBoucle(), 40000)

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
            for (let y = 0; y < 3; y++) {
                if (
                    gridBoard[y][x] !== "" &&
                    gridBoard[y][x] === gridBoard[y + 1][x - 1] &&
                    gridBoard[y][x] === gridBoard[y + 2][x - 2] &&
                    gridBoard[y][x] === gridBoard[y + 3][x - 3]
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

        // }
    })
})


