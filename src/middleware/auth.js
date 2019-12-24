const tokenLib = require('../lib/token');

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        let decoded = await tokenLib.verifyToken(token);

        if(decoded.sub != 'token')
        {
            const result = {
                status: 403,
                message: '잘못된 토큰'
            }
            res.status(403).json(result);
        }
        
        req.decoded = decoded;
    } catch(error) {
        let status = null;
        console.log(error);
        switch(error.message) {
            case 'jwt must be provided':
                status = 401,
                message = '토큰을 전송하세요.'
                break;
            case 'invalid signature':
            case 'jwt malformed':
            case 'invalid token':
                status = 401,
                message = '위조된 토큰입니다.'
                break;
            case 'jwt expired':
                status = 410,
                message = '토큰이 만료되었습니다.'
                break;
            default:
                status = 500,
                message = '서버 에러.'
                break;
        }

        const result = {
            status: status,
            message: message
        }
        
        res.status(status).json(result);

        return;
    }

    await next();
};

module.exports = verifyToken;