import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import PropTypes from 'prop-types'

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import logo from '/assets/metu.jpg'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

const Header = (props) => {
  const { children, ...attributes } = props

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 70, height: 55, alt: 'CoreUI Logo' }}
        //minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
    </React.Fragment>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
