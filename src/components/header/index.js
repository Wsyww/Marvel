import { connect } from 'react-redux'
import './header.less'

function Header(props) {

    const { title, info, myLoginData } = props

    info && info()

    return (
        <div className='header-style'>
            Header:{ title }
            <span style={{marginLeft: 20}}>myLoginData:{myLoginData}</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myLoginData: state.getIn(['login', 'myLoginData'])
    }
}

export default connect(mapStateToProps)(Header)