import React, { useState } from 'react'

const AthleteList = (lists, handleSelected) => {
  const [state, setState] = useState({
    selected: null,
  })

  const onSelect = (athleteId) => {
    setState({
      ...state,
      selected: athleteId,
    })
    handleSelected(athleteId)
  }

  const toDoList = lists.map((list) => {
    return (
      <div
        className="list-item"
        style={{
          backgroundColor: state.selected === list.id ? '#CCE5FF' : '',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={list.id}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(list.id)}
        onKeyDown={() => onSelect(list.id)}
      >
        {list.athleteInfo}
      </div>
    )
  })

  return <div className="list-wrapper">{toDoList}</div>
}

export default AthleteList
