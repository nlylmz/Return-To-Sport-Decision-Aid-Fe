import { Pie } from 'react-chartjs-2'
import React, { useState, useEffect } from 'react'
import { Card, CardBody, Col, CardHeader, Table } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FlexContainer, MarginBottomDiv } from '~/components/Styled'

const DecisionDashboard = () => {
  const dispatch = useDispatch()
  const { criteriaWeight, result } = useSelector(
    (state) => state.athleteCriteria,
  )

  const { firstName, lastName } = useSelector((state) => state.athlete)

  const [state, setState] = useState({
    pieData: undefined,
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
            label: 'Criteria Weight Percentage',
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

  const charts = (
    <FlexContainer>
      {/* <Col md={3}>
        <Card>
          <CardBody>
            <Table responsive size="md">
              <thead>
                <tr>
                  <th style={{ width: '100%' }}>Athlete Criteria Result</th>
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
      </Col> */}
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
                    {firstName + ' ' + lastName}
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
          This page presents relative importance of criteria that are computed
          based on your pairwise criteria evaluations.
        </CardHeader>
        <CardBody>{charts}</CardBody>
      </Card>
    </div>
  )
}

export default DecisionDashboard
