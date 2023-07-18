import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {timeLimit: 0, secRunning: 0, isClicked: false}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  timerCounterFormat = () => {
    const {timeLimit, secRunning} = this.state
    const timer = timeLimit + secRunning
    const min = Math.floor(timer / 60)
    const sec = Math.floor(timer % 60)
    const minInString = min > 9 ? min : `0${min}`
    const secInString = sec > 9 ? sec : `0${sec}`
    return `${minInString}:${secInString}`
  }

  onClickStart = () => {
    const {isClicked} = this.state
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
    if (isClicked === false) {
      this.timerId = setInterval(() => {
        this.startTimer()
      }, 1000)
    }
  }

  onClickStop = () => {
    const {isClicked} = this.state
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
    if (isClicked) {
      this.clearTimer()
    }
  }

  onClickReset = () => {
    this.setState({timeLimit: 0, secRunning: 0, isClicked: false})
    this.clearTimer()
  }

  startTimer = () =>
    this.setState(prevState => ({secRunning: prevState.secRunning + 1}))

  render() {
    return (
      <div className="stopwatch-container">
        <h1 className="heading-stopwatch">Stopwatch</h1>
        <div className="timer-container">
          <div className="timer-heading-container">
            <img
              className="timer-icon"
              alt="stopwatch"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            />
            <h1 className="timer-heading">Timer</h1>
          </div>
          <h1 className="counter-time-text">{this.timerCounterFormat()}</h1>
          <div className="buttons-container">
            <button
              type="button"
              className="button green"
              onClick={this.onClickStart}
            >
              Start
            </button>
            <button
              type="button"
              className="button red"
              onClick={this.onClickStop}
            >
              Stop
            </button>
            <button
              type="button"
              className="button yellow"
              onClick={this.onClickReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
