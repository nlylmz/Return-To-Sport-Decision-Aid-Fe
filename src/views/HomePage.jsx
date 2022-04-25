import React, { useState } from 'react'
import RedirectBox from '~/components/RedirectBox'
import backgroundImage from '~/assets/img/medical.jpg'
import athlete from '~/assets/img/athlete.png'

const doctorPage = 'http://localhost:3000/doctorPage'
const athletePage = 'http://localhost:3000/athletePage'

const HomePage = () => {
  const [notification, setNotification] = useState(false)

  const backroundImage = backgroundImage

  const showNotification = () => {
    setNotification(true)
  }
  const hideNotification = () => {
    setNotification(false)
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div
        style={{
          borderBox: 'none',
          height: window.screen.height * (89 / 100) - 195,
          backgroundSize: '100% 100%',
          backgroundImage: `url(${backroundImage})`,
        }}
      >
        <div>
          <img
            //src={logo}
            alt=""
            style={{
              marginTop: '2%',
              width: window.screen.width > 1024 ? '12%' : '35%',
              height: window.screen.height > 1024 ? '30%' : '15%',
              marginLeft: '2%',
            }}
          />
        </div>
        <div
          className="row justify-content-center"
          style={{
            color: '#000080',
            fontWeight: 'bold',
            marginTop: '4%',
          }}
        >
          <h1>Welcome to Return to Play in Sport Decision Aid System!</h1>
        </div>
        <br />
        <div
          className="row justify-content-center"
          style={{
            color: '#000080',
            fontWeight: 'bold',
          }}
        >
          <h3>Please choose your role below...</h3>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6" style={{ marginTop: '80px' }}>
            <div className="row mb-6">
              <div className="col-md-1"></div>
              <div
                className="col-lg-4 col-md-4 col-sm-4"
                style={{ border: 'none' }}
              >
                <RedirectBox
                  appName="Healthcare Professional"
                  //image={doctor}
                  appIcon="fa fa-stethoscope"
                  boxColor="#000080"
                  appURL={doctorPage}
                  animation="YRotate"
                  funct={showNotification}
                />
              </div>
              <div className="col-md-2"></div>
              <div
                className="col-lg-4 col-md-4 col-sm-4"
                style={{ border: 'none' }}
              >
                <RedirectBox
                  appName="Athlete"
                  boxColor="#000080"
                  appIcon="fa fa-futbol-o"
                  //image={athlete}
                  appURL={athletePage}
                  animation="Rotate"
                  funct={showNotification}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
