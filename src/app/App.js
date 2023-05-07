import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/users'
import Login from './layouts/login'
import Main from './layouts/main'
import NavBar from './components/ui/navBar'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
// в данном уроке создали правила в базе FAIRBASE чтения и записи пользоватилями
// получили ошибку что не аторизованны
// {
//     "rules": {
//       "user": {
//         ".read": "auth  !=null",
//         "$uid": {
//             ".write": "$uid === auth.uid"
//         }
//       },
//       "quality": {
//         ".read": true,
//         ".write": false
//       },
//       "profession": {
//         ".read": true,
//         ".write": false
//       },
//       "comment": {
//         ".read": "auth  !=null",
//             ".indexOn": ["pageId"],
//               "$cid": {
//                  ".write":"auth !=null&& ((data.child('userId').val() === auth.uid) || ( newData.child('userId').val() === auth.uid))"
//                 }
//       }
//     }
//   }

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    )
}

export default App
