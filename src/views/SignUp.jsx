import React, { useState } from 'react'
import { createAthlete } from '~/redux/actions'
import { useDispatch } from 'react-redux'
import { handleNext } from './athletePage'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    id: null,
    scenario: '',
    scenarioNo: '',
  })

  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    const athlete = Object.assign(
      {},
      {
        id: 0,
        firstName: state.firstName,
        lastName: state.lastName,
        detail: state.scenarioNo,
      },
    )
    dispatch(createAthlete(athlete))
    //history.push('/criteria')
    //handleNext(1)
  }

  const onInputchange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const onChangeValue = (event) => {
    setState({
      ...state,
      scenario: event.target.value,
      scenarioNo: event.target.name,
    })
  }

  return (
    <div className="wrapper">
      <div className="card frame" style={{ height: '73vh', width: '800px' }}>
        <div className="card-header">
          <h5 className="card-header-title header">Athlete Sign Up Form</h5>
        </div>
        <form className="signup" onSubmit={handleSubmit} id="signUp">
          <div className="mb-3">
            <input
              className="input is-link"
              type="text"
              value={state.firstName}
              name="firstName"
              placeholder="First Name"
              onChange={onInputchange}
            />
          </div>
          <div className="mb-3">
            <input
              className="input is-link"
              type="text"
              value={state.lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={onInputchange}
            />
          </div>
          <div onChange={onChangeValue}>
            <input
              type="radio"
              value="Imagine the following situation: You are a professional athlete. For several days, you have had to deal with shoulder pain. During the training session on Thursday, the pain became so bad that you had to abandon the ongoing session. However, your or your team’s championship game is scheduled for ten days later and if you do not attend the game, you will lose the endorsement deals. Your coach immediately sends you to see the doctor. After an in-depth examination, the doctor diagnoses a partial tear of the supraspinatus tendon and suggests you not return to play until it recovers fully. Otherwise, the damage at your shoulder can be severe and causes a complete tear of the tendon. You need to inform your coach immediately about whether you will participate in the competition. You must now decide among three alternatives. Which decision do you communicate to your coach? Alternative A: You decide to withdraw from the competition and wait for recovery. Alternative B: You decide not to play in the championship game but to attend the training with a shoulder strap. Alternative C: You decide to participate in the championship game by suppressing the shoulder pain with painkillers."
              name="Scenario1"
              checked={
                state.scenario ===
                'Imagine the following situation: You are a professional athlete. For several days, you have had to deal with shoulder pain. During the training session on Thursday, the pain became so bad that you had to abandon the ongoing session. However, your or your team’s championship game is scheduled for ten days later and if you do not attend the game, you will lose the endorsement deals. Your coach immediately sends you to see the doctor. After an in-depth examination, the doctor diagnoses a partial tear of the supraspinatus tendon and suggests you not return to play until it recovers fully. Otherwise, the damage at your shoulder can be severe and causes a complete tear of the tendon. You need to inform your coach immediately about whether you will participate in the competition. You must now decide among three alternatives. Which decision do you communicate to your coach? Alternative A: You decide to withdraw from the competition and wait for recovery. Alternative B: You decide not to play in the championship game but to attend the training with a shoulder strap. Alternative C: You decide to participate in the championship game by suppressing the shoulder pain with painkillers.'
              }
            />
            Scenario 1
            <input
              style={{
                marginLeft: '170px',
              }}
              type="radio"
              value="Imagine the following situation: You are a professional athlete. During a competitive game, you felt an intense pain with swelling in the back of your lower leg and were not able to complete the game. You immediately see the doctor and he diagnoses Achilles tendon rupture which requires surgery and then long-term rehabilitation for the treatment. During the healing process, your sports club terminates your contract and recruits new athletes. After a six-month rehabilitation period, your biomedical and physical condition were approved and you were allowed to return to sports. However, your post-injury physical performance dramatically reduced, lower than what you and your fans’ expected. As the sports season starts soon, you need to decide whether you will play in the season. You must now decide among three alternatives. Alternative A: You decide to have a lay-off and prepare for the next season. Alternative B: You decide to find a sports club and play in the current season, despite the low performance and lack of playing time. Alternative C: You decide to find a sports club and just attend the training with movement restrictions."
              name="Scenario2"
              checked={
                state.scenario ===
                'Imagine the following situation: You are a professional athlete. During a competitive game, you felt an intense pain with swelling in the back of your lower leg and were not able to complete the game. You immediately see the doctor and he diagnoses Achilles tendon rupture which requires surgery and then long-term rehabilitation for the treatment. During the healing process, your sports club terminates your contract and recruits new athletes. After a six-month rehabilitation period, your biomedical and physical condition were approved and you were allowed to return to sports. However, your post-injury physical performance dramatically reduced, lower than what you and your fans’ expected. As the sports season starts soon, you need to decide whether you will play in the season. You must now decide among three alternatives. Alternative A: You decide to have a lay-off and prepare for the next season. Alternative B: You decide to find a sports club and play in the current season, despite the low performance and lack of playing time. Alternative C: You decide to find a sports club and just attend the training with movement restrictions.'
              }
            />
            Scenario 2
          </div>
          <div>
            <textarea
              className="textarea is-link"
              type="text"
              name="detail"
              value={state.scenario}
              placeholder=""
              rows="12"
              disabled="true"
              onChange={onInputchange}
            />
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp
