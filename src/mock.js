import Mock from 'mockjs'

const domain = '/api/'

Mock.mock(domain + 'login', function () {
    let result = {
        code: 200,
        message: 'OK',
        data: {
            loginUid: 10000,
            nickname: 'Truth',
            token: 'yyds2022'
        }
    }
    return result
})