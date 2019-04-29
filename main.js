const me = 'O';
const bot = 'X';
let player = me;
let turn = 0

const board = Array.from(Array(9).keys());

const cells = Array.from(document.querySelectorAll('.grid>*'));

const modal = document.querySelector('.modal')
const play = document.querySelector('.play')
const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// fonction replay sert à recharger la page au bout de 2 secondes lorsque toute les cases sont cochées
const replay = () => {
    setTimeout(() => {
        window.location.reload()
    }, 2000)
}

const endGame = (isWin) => {
    winList[isWin.i].map(id => {
        const cell = document.getElementById(id)
        const color = isWin.player === me ? '#00E676' : '#FF5252'
        cell.style.backgroundColor = color
    })
    cells.map(cell => cell.removeEventListener('click', newTurn))
    replay()
}
const checkWin = (board, player) => {
    const traces = board.reduce((a, v, i) => v === player ? a.concat(i) : a, [])
    let isWin = null
    for (let [i, win] of winList.entries()) {
        if (win.every(id => traces.indexOf(id) > -1)) {
            isWin = { i, player }
            break
        }
    }
    return isWin
}
// handleTurn = gérer les tours
const handleTurn = (cell, player) => {
    cell.innerText = player
    board[cell.id] = player
    const isWin = checkWin(board, player)
    if (isWin) endGame(isWin)
}

const newTurn = (event) => {
    //si player = me tu me renvoi bot sinon me
    player = player === me ? bot : me
    handleTurn(event.target, player)
    /* event.target.innerText = player */
    turn++
    if (turn === 9) replay()
}

const start = () => {
    modal.style.display = 'none';
    cells.map(cell => {
        //innerText = '' vide le texte
        cell.innerText = '';
        cell.addEventListener('click', newTurn)
    })
}
play.addEventListener('click', start)