import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Athletes from '~/views/Athletes.jsx'
import Feedback from '~/views/Feedback.jsx'
import DecisionDashboard from '~/views/DecisionDashboard.jsx'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <Athletes />
        </div>
      )
    case 1:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <DecisionDashboard />
        </div>
      )
    case 2:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <Feedback />
        </div>
      )

    case 3:
      return <div className="animated fadeIn" style={{ height: '70vh' }}></div>
    default:
      return 'Unknown stepIndex'
  }
}

export default function DoctorPage() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  let history = useHistory()

  const home = () => {
    history.push('/homePage')
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  function getSteps() {
    return ['Choose the Athlete', 'Dashboard Result', 'Feedback']
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div>{home()}</div>
          </div>
        ) : (
          <div>
            <Typography component={'div'} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <Button
                disabled={true}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                style={{ position: 'fixed', bottom: '80px' }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
