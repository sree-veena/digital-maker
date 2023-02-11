// Write your code here
// import {Component} from 'react'
// import './index.css'

// class DigitalTimer extends Component {
//   state = {min: 25,sec:0}

//   onclickPlus = () => {
//     const {min,sec} = this.state

//     if (min < 60) {
//       this.setState(prevState => ({min: prevState.min + 1}))
//     const start
//     }
//   }

//   onClickMinus = () => {
//     const {min} = this.state
//     if (min > 0) {
//       this.setState(prevState => ({min: prevState.min - 1}))
//     }
//   }

//   render() {
//     const {min} = this.state
//     return (
//       <div className="bg-container">
//         <div className="container">
//           <div className="time-container">
//             <p className="circle" type="button">
//               {min}
//             </p>
//           </div>
//           <div className="controller">
//             <div className="start-reset-img">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//                 className="icon"
//                 alt="start"
//               />
//               <p className="word">start</p>
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
//                 className="icon"
//                 alt="reset"
//               />
//               <p className="para">Reset</p>
//             </div>
//             <div className="set-timer">
//               <p className="symbol" onClick={this.onClickMinus}>
//                 -
//               </p>
//               <button className="btn">{min}</button>
//               <p className="symbol" onClick={this.onclickPlus}>
//                 +
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, minutes: 25, seconds: 0, isTimerRunning: false}

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {isTimerRunning, minutes, seconds} = this.state

    if (minutes === 0 && seconds === 1) {
      this.setState({minutes: 25, seconds: 0, isTimerRunning: false})
    }

    if (isTimerRunning && minutes >= 0) {
      this.setState({
        seconds: seconds > 0 ? seconds - 1 : 59,
        minutes: seconds === 0 ? minutes - 1 : minutes,
      })
    }
  }

  onClickStartPauseBtn = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickResetBtn = () => {
    this.setState({minutes: 25, seconds: 0, isTimerRunning: false, timer: 25})
  }

  decrementMinutes = () => {
    const {isTimerRunning, minutes} = this.state
    if (isTimerRunning === false && minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        timer: prevState.timer - 1,
      }))
    }
  }

  incrementMinutes = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        timer: prevState.timer + 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, isTimerRunning, timer} = this.state

    const s = seconds < 10 ? `0${seconds}` : seconds
    const m = minutes < 10 ? `0${minutes}` : minutes

    const clockStatus = isTimerRunning ? 'Pause' : 'Start'
    const imgg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imgAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timerText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-display-container">
          <div className="timer-container">
            <div className="white-circle">
              <h1 className="time">
                {m}:{s}
              </h1>
              <p className="status">{timerText}</p>
            </div>
          </div>
          <div className="reset-container">
            <div className="start-reset-container">
              <div className="btn-container">
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.onClickStartPauseBtn}
                >
                  <img src={imgg} alt={imgAltText} className="btn" />
                  <span className="text">{clockStatus}</span>
                </button>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.onClickResetBtn}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="btn"
                  />
                </button>
                <p className="text">Reset</p>
              </div>
            </div>
            <p className="reset-text">Set Timer Limit</p>
            <div className="adjust-time-container">
              <button
                className="time-change-btn"
                type="button"
                onClick={this.decrementMinutes}
                disabled={isTimerRunning}
              >
                -
              </button>
              <p className="timer">{timer}</p>
              <button
                className="time-change-btn"
                type="button"
                onClick={this.incrementMinutes}
                disabled={isTimerRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
