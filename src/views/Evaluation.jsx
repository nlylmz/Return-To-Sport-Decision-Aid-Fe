import {
  OptionPairComparison,
  Btn,
} from '~/components/OptionPairComparison.jsx'
import React from 'react'
import { Card, CardBody, CardTitle, Col, Row, CardHeader } from 'reactstrap'
import { useSelector } from 'react-redux'

const Evaluation = () => {
  const { combinedOptions } = useSelector((state) => state.athleteCriteria)
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>Evaluation of Options Based on Criteria</CardHeader>
            <CardBody>
              <Row>
                <Col md="11">
                  <CardTitle className="mb-0">
                    This page makes pairwise comparisons of decision
                    alternatives for each criterion that is considered to be
                    important by the athlete. For each criterion and each pair
                    of decision alternative below, please indicate which one is
                    more preferable for you and by which degree? The decision
                    algorithm will assess the consistency of your selections,
                    and you will be requested to revise them if they are
                    inconsistent.
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  {combinedOptions.map((list, index) => (
                    <div className="list-item" key={index}>
                      {OptionPairComparison(
                        list.criteria,
                        list.option1,
                        list.option2,
                        index,
                      )}
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

export default Evaluation
