import React, { useState } from 'react'
//import { Button } from '@progress/kendo-react-buttons'
const RedirectBox = (props) => {
  const {
    textColor,
    appIcon,
    appName,
    boxColor,
    appNameDetail,
    appURL,
    animation,
    funct,
    image,
  } = props

  const RedirectToApp = () => {
    if (appURL) {
      window.location = appURL
    } else {
      funct()
    }
  }

  return (
    <div className="redirect-box" style={{ backgroundColor: boxColor }}>
      <button
        className="redirect-box-button"
        style={{ color: textColor }}
        onClick={RedirectToApp}
      >
        <span className="redirect-box-icon-span" style={{ color: textColor }}>
          <div className="row-justify-content-center">
            {image ? (
              <img
                className={'redirect-box-icon' + animation}
                alt=""
                src={image}
              ></img>
            ) : (
              <i
                className={'redirect-box-icon' + animation + ' ' + appIcon}
                color={textColor}
              />
            )}
          </div>
          <div className="row-justify-content-center">
            <span className="redirect-box-app-name">{appName}</span>
          </div>
          <div className="row-justify-content-center">
            <span
              className="redirect-box-app-name-detail"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {/* {appNameDetail} */}
            </span>
          </div>
        </span>
      </button>
    </div>
  )
}

RedirectBox.defaultProps = {
  boxColor: 'rgba(218,37,28,0.9)',
  textColor: 'white',
  appIcon: 'fa fa-superpowers',
  appName: 'App Name',
  animation: '',
  appNameDetail: '',
  funct: () => {},
}

export default RedirectBox
