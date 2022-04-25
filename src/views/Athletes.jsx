import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardBody, Col, CardTitle, CardHeader } from 'reactstrap'
import AthleteIndicator from '~/components/AthleteIndicator.jsx'
import AthleteList from '~/components/AthleteList.jsx'
import { getAthletes, getAthletesCriteria } from '~/redux/actions'
import { useSelector } from 'react-redux'
import 'bulma/css/bulma.min.css'

const Athletes = () => {
  const dispatch = useDispatch()
  const { athleteList, fetchingState } = useSelector((state) => state.athlete)
  const [state, setState] = useState({
    list: [],
    athleteId: null,
    scenario:
      'Imagine the following situation: You are a professional athlete. For several days, you have had to deal with shoulder pain. During the training session on Thursday, the pain became so bad that you had to abandon the ongoing session. However, your/your team’s championship game is scheduled for the following Saturday and if you do not attend the game, you will lose the endorsement deals. Your coach immediately sends you to see the doctor. After an in-depth examination, the doctor diagnoses a partial tear of the supraspinatus tendon and suggests you not return to play until it recovers fully. Otherwise, the damage at your shoulder can be severe and causes a complete tear of the tendon. You need to inform your coach immediately about whether you will participate in the competition. You must now decide between two alternatives. Which decision do you communicate to your coach? Alternative A: You decide to have a lay-off and withdraw from competition. Alternative B: You decide to participate in the championship game, despite the shoulder problem',
  })

  useEffect(() => {
    dispatch(getAthletes())
  }, [])

  useEffect(() => {
    if (fetchingState === 'success') {
      setState({
        ...state,
        list: athleteList,
      })
    }
  }, [athleteList])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(state.athleteId)
    dispatch(getAthletesCriteria(state.athleteId))
  }

  const handleSelected = (index) => {
    setState({
      ...state,
      athleteId: index,
    })
  }
  const onChangeValue = (event) => {
    setState({ ...state, scenario: event.target.value })
  }

  return (
    <div>
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Please read the scenarios and alternatives below and choose the
            athlete.
          </CardHeader>
        </Card>
      </div>
      <div className="wrapper">
        <Col md={5}>
          <Card>
            <CardHeader>
              <div onChange={onChangeValue}>
                <input
                  type="radio"
                  defaultChecked
                  value="Imagine the following situation: You are a professional athlete. For several days, you have had to deal with shoulder pain. During the training session on Thursday, the pain became so bad that you had to abandon the ongoing session. However, your/your team’s championship game is scheduled for the following Saturday and if you do not attend the game, you will lose the endorsement deals. Your coach immediately sends you to see the doctor. After an in-depth examination, the doctor diagnoses a partial tear of the supraspinatus tendon and suggests you not return to play until it recovers fully. Otherwise, the damage at your shoulder can be severe and causes a complete tear of the tendon. You need to inform your coach immediately about whether you will participate in the competition. You must now decide between two alternatives. Which decision do you communicate to your coach? Alternative A: You decide to have a lay-off and withdraw from competition. Alternative B: You decide to participate in the championship game, despite the shoulder problem."
                  checked={
                    state.scenario ===
                    'Imagine the following situation: You are a professional athlete. For several days, you have had to deal with shoulder pain. During the training session on Thursday, the pain became so bad that you had to abandon the ongoing session. However, your/your team’s championship game is scheduled for the following Saturday and if you do not attend the game, you will lose the endorsement deals. Your coach immediately sends you to see the doctor. After an in-depth examination, the doctor diagnoses a partial tear of the supraspinatus tendon and suggests you not return to play until it recovers fully. Otherwise, the damage at your shoulder can be severe and causes a complete tear of the tendon. You need to inform your coach immediately about whether you will participate in the competition. You must now decide between two alternatives. Which decision do you communicate to your coach? Alternative A: You decide to have a lay-off and withdraw from competition. Alternative B: You decide to participate in the championship game, despite the shoulder problem.'
                  }
                />
                Scenario 1
                <input
                  style={{
                    marginLeft: '170px',
                  }}
                  type="radio"
                  value="Imagine the following situation: You are a professional athlete. During a competitive game, you felt an intense pain with swelling in the back of your lower leg and were not able to complete the game. You immediately see the doctor and he diagnoses Achilles tendon rupture which requires surgery and then rehabilitation for the treatment. During the healing process which takes almost a year, your sports club terminates your contract and recruits new athletes. After an in-depth examination, the rupture had fully healed, however, your physical performance dramatically reduced and not at your and your fans’ expected level. As the sports season starts soon, you need to decide whether you will play in the season. You must now decide between two alternatives. Alternative A: You decide to prepare for the next season. Alternative B: You decide to find a sports club and play in the current season, despite the low performance and lack of playing time."
                  checked={
                    state.scenario ===
                    'Imagine the following situation: You are a professional athlete. During a competitive game, you felt an intense pain with swelling in the back of your lower leg and were not able to complete the game. You immediately see the doctor and he diagnoses Achilles tendon rupture which requires surgery and then rehabilitation for the treatment. During the healing process which takes almost a year, your sports club terminates your contract and recruits new athletes. After an in-depth examination, the rupture had fully healed, however, your physical performance dramatically reduced and not at your and your fans’ expected level. As the sports season starts soon, you need to decide whether you will play in the season. You must now decide between two alternatives. Alternative A: You decide to prepare for the next season. Alternative B: You decide to find a sports club and play in the current season, despite the low performance and lack of playing time.'
                  }
                />
                Scenario 2
              </div>
            </CardHeader>
            <CardBody>
              <CardTitle>{state.scenario}</CardTitle>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Alternatives</CardHeader>
            <CardBody>
              <CardTitle>
                The decision alternatives are: return to sport with high or low
                performance, practice with restrictions, physically not ready to
                sport
              </CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={5}>
          <div
            className="card frame"
            style={{ width: '600px', height: '60vh' }}
          >
            {AthleteIndicator()}
            {AthleteList(state.list, handleSelected)}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button onClick={handleSubmit} className="button">
                Submit
              </button>
              <br />
            </div>
            <br />
          </div>
        </Col>
      </div>
    </div>
  )
}

export default Athletes
