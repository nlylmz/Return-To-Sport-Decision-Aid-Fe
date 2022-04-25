import { PairComparison, Btn } from '~/components/PairComparison.jsx'
import React from 'react'
import { Card, CardBody, CardTitle, Col, Row, CardHeader } from 'reactstrap'
import { useSelector } from 'react-redux'

const Comparison = () => {
  const { combinedCriteria } = useSelector((state) => state.athleteCriteria)
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>Pairwise Comparisons of Criteria</CardHeader>
            <CardBody>
              <Row>
                <Col md="10">
                  <CardTitle className="mb-0">
                    On this page, you will make pairwise comparisons of the
                    criteria you selected. For each pair of criteria below,
                    please indicate which one is more important for you and by
                    which degree? The decision algorithm will assess the
                    consistency of your selections, and you will be requested to
                    revise them if they are inconsistent.
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  {combinedCriteria.map((list, index) => (
                    <div className="list-item" key={index}>
                      {PairComparison(list.criteria1, list.criteria2, index)}
                    </div>
                  ))}
                  <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    {Btn()}
                    <br />
                    <br />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Comparison
