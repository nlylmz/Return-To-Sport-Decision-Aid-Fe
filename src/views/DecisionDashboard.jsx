import { Pie, Bar } from 'react-chartjs-2'
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Table } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FlexContainer, MarginBottomDiv } from '~/components/Styled'

const DecisionDashboard = () => {
  const dispatch = useDispatch()
  const { criteriaWeight, result, athelete } = useSelector(
    (state) => state.athleteCriteria,
  )

  const [state, setState] = useState({
    pieData: undefined,
    stackedDataLabel: [
      'Return to sport with high or low performance',
      'Practice with restrictions',
      'Physically not ready to sport',
    ],
  })

  const max = Math.max.apply(
    Math,
    result.map((i) => i),
  )
  const maxIndex = result.indexOf(max)

  const colorPalette = [
    '#f66d44',
    '#feae65',
    '#2d87bb',
    '#64c2a6',
    '#aadea7',
    '#e6f69d',
    '#c7e0f4',
  ]

  //console.log(crtName.map((data) => data.criteriaName))
  /*console.log(optCrtWeights.map((data) => data))

  let dataSets = []
  let size = crtCount
  for (let i = 0; i < size; i++) {
    dataSets.push({
      data: optCrtWeights[i],
      label: crtWeight[i].criteriaName,
      backgroundColor: optCrtWeights.map(
        (d) =>
          'rgba(' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ', 0.5)',
      ),
      categoryPercentage: 1,
      barPercentage: 1,
      pointStyle: 'rectRounded',
    })
  }
  setState({ ...state, stackedData: dataSets })*/

  useEffect(() => {
    if (criteriaWeight !== undefined) {
      let colorArrayCriteria = []
      colorArrayCriteria.push(colorPalette[6])

      const crtLabels = criteriaWeight.map((m) => m.criteriaName)
      const crtWeightPercent = criteriaWeight.map((m) => m.weight)
      const pieChartData = {
        labels: crtLabels,
        datasets: [
          {
            label: 'Criteria Importance',
            //backgroundColor: colorArrayCriteria,
            data: crtWeightPercent,
            backgroundColor: [
              '#003f5c',
              '#374c80',
              '#7a5195',
              '#bc5090',
              '#ef5675',
              '#ff764a',
              '#ffa600',
            ],
            /*             borderColor: [
              'rgba(255,99,88, 1)',
              'rgba(120,210,55, 1)',
              'rgba(246, 109, 68, 1)',
              'rgba(254, 174, 101, 1)',
              'rgba(45, 135, 187, 1)',
              'rgba(100, 194, 166, 1)',
            ], */
            borderWidth: 1,
          },
        ],
      }
      setState({ ...state, pieData: pieChartData })
    }
  }, [criteriaWeight])

  const renderOptionTable = (result) => {
    if (criteriaWeight === undefined) {
      return null
    }
    const tableOptContent = result.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{ fontWeight: 500, color: '#0273c3' }}>
            {index + 1 + `. ` + state.stackedDataLabel[index]}
          </td>
          <td style={{ textAlign: 'center', backgroundColor: '#f1f9fd' }}>
            {item != null ? (item * 100).toFixed(0) + '%' : null}
          </td>
        </tr>
      )
    })
    return <>{tableOptContent}</>
  }

  const renderTableRow = (criteriaWeight) => {
    if (criteriaWeight === undefined) {
      return null
    }

    const tableContent = criteriaWeight.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{ fontWeight: 500, color: '#0273c3' }}>
            {index + 1 + `. ` + item.criteriaName}
          </td>
          <td style={{ textAlign: 'center', backgroundColor: '#f1f9fd' }}>
            {item.weight != null ? (item.weight * 100).toFixed(0) + '%' : null}
          </td>
        </tr>
      )
    })
    return <>{tableContent}</>
  }

  const barChartScaleOptions = {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  }

  const resultBarChartData = {
    labels: [state.stackedDataLabel],
    datasets: [
      {
        label: 'Return to sport with high or low performance',
        data: [(result[0] * 100).toFixed(0)],
        backgroundColor: '#ffa600',
      },
      {
        label: 'Practice with restrictions',
        data: [(result[1] * 100).toFixed(0)],
        backgroundColor: '#ff764a',
      },
      {
        label: 'Physically not ready to sport',
        data: [(result[2] * 100).toFixed(0)],
        backgroundColor: '#ef5675',
      },
    ],
  }

  /*const weightOptStackedChartData = {
    labels: [state.stackedDataLabel],
    responsive: true,
    offset: true,
    datasets: [state.stackedData],
  }*/

  const charts = (
    <FlexContainer>
      <Col md={3}>
        <FlexContainer>
          <MarginBottomDiv>
            <Bar
              data={resultBarChartData}
              height={480}
              options={{
                title: {
                  display: true,
                  text: 'Scores of Alternatives',
                  fontSize: 16,
                  fontColor: '#000000',
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        min: 0,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        display: false, //this will remove only the label
                      },
                    },
                  ],
                },
                maintainAspectRatio: true,
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </MarginBottomDiv>
        </FlexContainer>
      </Col>
      <Col md={3}>
        <Card>
          <CardBody>
            <Table responsive size="md">
              <thead>
                <tr>
                  <th style={{ width: '100%' }}>
                    Alternative with Highest Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500, color: '#000000' }}>
                    {state.stackedDataLabel[maxIndex]}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          {/* <CardHeader>
            <i className="fa fa-align-justify"></i> Option Weight
          </CardHeader> */}
          <CardBody>
            <Table responsive size="md">
              <thead>
                <tr>
                  <th style={{ width: '80%' }}>Decision Alternative</th>
                  <th style={{ width: '20%' }}>Score</th>
                </tr>
              </thead>
              <tbody>{renderOptionTable(result)}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      {/* <MarginBottomDiv>
        <Bar
          data={weightOptStackedChartData}
          height={350}
          options={{
            maintainAspectRatio: true,
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: `Option Values Based on Criteria Weight`,
              fontSize: 15,
              fontColor: '#000000',
            },
            scales: barChartScaleOptions,
          }}
        />
      </MarginBottomDiv> */}
      <Col md={3}>
        <FlexContainer>
          <MarginBottomDiv>
            <Pie
              data={state.pieData ?? []}
              height={480}
              options={{
                maintainAspectRatio: true,
                pieceLabel: {
                  render: 'value',
                  fontColor: 'black',
                  fontStyle: 'bold',
                },
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    fontSize: 12,
                    fontColor: '#000000',
                    fontStyle: 'bold',
                  },
                },
                title: {
                  display: true,
                  text: 'Criteria Importance',
                  fontSize: 16,
                  fontColor: '#000000',
                },
              }}
            />
          </MarginBottomDiv>
        </FlexContainer>
      </Col>
      <Col md={3}>
        <Card>
          <CardBody>
            <Table responsive size="md">
              <thead>
                <tr>
                  <th style={{ width: '100%' }}>Athlete Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500, color: '#000000' }}>
                    {athelete.firstName + ' ' + athelete.lastName}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Table responsive size="md">
              <thead>
                <tr>
                  <th style={{ width: '80%' }}>Criteria Name</th>
                  <th style={{ width: '20%' }}>Importance</th>
                </tr>
              </thead>
              <tbody>{renderTableRow(criteriaWeight)}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </FlexContainer>
  )

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          This page presents relative preference of each decision alternative
          and relative importance of criteria that are computed based on your
          pairwise evaluations.
        </CardHeader>
        <CardBody>{charts}</CardBody>
      </Card>
    </div>
  )
}

export default DecisionDashboard
