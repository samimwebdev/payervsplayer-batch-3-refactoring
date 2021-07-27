const game = {
  p1Score: 0,
  p2Score: 0,
  winningScore: 10,
  gameOver: false,
  loadEventListener() {
    const p1ScoreDisplay = document.getElementById('p1Score')
    const p2ScoreDisplay = document.getElementById('p2Score')
    let inputScore = document.getElementById('inputScore')
    const p1Btn = document.getElementById('p1Btn')
    const p2Btn = document.getElementById('p2Btn')
    const resetBtn = document.getElementById('resetBtn')
    const wScoreDisplay = document.querySelector('p span')
    return {
      p1ScoreDisplay,
      p2ScoreDisplay,
      inputScore,
      p1Btn,
      p2Btn,
      resetBtn,
      wScoreDisplay
    }
  },
  listenP1() {
    const { p1ScoreDisplay } = this.loadEventListener()
    if (!this.gameOver) {
      this.p1Score++

      // this.winner(this.p1Score, this.winningScore)

      this.getWinner()

      p1ScoreDisplay.textContent = this.p1Score
    }
  },
  listenP2() {
    const { p2ScoreDisplay } = this.loadEventListener()
    if (!this.gameOver) {
      this.p2Score++
      //this.winner(this.p2Score, this.winningScore)
      this.getWinner()

      p2ScoreDisplay.textContent = this.p2Score
    }
  },
  reset() {
    const {
      p1ScoreDisplay,
      p1Btn,
      p2ScoreDisplay,
      p2Btn,
      inputScore,
      wScoreDisplay
    } = this.loadEventListener()
    this.p1Score = 0
    p1ScoreDisplay.textContent = this.p1Score
    this.gameOver = false
    p1Btn.removeAttribute('disabled')
    this.p2Score = 0
    p2ScoreDisplay.textContent = this.p2Score
    p2Btn.removeAttribute('disabled')
    this.gameOver = false

    p1ScoreDisplay.removeAttribute('class', 'text-success text-danger')
    p2ScoreDisplay.removeAttribute('class', 'text-success text-danger')

    inputScore.value = ''
    wScoreDisplay.textContent = this.winningScore
  },
  getWinner() {
    const {
      p1ScoreDisplay,
      p2ScoreDisplay,
      p1Btn,
      p2Btn
    } = this.loadEventListener()

    if (
      this.p1Score === this.winningScore ||
      this.p2Score === this.winningScore
    ) {
      if (this.p1Score === this.winningScore) {
        //p1 is winner
        p1ScoreDisplay.classList.add('text-success')
        p2ScoreDisplay.classList.add('text-danger')
      } else {
        //p2 winner
        p2ScoreDisplay.classList.add('text-success')
        p1ScoreDisplay.classList.add('text-danger')
      }

      //gameOver
      this.gameOver = true
      p1Btn.setAttribute('disabled', 'disabled')
      p2Btn.setAttribute('disabled', 'disabled')
      alert('Game Over!')
    }
  },
  listenInput() {
    const { wScoreDisplay, inputScore } = this.loadEventListener()
    //this -inputscore
    this.winningScore = Number(inputScore.value)

    wScoreDisplay.textContent = inputScore.value
    inputScore.value = ''

    this.reset()
  },
  init() {
    const $this = this //game
    const {
      p1Btn,
      p2Btn,
      inputScore,
      resetBtn,
      wScoreDisplay
    } = this.loadEventListener()

    //initialize wining score
    wScoreDisplay.textContent = this.winningScore
    p1Btn.addEventListener('click', game.listenP1.bind($this))

    p2Btn.addEventListener('click', game.listenP2.bind($this))

    // Change Input Value

    inputScore.addEventListener('change', game.listenInput.bind(game))

    resetBtn.addEventListener('click', () => {
      $this.reset()
    })
  }
}

game.init()
