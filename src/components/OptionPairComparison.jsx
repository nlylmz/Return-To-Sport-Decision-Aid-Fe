import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import { createOptionsEvaluation } from '~/redux/actions'
import { useDispatch } from 'react-redux'
import { useBetween } from 'use-between'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: 1500,
  },
})

const marks = [
  {
    value: -3,
    label: 'Moderate',
  },
  {
    value: -5,
    label: 'Strong',
  },
  {
    value: -7,
    label: 'Very Strong',
  },
  {
    value: -9,
    label: 'Extreme',
  },
  {
    value: 0,
    label: 'Equal',
  },
  {
    value: 3,
    label: 'Moderate',
  },
  {
    value: 5,
    label: 'Strong',
  },
  {
    value: 7,
    label: 'Very Strong',
  },
  {
    value: 9,
    label: 'Extreme',
  },
]

const useFormState = () => {
  const [state, setState] = useState({
    results: [{ sname: '', value: null }],
  })

  return {
    state,
    setState,
  }
}

// Make a custom hook for sharing your state between any components
const useSharedFormState = () => useBetween(useFormState)

const Btn = () => {
  const { combinedOptions, athleteId } = useSelector(
    (state) => state.athleteCriteria,
  )
  const dispatch = useDispatch()
  const { state } = useSharedFormState()

  const handleSubmit = (event) => {
    event.preventDefault()

    const optionValues = combinedOptions.map((m, index) =>
      state.results[state.results.findIndex((obj) => obj.sname === index)] ==
      undefined
        ? {
            Option1Id: m.option1Id,
            Option2Id: m.option2Id,
            CriteriaId: m.criteriaId,
            Value: 0,
          }
        : {
            Option1Id: m.option1Id,
            Option2Id: m.option2Id,
            CriteriaId: m.criteriaId,
            Value:
              state.results[
                state.results.findIndex((obj) => obj.sname === index)
              ].value,
          },
    )

    const optionsEvaluation = Object.assign(
      {},
      {
        athleteId: athleteId,
        optionValues: optionValues,
      },
    )
    dispatch(createOptionsEvaluation(optionsEvaluation))
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
      }}
    >
      <button onClick={handleSubmit} className="button">
        Submit
      </button>
    </div>
  )
}

const OptionPairComparison = (criteria, option1, option2, index) => {
  const classes = useStyles()
  const { state, setState } = useSharedFormState()

  const valuetext = (value) => {
    return `${value}`
  }

  const handleChange = (name) => (event, newValue) => {
    let list
    list = { sname: name, value: newValue }
    console.log(name)
    var index = state.results.findIndex((x) => x.sname === name)

    if (index === -1) setState({ results: [...state.results, list] })
    else {
      setState(({ results }) => ({
        results: [
          ...results.slice(0, index),
          {
            ...results[index],
            value: newValue,
          },
          ...results.slice(index + 1),
        ],
      }))
    }
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        <i>
          Criterion: {criteria}
          <br /> <br />
        </i>
      </Typography>
      <Grid container spacing={4}>
        <Grid item>
          <b>{option1}</b>
        </Grid>
        <Grid item xs>
          <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            onChange={handleChange(index)}
            aria-labelledby="discrete-slider"
            //valueLabelDisplay="auto"
            track={false}
            step={null}
            marks={marks}
            min={-9}
            max={9}
          />
        </Grid>
        <Grid item>
          <b>{option2}</b>
        </Grid>
      </Grid>
    </div>
  )
}

export { OptionPairComparison, Btn }
