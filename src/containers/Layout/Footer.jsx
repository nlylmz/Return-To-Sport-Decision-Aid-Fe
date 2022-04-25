import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

const Footer = (props) => {
  // eslint-disable-next-line
  const { children, ...attributes } = props

  return (
    <React.Fragment>
      <span>
        <a href="">&copy; 2021 Nilay Yılmaz</a>
      </span>
      <span className="ml-auto">Middle East Technical University</span>
    </React.Fragment>
  )
}

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer
