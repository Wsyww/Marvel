import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import Header from '@/components/header'
import './login.less'

function Login() {

    const navigate = useNavigate()

    return (
        <div className='login-style'>
            <Header title='login' info={() => {console.log('info:login')}} />
            <div className='login-item'>
                <Input placeholder='账号' />
            </div>
            <div className='login-item'>
                <Input.Password placeholder='密码' />
            </div>
            <div className='login-item'>
                <Button type='primary' block={true} onClick={() => {navigate('/home')}}>
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login