import styled from 'styled-components'

// These are test styled components
const TestCard = styled.div`
  background-color: #fff;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 0.3em;
`
const TestTitle = styled.h1`
  border-bottom: 1px solid #d5d5d5;
  padding: 0.2em;
  font-size: 24px;
  margin: 0 0 0.5em;
  font-weight: 400;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`

const MarginBottomDiv = styled.div`
  margin-bottom: 1.5rem;
`

const DateButton = styled.button`
  font-family: Roboto;
  font-weight: bold;
  width: 150px;
  font-size: 16px;
`

export { TestCard, TestTitle, FlexContainer, MarginBottomDiv, DateButton }
