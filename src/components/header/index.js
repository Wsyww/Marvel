import './header.less'

function Header(props) {

    const { title, info } = props

    info && info()

    return <div className='header-style'>Header:{ title }</div>
}

export default Header