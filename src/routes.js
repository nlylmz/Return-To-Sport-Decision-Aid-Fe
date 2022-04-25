import Comparison from './views/Comparison'
import Criteria from './views/Criteria'
import SignUp from './views/SignUp'
import Athletes from './views/Athletes'
import AthletePage from './views/AthletePage'
import DoctorPage from './views/DoctorPage'
import HomePage from './views/HomePage'
import DecisionDashboard from './views/DecisionDashboard'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/comparison', name: 'Comparison', component: Comparison },
  { path: '/criteria', name: 'Criteria', component: Criteria },
  { path: '/signUp', name: 'SignUp', component: SignUp },
  { path: '/athletes', name: 'Athletes', component: Athletes },
  { path: '/athletePage', name: 'AthletePage', component: AthletePage },
  {
    path: '/doctorPage',
    name: 'ClinicianPage',
    component: DoctorPage,
  },
  { path: '/homePage', name: 'HomePage', component: HomePage },
  {
    path: '/decisionDashboard',
    name: 'DecisionDashboard',
    component: DecisionDashboard,
  },
]

export default routes
