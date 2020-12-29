window.addEventListener('load', () => {
  var gameboard = document.querySelector('.gameboard')
  var height = 30
  var width = 27
  var currentPacmanPos = 156
  var gameScore = 0
  const POINTS_PER_DOT = 10
  const TIME_GHOST_MODE = 1000 * 20 // in ms
  var lives = 3
  var currentDirection = ''
  var flagGodMode = false
  // type of tiles
  const GHOST = 7
  const PACMAN = 2
  const EMPTY = 9
  const POINT = 0
  const OBSTACLE = 1

  var GAME_SETUP = [
    0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    renderBoard()

    window.addEventListener('keyup', (event) => {
      if(event.key === 'ArrowUp') currentDirection = 'goUp'
      if(event.key === 'ArrowDown') currentDirection = 'goDown'
      if(event.key === 'ArrowLeft') currentDirection = 'goLeft'
      if(event.key === 'ArrowRight') currentDirection = 'mvRight'
    })

    function isMovable(pos, curr) {
      // cannot move into obstacle
      if(hasObstacle(pos)) {
        return false
      }
      // cannot move into an undefined div elem
      if(GAME_SETUP[pos] === GHOST) {
        // kill pacman or ghost
        if(flagGodMode) {
          gameScore += 500
          return true
        }

        // kill Pacman
        killPacMan()
        return false
      }

      // cannot move towards edge
      if(isEdge(pos, curr)) {
        return false
      }

      return true
    }

    function killPacMan() {
      lives--
      if (lives === 0) gameOver()
      else resetGame()
    }

    function gameOver () {
      document.querySelector('.gameboard')
      clearInterval(gameInterval)
    }

    function resetGame () {

    }

    function hasObstacle(pos) {
      if(pos < 0 || pos >= 811) {
        return true
      }

      if(GAME_SETUP[pos] === GHOST) return true

      if(GAME_SETUP[pos] === OBSTACLE) return true

      return false
    }

    function isEdge(curr, pos) {
      if(curr % 27 === 26 && pos % 27 === 0) {
        return true
      }

      if(curr % 27 === 0 && pos % 27 === 26) {
        return true
      }

      return false
    }

    function goUp () {
      if(isMovable(currentPacmanPos - 27, currentPacmanPos)) {
        movePacman(currentPacmanPos - 27)
      }
    }

    function goDown () {
      if(isMovable(currentPacmanPos + 27, currentPacmanPos)) {
        movePacman(currentPacmanPos + 27)
      }
    }

    function mvRight () {
      if(isMovable(currentPacmanPos + 1, currentPacmanPos)) {
        movePacman(currentPacmanPos + 1)
      }
    }

    function goLeft () {
      if(isMovable(currentPacmanPos - 1, currentPacmanPos)) {
        movePacman(currentPacmanPos - 1)
      }
    }

    function movePacman(pos) {
      if(GAME_SETUP[pos] === 0) { // addScore
        gameScore += POINTS_PER_DOT
        updateScore()
      }
      GAME_SETUP[pos] = PACMAN
      GAME_SETUP[currentPacmanPos] = EMPTY
      currentPacmanPos = pos
    }

    function updateScore () {
      var scorebox = document.querySelector('.score p')
      scorebox.innerHTML = gameScore
    }

    function clearBoard () {
      gameboard.innerHTML = ""
    }

    function moveGhosts () {
      return
    }

    function renderBoard () {
      for(i = 0; i < (height * width); i++) {
        var div = document.createElement("div")

        if(GAME_SETUP[i] == POINT) {
          div.innerHTML = "&bullet;"
          // div.innerHTML = i
          div.setAttribute("class", "point-box")
        } else if(GAME_SETUP[i] == OBSTACLE) {
          div.setAttribute("class", "obstacle")
        } else if(GAME_SETUP[i] == PACMAN) { // pacman
          div.setAttribute("class", "pacman")
        } else if(GAME_SETUP[i] == GHOST) { // ghost
          div.setAttribute("class", "ghost")
        } else if(GAME_SETUP[i] == EMPTY) { // empty tile
          div.setAttribute("class", "empty")
        }

        gameboard.appendChild(div)
      }
    }

    gameInterval = setInterval(() => {
      moveGhosts()
      if(currentDirection != '') eval(currentDirection + "()")
      clearBoard()
      renderBoard()
    }, 220)
})
