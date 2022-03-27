import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import Header from '@/components/header'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import { apiReqs } from '@/api'
import './login.less'

function Login(props) {
    const { myLoginData, setData } = props

    const navigate = useNavigate()

    const [ account, setAccount ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const login = () => {
        apiReqs.signIn({
            data: {
                account,
                password
            },
            success: (res) => {
                console.log(res)
                navigate('/home')
            }
        })
    }

    return (
        <div className='login-style'>
            <Header title='login' info={() => {console.log('info:login')}} />
            <div className='login-item'>login store: myData = {myLoginData}</div>
            <div className='login-item'>
                <button onClick={() => {setData('123456')}}>更改login store的myData</button>
            </div>
            <div className='login-item'>
                <Input placeholder='账号' value={account} onChange={(e) => {setAccount(e.target.value)}} />
            </div>
            <div className='login-item'>
                <Input.Password placeholder='密码' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div className='login-item'>
                <Button type='primary' block={true} onClick={login}>
                    登录
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myLoginData: state.getIn(['login', 'myLoginData'])
    }
}

const mapDispatchToProps = (dispatch) => ({
    setData(data) {
        const action = actionCreators.setData(data)
        dispatch(action)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)