import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback'
import { useSelector } from "react-redux";


{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))

const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))




const AdminCossignments = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCossignments'))
const AdminEditCosignment = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditCosignment'))
const AdminCreateCossignment = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCreateCossignment'))


const AdminHistories = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminHistories'))
const AdminEditHistory = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditHistory'))
const AdminCreateHistories = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCreateHistories'))

const AdminEditAdmin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))

const AdminEmail = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEmail'))

function App() {
  let dispatch = useDispatch()
  let { adminToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(checkIfAdminIsLoggedIn())
    //await dispatch(getTheme())
  }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}

          <Route path='/adminsignup' element={<AdminSignup />} />

          {/* history routes */}
          <Route path='/admindashboard/histories/:cossignment' element={adminToken ? <AdminHistories status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/histories/:cossignment/:id' element={adminToken ? <AdminEditHistory status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/history/:cossignment' element={adminToken ? <AdminCreateHistories status={true} /> : <AdminLogin />} />

          {/* cossignment routes routes */}
          <Route path='/admindashboard/cossignments' element={adminToken ? <AdminCossignments status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/cossignments/:id' element={adminToken ? <AdminEditCosignment status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/cossignment' element={adminToken ? <AdminCreateCossignment status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/admin' element={adminToken ? <AdminEditAdmin status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/email' element={adminToken ? <AdminEmail status={true} /> : <AdminLogin />} />
        </Routes>
      </Suspense>
    </div>

  );
}

export default App;
