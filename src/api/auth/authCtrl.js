const colors = require('colors');
const models = require('../../models');
const jwt = require('../../lib/token');
const slack = require('../../middleware/logging');

exports.login = async (req, res) => {
    console.log(colors.yellow('[POST] Login'));

    const { id, password } = req.body;

    var msg = "";
    var result = {};

    if (!id) {
        msg = "id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!password) {
        msg = "password가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const member = await models.Member.login(id, password);

            if (!member) {
                msg = 'id 또는 password가 잘못되었습니다.';

                console.log(colors.magenta('Error: ' + msg));

                result = {
                    status: 403,
                    message: msg
                };

                res.status(403).json(result);
            } else {
                msg = '로그인 성공';

                console.log(colors.green('Success: ', msg));

                const token = await jwt.createToken(member.id, member.name);

                console.log(token);

                result = {
                    status: 200,
                    message: msg,
                    data: {
                        token: token,
                        member: member
                    }
                };

                res.status(200).json(result);
            }
        } catch (error) {
            msg = '서버 에러';

            console.log(colors.red('ServerError: ' + error));

            result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        }
    };
    
    result.body = Object.values(req.body);
    result.query = Object.values(req.query);

    slack(result);
};

exports.register = async (req, res) => {
    console.log(colors.yellow('[POST] Register'));

    const { body } = req;

    var msg = "";
    var result = {};

    if (!body.id) {
        msg = "id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.password) {
        msg = "password가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.name) {
        msg = "name이 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.phone) {
        msg = "phone이 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.gender) {
        msg = "gender가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.grade) {
        msg = "grade가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.position) {
        msg = "position이 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const check = await models.Member.DuplicateCheck(body.id);

            if (!check) {
                await models.Member.register(body);

                msg = "회원가입 성공";

                result = {
                    status: 200,
                    message: msg
                };

                res.status(200).json(result);

                console.log('Success: ' + msg);
            } else {
                msg = "이미 등록된 아이디입니다.";

                console.log(colors.magenta('Error: ' + msg));

                result = {
                    status: 409,
                    message: msg
                };

                res.status(409).json(result);
            }
        } catch (error) {
            msg = "서버 에러";

            console.log(colors.red('ServerError: ' + error));

            result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        };
    };
    
    result.body = Object.values(req.body);
    result.query = Object.values(req.query);
    
    slack(result);
};

exports.findInfo = async (req, res) => {
    console.log(colors.yellow('[GET] info'));

    const { member_id } = req.body;

    var msg = "";
    var result = {};

    if (!member_id) {
        msg = "member_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const info = await models.Member.findInfo(member_id);
            const groupInfo = await models.GroupMember.getMyInfo(member_id);

            if (!info) {
                msg = '잘못된 id입니다.';

                console.log(colors.magenta('Error: ' + msg));

                result = {
                    status: 403,
                    message: msg
                };

                res.status(403).json(result);
            } else {
                msg = '조회 성공';

                console.log(colors.green('Success: ', msg));

                result = {
                    status: 200,
                    message: msg,
                    data: {
                        info: info,
                        group: {
                            groupInfo: groupInfo
                        }
                    }
                };

                res.status(200).json(result);
            }
        } catch (error) {
            msg = '서버 에러';

            console.log(colors.red('ServerError: ' + error));

            result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        }
    };
    
    result.body = Object.values(req.body);
    result.query = Object.values(req.query);

    slack(result);
};