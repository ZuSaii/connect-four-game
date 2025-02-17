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
const $playerVsTurn = document.querySelector(".player-vs-turn")
const $timerPlay = document.querySelector(".timer-play")
const $countPointsRed = document.querySelector(".count-points-red")
const $countPointsYellow = document.querySelector(".count-points-yellow")
const $pauseMenu = document.querySelector(".pause-menu-container")
const $pauseMenuContinueBtn = document.querySelector(".pause-menu-content-buttons-continue")
const $pauseMenuRestartBtn = document.querySelector(".pause-menu-content-buttons-restart")
const $pauseMenuQuitBtn = document.querySelector(".pause-menu-content-buttons-quit")
const $selectedColumn = document.querySelector(".selected-column hidden")
const $homeButtonCpu = document.querySelector(".home-button-cpu")
const $playerNumberRed = document.querySelector(".player-number-red")
const $playerNumberYellow = document.querySelector(".player-number-yellow")
const $playerCpu = document.querySelectorAll(".player-cpu")
const $playerCpuLogo = document.querySelectorAll(".player-you-cpu")
const $playerNumberLogo = document.querySelectorAll(".player-one-two")
const $playerCpuTurn = document.querySelector(".player-cpu-turn")
const $main = document.querySelector("main")
const $playerRed = document.querySelector(".player-red")
const $playerYellow = document.querySelector(".player-yellow")
const $headerLogo = document.querySelector(".header-logo")
const $chooseName = document.querySelector(".choose-name-container")
const $redName = document.querySelector("#red-name")
const $yellowName = document.querySelector("#yellow-name")
const $chooseNameDoneBtn = document.querySelector(".choose-name-done")
const $chooseNameQuitBtn = document.querySelector(".choose-name-quit")
const $errorMessageOne = document.querySelector(".error-message-name-one")
const $errorMessageTwo = document.querySelector(".error-message-name-two")
const $chooseNameForm = document.querySelector(".choose-name-form")
const $bareTime = document.querySelector(".bare-time")
const $bareTimeContentRed = document.querySelector(".bare-time-content-red")
const $bareTimeContentYellow = document.querySelector(".bare-time-content-yellow")

$time.textContent = "Start"
let playerVsOne
let playerVsTwo
let playerCpuOne = "YOU"
let playerCpuTwo = "CPU"
let nameSelected
$playerVsTurn.textContent = `${playerVsOne}`
$playerCpuTurn.textContent = `${playerCpuOne}`
let start = 0
let countRed = 0
let win = []
let countYellow = 0
let locked = false
let boucle
let currentPlayer = "red"
let columnSelected = [0, 1, 2, 3, 4, 5, 6]
let gameGridBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]

document.onkeydown = function (e) {
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

$pauseMenuQuitBtn.addEventListener("click", function (e) {
    $homeContainer.classList.remove("hidden")
    $header.classList.add("hidden")
    $middlePage.classList.add("hidden")
    $footer.classList.add("hidden")
    $pauseMenu.classList.add("hidden")
    $headerLogo.classList.remove("animation-header")
    $headerButtonRestart.classList.remove("animation-header")
    $bareTime.classList.remove("animation-header")
    $gameBoard.classList.remove("animation-game-board")
    $timer.classList.remove("animation-timer")
    $headerButtonMenu.classList.remove("animation-header")
    $playerYellow.classList.remove("animation-player-yellow")
    $playerRed.classList.remove("animation-player-red")
    $playerNumberRed.classList.remove("hidden")
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
    $playerNumberYellow.classList.remove("hidden")
    $playerCpu.forEach(function (playerCpu) {
        playerCpu.classList.add("hidden")
    })
    $playerCpuLogo.forEach(function (playerCpuLogo) {
        playerCpuLogo.classList.add("hidden")
    })
    $playerNumberLogo.forEach(function (playerNumberLogo) {
        playerNumberLogo.classList.remove("hidden")
    })

    countRed = 0
    countYellow = 0

    
    $playerVsTurn.textContent = `${playerVsOne}`
    $playerCpuTurn.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerVsOne}`
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.add("red")
    $timer.classList.remove("white")
    $time.classList.remove("black")
    $bareTime.classList.add("hidden")
    $bareTime.classList.add("hidden")
    $playerVsTurn.classList.remove("black")
    $playerCpuTurn.classList.remove("black")
    $footer.classList.remove("yellow")
    $pauseMenu.classList.add("hidden")
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
        cell.classList.remove("animation")
        cell.classList.remove("wins")
    })

    win = []
})

$pauseMenuContinueBtn.addEventListener("click", function (e) {
    $pauseMenu.classList.add("hidden")
})

$pauseMenuRestartBtn.addEventListener("click", function (e) {
    $playerVsTurn.textContent = `${playerVsOne}`
    $playerCpuTurn.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerVsOne}`
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
    $bareTime.classList.add("hidden")
    $bareTime.classList.add("hidden")
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.add("red")
    $timer.classList.remove("white")
    $time.classList.remove("black")
    $playerVsTurn.classList.remove("black")
    $playerCpuTurn.classList.remove("black")
    $footer.classList.remove("yellow")
    $pauseMenu.classList.add("hidden")
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
        cell.classList.remove("animation")
        cell.classList.remove("wins")
    })
    win = []
})

$homeButtonVs.addEventListener("click", function () {
    $homeContainer.classList.add("hidden")
    $header.classList.remove("hidden")
    $chooseName.classList.remove("hidden")
    $middlePage.classList.remove("hidden")
    $footer.classList.remove("hidden")
})

$headerButtonMenu.addEventListener("click", function () {
    $pauseMenu.classList.remove("hidden")
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

$rulesMenuCheck.addEventListener("mouseover", function () {
    $rulesMenuCheck.classList.add("hover-check")
})

$rulesMenuCheck.addEventListener("mouseout", function () {
    $rulesMenuCheck.classList.remove("hover-check")
})

$homeButtonCpu.addEventListener("click", function (e) {
    $homeContainer.classList.add("hidden")
    $header.classList.remove("hidden")
    $middlePage.classList.remove("hidden")
    $footer.classList.remove("hidden")
    $playerCpuTurn.classList.remove("hidden")
    $playerVsTurn.classList.add("hidden")
    $playerNumberRed.classList.add("hidden")
    $playerNumberYellow.classList.add("hidden")
    $playerCpu.forEach(function (playerCpu) {
        playerCpu.classList.remove("hidden")
    })
    $playerCpuLogo.forEach(function (playerCpuLogo) {
        playerCpuLogo.classList.remove("hidden")
    })
    $playerNumberLogo.forEach(function (playerNumberLogo) {
        playerNumberLogo.classList.add("hidden")
    })

    $playerNumberRed.textContent = `${playerCpuOne}`
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
})

$main.addEventListener("mouseover", function (e) {
    $gameBoard.classList.add("animation-game-board")
    setInterval(function () {
        $playerYellow.classList.add("animation-player-yellow")
        $playerRed.classList.add("animation-player-red")
    }, 400)

    setInterval(function () {
        $timer.classList.add("animation-timer")
    }, 800)

    setInterval(function () {
        $headerButtonRestart.classList.add("animation-header")
        $headerButtonMenu.classList.add("animation-header")
        $bareTime.classList.add("animation-header")
    }, 1100)

    setInterval(function () {
        $headerLogo.classList.add("animation-header")
    }, 1500)
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
                $playerYellow.classList.remove("yellow-turn")
                $playerRed.classList.remove("red-turn")
                $playerVsTurn.classList.add("black")
                $playerCpuTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerVsTurn.textContent = `${playerVsTwo}`
                $playerCpuTurn.textContent = `${playerCpuTwo}`
                $time.textContent = "WINS"

            } else if (currentPlayer === "yellow") {
                currentPlayer = "red"
                clearInterval(boucle)
                countRed++
                $countPointsRed.textContent = `${countRed}`
                $footer.classList.add("red")
                $timer.classList.add("white")
                $time.classList.add("black")
                $playerYellow.classList.remove("yellow-turn")
                $playerRed.classList.remove("red-turn")
                $playerVsTurn.classList.add("black")
                $playerCpuTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerVsTurn.textContent = `${playerVsOne}`
                $playerCpuTurn.textContent = `${playerCpuOne}`
                $time.textContent = "WINS"
            }
        }
    }, 1000)
}

$chooseNameForm.addEventListener("submit", function (Event) {
    Event.preventDefault()

    if ($redName.value.length > 10 || $redName.value.length < 3) {
        $errorMessageOne.classList.remove("hidden")
        return
    } else {
        $errorMessageOne.classList.add("hidden")
    }

    if ($yellowName.value.length > 10 || $yellowName.value.length < 3) {
        $errorMessageTwo.classList.remove("hidden")
        return
    } else {
        $errorMessageTwo.classList.add("hidden")
    }

    $chooseName.classList.add("hidden")

    nameSelected = 1
    nameSelectedOrNo()
})

function nameSelectedOrNo() {
    if (nameSelected === 1) {
        playerVsOne = $redName.value
        playerVsTwo = $yellowName.value
        $playerNumberRed.textContent = `${playerVsOne}`
        $playerNumberYellow.textContent = `${playerVsTwo}`
        $playerVsTurn.textContent = `${playerVsOne}`
    }
}
nameSelectedOrNo()

$chooseNameQuitBtn.addEventListener("click", function () {
    $chooseName.classList.add("hidden")
    playerVsOne = "PLAYER 1"
    playerVsTwo = "PLAYER 2"
    $playerNumberRed.textContent = `${playerVsOne}`
    $playerNumberYellow.textContent = `${playerVsTwo}`
    $playerVsTurn.textContent = `${playerVsOne}`
})

$cells.forEach(function (cell) {
    cell.innerHTML = ""
})

function aleatoirePions(x0, x7) {

    x0 = Math.ceil(x0)
    x7 = Math.floor(x7)
    return Math.floor(Math.random() * (x7 - x0)) + x0
}

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
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 1}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 2}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 3}"][data-y="${y}"]`))
                    win.forEach(function (winCells) {
                        winCells.classList.add("wins")
                    })
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
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y + 1}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y + 2}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y + 3}"]`))
                    win.forEach(function (winCells) {
                        winCells.classList.add("wins")
                    })
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
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 1}"][data-y="${y + 1}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 2}"][data-y="${y + 2}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x + 3}"][data-y="${y + 3}"]`))
                    win.forEach(function (winCells) {
                        winCells.classList.add("wins")
                    })
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
                    win.push(document.querySelector(`.cells[data-x="${x}"][data-y="${y}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x - 1}"][data-y="${y + 1}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x - 2}"][data-y="${y + 2}"]`))
                    win.push(document.querySelector(`.cells[data-x="${x - 3}"][data-y="${y + 3}"]`))
                    win.forEach(function (winCells) {
                        winCells.classList.add("wins")
                    })
                    return true;
                }
            }
        }
        return false;
    }


    function iaJoue() {
        if ($playerCpuTurn.classList.contains("hidden")) {
        } else {

            if (checkWin(gameGridBoard) === true) {

                return
            }
            setTimeout(function () {
                function dropPionsIa(index) {
                    for (let i = 5; i >= 0; i--) {
                        if (gameGridBoard[i][index] === "") {
                            gameGridBoard[i][index] = currentPlayer
                            return [i, index]
                        } else {
                            continue
                        }
                    }
                }

                const locationIa = dropPionsIa(aleatoirePions(0, 7))

                const yIa = locationIa[0]
                const xIa = locationIa[1]

                let cellSelectedIa = document.querySelector(`.cells[data-x="${xIa}"][data-y="${yIa}"]`)

                for (let i = 0; i < 20; i++) {
                    cellSelectedIa.classList.add("yellow")
                    cellSelectedIa.classList.add("animation")
                    currentPlayer = "red"
                    if (currentPlayer = "red") {
                        break
                    }
                }
                turnToPlay()
            }, 2000)
        }
    }

    function turnToPlay() {
        if (currentPlayer === "red") {
            $timer.classList.add("red")
            $timer.classList.remove("yellow")
            $timer.classList.remove("white")
            $bareTimeContentYellow.classList.remove("animation-bare")
            $bareTimeContentYellow.classList.add("hidden")
            $bareTimeContentRed.classList.remove("hidden")
            $bareTimeContentRed.classList.add("animation-bare")
            $playerRed.classList.add("red-turn")
            $playerYellow.classList.remove("yellow-turn")
            $playerVsTurn.textContent = `${playerVsOne}'S TURN`
            $playerCpuTurn.textContent = `${playerCpuOne}'S TURN`
            clearInterval(boucle)
            timerBoucle()
        } else if (currentPlayer === "yellow") {
            iaJoue()
            $timer.classList.add("yellow")
            $timer.classList.remove("white")
            $timer.classList.remove("red")
            $bareTimeContentRed.classList.remove("animation-bare")
            $playerRed.classList.remove("red-turn")
            $bareTimeContentYellow.classList.remove("hidden")
            $bareTimeContentRed.classList.add("hidden")
            $bareTimeContentYellow.classList.add("animation-bare")
            $playerYellow.classList.add("yellow-turn")
            $playerVsTurn.textContent = `${playerVsTwo}'S TURN`
            $playerCpuTurn.textContent = `${playerCpuTwo}'S TURN`
            clearInterval(boucle)
            timerBoucle()
        }
    }

    $cell.addEventListener("click", function (event) {
        if (start === 0) {
            setInterval(timerBoucle(), 60000)
            start++
            $bareTime.classList.remove("hidden")
        }
        start++

        const dataX = $cell.getAttribute("data-x")
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

        const $selectedCell = document.querySelector(`.cells[data-x="${x}"][data-y="${y}"]`)

        let selectedCell = $selectedCell

        if (currentPlayer === "red") {
            selectedCell.classList.add("red")
            selectedCell.classList.add("animation")
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
                $playerYellow.classList.remove("yellow-turn")
                $playerRed.classList.remove("red-turn")
                $playerVsTurn.classList.add("black")
                $playerCpuTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerVsTurn.textContent = `${playerVsOne}`
                $playerCpuTurn.textContent = `${playerCpuOne}`
                $time.textContent = "WINS"
            }
        } else {
            selectedCell.classList.add("yellow")
            selectedCell.classList.add("animation")
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
                $playerYellow.classList.remove("yellow-turn")
                $playerRed.classList.remove("red-turn")
                $playerVsTurn.classList.add("black")
                $playerCpuTurn.classList.add("black")
                $timerPlay.classList.remove("hidden")
                $playerVsTurn.textContent = `${playerVsTwo}`
                $playerCpuTurn.textContent = `${playerCpuTwo}`
                $time.textContent = "WINS"
            }
        }
    })
})

$timerPlay.addEventListener("click", function () {
    $playerVsTurn.textContent = `${playerVsOne}`
    $playerCpuTurn.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerVsOne}`
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
    $bareTime.classList.add("hidden")
    $bareTime.classList.add("hidden")
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.add("red")
    $timer.classList.remove("white")
    $time.classList.remove("black")
    $playerVsTurn.classList.remove("black")
    $playerCpuTurn.classList.remove("black")
    $footer.classList.remove("yellow")
    $pauseMenu.classList.add("hidden")
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
        cell.classList.remove("animation")
        cell.classList.remove("wins")
    })
    win = []
})

$headerButtonRestart.addEventListener("click", function () {
    $playerVsTurn.textContent = `${playerVsOne}`
    $playerCpuTurn.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerCpuOne}`
    $playerNumberRed.textContent = `${playerVsOne}`
    $playerRed.classList.remove("red-turn")
    $playerYellow.classList.remove("yellow-turn")
    $bareTime.classList.add("hidden")
    $bareTime.classList.add("hidden")
    $time.textContent = "Start"
    start = 0
    locked = false
    clearInterval(boucle)
    $timer.classList.remove("yellow")
    $timer.classList.add("red")
    $timer.classList.remove("white")
    $time.classList.remove("black")
    $playerVsTurn.classList.remove("black")
    $playerCpuTurn.classList.remove("black")
    $footer.classList.remove("yellow")
    $pauseMenu.classList.add("hidden")
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
        cell.classList.remove("animation")
        cell.classList.remove("wins")
    })
    win = []
})