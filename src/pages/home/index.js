import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import Header from '@/components/header'
import { goto } from '@/api'
import './home.less'

function  Home() {

    const navigate = useNavigate()

    return (
        <div className='home-style'>
            <Header title='home' info={() => {console.log('info:home')}} />
            <h1>Marvel</h1>
            <div className='home-item'>
                <Button onClick={() => {goto('/login')}}>组件外跳转</Button>
            </div>
            <div className='home-item'>
                <Button onClick={() => {navigate('/login')}}>返回登录</Button>
            </div>
        </div>
    )
}

export default Home