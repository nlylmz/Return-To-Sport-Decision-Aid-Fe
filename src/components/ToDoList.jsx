import React, { useState } from 'react'

import { Tooltip } from 'reactstrap'
//import './ToDoList.style.css';

const ToDoList = (lists, onDelete) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)

  const toDoList = lists.map((list) => {
    return (
      <div className="list-item" key={list.id}>
        <span href="#" id={'tooltip-' + list.id}>
          {list.task}{' '}
        </span>
        <Tooltip
          placement="right"
          trigger="hover"
          isOpen={tooltipOpen}
          target={'tooltip-' + list.id}
          toggle={toggle}
        >
          {list.definition}
        </Tooltip>
        <button
          className="delete is-pulled-right"
          onClick={() => onDelete(list.id)}
        ></button>
      </div>
    )
  })

  return <div className="list-wrapper">{toDoList}</div>
}

export default ToDoList
