import axios from 'axios'
import { createHashHistory } from 'history'
import { Modal } from 'antd'

let history = createHashHistory()

export const goto = (path) => {
    history.push(path)
}

// 开发环境地址
let API_DOMAIN = '/api/'
if (process.env.NODE_ENV === 'production') {
    API_DOMAIN = 'http://xxxxx/api/'
}

export const SESSION_LOGIN_INFO = 'loginInfo'

export const API_CODE = {
    OK: 200,
    ERR_DATA: 403,
    ERR_NO_DATA: 301,
    ERR_LOGOUT: 401,
}

export const API_FAILED = '网络连接异常，请稍后再试'
export const API_LOGOUT = '您的账号已在其它设备登录，请重新登录'

export const apiReqs = {
    signIn: (config) => {
        axios.post(API_DOMAIN + 'login', config.data).then((res) => {
            let result = res.data
            config.done && config.done(result)
            if(result.code === API_CODE.OK) {
                window.localStorage.setItem(
                    SESSION_LOGIN_INFO,
                    JSON.stringify({
                        uid: result.data.loginUid,
                        nickName: result.data.nickname,
                        token: result.data.token
                    })
                )
                config.success && config.success(result)
            } else {
                config.fail && config.fail(result)
            }
        }).catch(() => {
            config.done && config.done()
            config.fail &&
            config.fail({
                message: API_FAILED
            })
        })
    },

    signOut: () => {
        const { uid, token } = getLocalLoginInfo()
        let headers = {
            loginUid: uid,
            'access-token': token
        }
        let axiosConfig = {
            method: 'post',
            url: API_DOMAIN + 'logout',
            headers,
        }
        axios(axiosConfig).then((res) => {
            logout()
        }).catch(() => {
            logout()
        })
    },

    getUserList: (config) => {
        config.method = 'get'
        config.url = API_DOMAIN + 'user/getUserList'
        apiRequest(config)
    },

    modifyUser: (config) => {
        config.url = API_DOMAIN + 'user/modify'
        apiRequest(config)
    }
}

export function getLocalLoginInfo() {
    return JSON.parse(window.localStorage[SESSION_LOGIN_INFO])
}

export function logout() {
    window.localStorage.removeItem(SESSION_LOGIN_INFO)
    history.push('/login')
}

/*
 * API请求封装（带验证信息）
 * config.history: [必填]用于页面跳转等逻辑
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */

export function apiRequest(config) {
    const loginInfo = JSON.parse(window.localStorage.getItem(SESSION_LOGIN_INFO))
    if(config.data === undefined) {
        config.data = {}
    }
    config.method = config.method || 'post'

    let headers = {
        loginUid: loginInfo ? loginInfo.uid : null,
        'access-token': loginInfo ? loginInfo.token : null, 
    }

    let data = null

    if (config.formData) {
        headers['content-Type'] = 'multipart/form-data'
        data = new FormData()
        Object.keys(config.data).forEach(function (key) {
            data.append(key, config.data[key])
        })
    } else {
        data = config.data
    }

    let axiosConfig = {
        method: config.method,
        url: config.url,
        headers
    }

    if(config.message === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }

    axios(axiosConfig).then((res) => {
        let result = res.data
        config.done && config.done()

        if(result.code === API_CODE.ERR_LOGOUT) {
            Modal.error({
                title: result.message,
                onOk: () => {
                    logout()
                }
            })
        } else {
            config.success && config.success(result)
        }
    }).catch((err) => {
        Modal.error({
            title: API_FAILED,
        })
        config.fail && config.fail()
        config.done && config.done()
    })
}