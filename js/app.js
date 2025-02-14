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
const $footer = document.querySelector("footer")
const $timer = document.querySelector(".timer")
const $playerTurn = document.querySelector(".player-turn")
const $timerPlay = document.querySelector(".timer-play")
const $countPointsRed = document.querySelector(".count-points-red")
const $countPointsYellow = document.querySelector(".count-points-yellow")
const $pauseMenu = document.querySelector(".pause-menu-container")

$playerTurn.textContent = `PLAYER RED'S`
$time.textContent = "Start"
let start = 0
let countRed = 0
let countYellow = 0
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

document.onkeydown = function(e) {
    e = e || window.Event
    let isEscape = false
    if ("key" in e) {
        isEscape = (e.key === "Escape" || e.key === "Esc");
    } else {
        isEscape = (e.keyCode === 27);
    }
    if (isEscape) {
        $pauseMenu.classList.remove("hidden")
    }
};

$homeButtonVs.addEventListener("click", function () {
    $homeContainer.classList.add("hidden")
    $header.classList.remove("hidden")
    $middlePage.classList.remove("hidden")
    $footer.classList.remove("hidden")
})

$headerButtonMenu.addEventListener("click", function () {
    $homeContainer.classList.remove("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $footer.classList.add("hidden")
})

$homeButtonRules.addEventListener("click", function () {
    $rulesMenu.classList.remove("hidden")
    $homeContainer.classList.add("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $footer.classList.add("hidden")
})

$rulesMenuCheck.addEventListener("click", function () {
    $homeContainer.classList.remove("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $footer.classList.add("hidden")
    $rulesMenu.classList.add("hidden")
})

function timerBoucle() {
    let temps = 30
    $time.textContent = `${temps}s`

    boucle = setInterval(() => {
        temps--
        $time.textContent = `${temps}s`

        if (temps === 0) {
            clearInterval(boucle)
            if (currentPlayer === "red") {
                currentPlayer = "yellow"
                clearInterval(boucle)
                countYellow++
                $countPointsYellow.textContent = `${countYellow}`
                $footer.classList.add("yellow")
                $timer.classList.add("white")
                $time.classList.add("black")
                $playerTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerTurn.textContent = "PLAYER YELLOW"
                $time.textContent = "WINS"

            } else if (currentPlayer === "yellow") {
                currentPlayer = "red"
                clearInterval(boucle)
                countRed++
                $countPointsRed.textContent = `${countRed}`
                $footer.classList.add("red")
                $timer.classList.add("white")
                $time.classList.add("black")
                $playerTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerTurn.textContent = "PLAYER RED"
                $time.textContent = "WINS"
            }
        }
    }, 1000)
}



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

        for (let x = 3; x < 7; x++) {
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

    function turnToPlay() {
        if (currentPlayer === "red") {
            $timer.classList.add("red")
            $timer.classList.remove("yellow")
            $timer.classList.remove("white")
            $playerTurn.textContent = `PLAYER RED'S TURN`
            clearInterval(boucle)
            timerBoucle()
        } else if (currentPlayer === "yellow") {
            $timer.classList.add("yellow")
            $timer.classList.remove("white")
            $timer.classList.remove("red")
            $playerTurn.textContent = `PLAYER YELLOW'S TURN`
            clearInterval(boucle)
            timerBoucle()
        }
    }

    $cell.addEventListener("click", function (event) {
        if (start === 0) {
            setInterval(timerBoucle(), 60000)
            start++
        }
        start++

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
            turnToPlay()
            if (checkWin(gameGridBoard) === true) {
                currentPlayer = "red"
                clearInterval(boucle)
                countRed++
                $countPointsRed.textContent = `${countRed}`
                $footer.classList.add("red")
                $timer.classList.add("white")
                $time.classList.add("black")
                $playerTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerTurn.textContent = "PLAYER RED"
                $time.textContent = "WINS"
            }
        } else {
            selectedCell.classList.add("yellow")
            currentPlayer = "red"
            turnToPlay()
            if (checkWin(gameGridBoard) === true) {
                currentPlayer = "yellow"
                clearInterval(boucle)
                countYellow++
                $countPointsYellow.textContent = `${countYellow}`
                $footer.classList.add("yellow")
                $timer.classList.add("white")
                $time.classList.add("black")
                $playerTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerTurn.textContent = "PLAYER YELLOW"
                $time.textContent = "WINS"
            }
        }
    })
})


$timerPlay.addEventListener("click", function () {
    $playerTurn.textContent = `PLAYER RED'S`
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.add("red")
    $timer.classList.remove("white")
    $footer.classList.remove("yellow")
    $footer.classList.remove("red")
    $timerPlay.classList.add("hidden")
    currentPlayer = "red"
    gameGridBoard = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ]

    $cells.forEach(function (cell) {
        cell.innerHTML = ""
        cell.classList.remove("red")
        cell.classList.remove("yellow")
    })
})

$headerButtonRestart.addEventListener("click", function () {
    $playerTurn.textContent = `PLAYER RED'S`
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.remove("red")
    $timer.classList.remove("white")
    $footer.classList.remove("yellow")
    $timerPlay.classList.add("hidden")
    $footer.classList.remove("red")
    currentPlayer = "red"
    gameGridBoard = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ]

    $cells.forEach(function (cell) {
        cell.innerHTML = ""
        cell.classList.remove("red")
        cell.classList.remove("yellow")
    })
})