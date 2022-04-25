import React, { useState, useEffect } from 'react'
import { createFeedbacks } from '~/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Feedback = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    feedback: '',
    doesAth: true,
    athletefeedback: false,
    doctorfeedback: false,
  })

  const { result } = useSelector((state) => state.athleteCriteria)

  let history = useHistory()

  useEffect(() => {
    if (result.length > 0) {
      setState({ ...state, doesAth: false })
    }
  }, [])

  const handleAthleteFeedback = (event) => {
    event.preventDefault()
    setState({ ...state, doctorfeedback: false, athletefeedback: true })
  }

  const handleDoctorFeedback = (event) => {
    event.preventDefault()
    setState({ ...state, doctorfeedback: true, athletefeedback: false })
  }

  const athleteIframe =
    '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfNOg67mrfTkH50qJb1xMiQNB4sM_49L1yVVKovso6qwesrnw/viewform?embedded=true" width="1040" height="1512" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>'

  const doctorIframe =
    '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSezxD0ML4NleadkMUza1nMXjvmd6T-UuUQSuQCPsTp--nmTlQ/viewform?embedded=true" width="1040" height="2110" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>'

  return (
    <div className="wrapper">
      <div className="card frame" style={{ height: '2450px', width: '1070px' }}>
        <div className="card-header">
          <h4 className="card-header-title header">Feedback Form</h4>
        </div>
        <form className="feedback" id="feedback">
          <div className="mb-3">
            <p>
              <b>
                Please click the appropriate button for your role to fill the
                feedback form in order to evaluate the decision aid system.
              </b>
            </p>
            <p>
              <b>
                If you fill the form once, you do not need to fill it again.
              </b>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handleAthleteFeedback}
              style={{ margin: '20px' }}
              className="button"
            >
              Athlete Feedback Form
            </button>
            <button
              onClick={handleDoctorFeedback}
              style={{ margin: '20px' }}
              className="button"
            >
              Clinician Feedback Form
            </button>
          </div>
          {state.athletefeedback && (
            <div
              className="container"
              style={{ height: '1600px', width: '1070px' }}
            >
              <iframe className="responsive-iframe" srcDoc={athleteIframe} />
            </div>
          )}
          {state.doctorfeedback && (
            <div
              className="container"
              style={{ height: '2450px', width: '1070px' }}
            >
              <iframe
                className="responsive-iframe"
                srcDoc={doctorIframe}
                style={{
                  height: '2150px',
                  width: '1070px',
                  frameborder: '0',
                  marginheight: '0',
                  marginwidth: '0',
                }}
              />
            </div>
          )}
          <br />
        </form>
      </div>
    </div>
  )
}
export default Feedback
