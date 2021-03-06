import React from 'react'
import { observer } from 'mobx-react'
import UserStore from './Stores/UserStore'
import LoginForm from './LoginForm'

import SubmitButton from './SubmitButton'
import './Login.css'
import BeerAnimation from './BeerAnimation'

class Login extends React.Component {
    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            let result = await res.json()
            if (result && result.success) {
                UserStore.loading = false
                UserStore.isLoggedIn = true
                UserStore.username = result.username
            } else {
                UserStore.loading = false
                UserStore.isLoggedIn = false
            }
        } catch (e) {
            UserStore.loading = false
            UserStore.isLoggedIn = false
        }
    }

    async doLogout() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            let result = await res.json()
            if (result && result.success) {
                UserStore.isLoggedIn = false
                UserStore.username = ''
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (UserStore.loading) {
            return (
                <div className="appL">
                    <div className="containerL">loading, please wait..</div>
                </div>
            )
        } else {
            if (UserStore.isLoggedIn) {
                return (
                    <div className="appL">
                        <div className="containerL">
                            Welcome{UserStore.username}
                            <SubmitButton
                                text={'Log out'}
                                disable={false}
                                onClick={() => this.doLogout()}
                            />
                        </div>
                    </div>
                )
            }

            return (
                <div className="appL ">
                    <div className="containerL ">
                        <LoginForm />
                        <BeerAnimation />
                    </div>
                </div>
            )
        }
    }
}

export default observer(Login)
