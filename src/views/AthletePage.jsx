import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Comparison from '~/views/Comparison.jsx'
import SignUp from '~/views/SignUp.jsx'
import Criteria from '~/views/Criteria.jsx'
import { useHistory } from 'react-router-dom'
import CriteriaDashboard from '~/views/CriteriaDashboard.jsx'
import Evaluation from '~/views/Evaluation.jsx'
//import { useBetween } from 'use-between'

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
          <SignUp />
        </div>
      )
    case 1:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <Criteria />
        </div>
      )
    case 2:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <Comparison />
        </div>
      )
    case 3:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <CriteriaDashboard />
        </div>
      )
    case 4:
      return (
        <div className="animated fadeIn" style={{ height: '70vh' }}>
          <Evaluation />
        </div>
      )
    default:
      return 'Unknown stepIndex'
  }
}

/* const useFormState = () => {
  const [activeStep, setActiveStep] = React.useState(0)

  return {
    activeStep,
    setActiveStep,
  }
} */

// Make a custom hook for sharing your state between any components
//const useSharedFormState = () => useBetween(useFormState)

export default function AthletePage() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  let history = useHistory()

  //const { activeStep, setActiveStep } = useSharedFormState()
  const steps = getSteps()

  const home = () => {
    history.push('/homePage')
  }

  const handleNext = () => {
    //const { setActiveStep } = useSharedFormState()
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  /*const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }*/

  function getSteps() {
    return [
      'Sign Up',
      'Choose the criteria',
      'Compare the criteria',
      'Dashboard Criteria',
      'Evaluate options based on the criteria',
    ]
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
          <div>{home()}</div>
        ) : (
          <div style={{ position: 'relative' }}>
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
