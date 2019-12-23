const colors = require('colors');
const models = require('../../models');

exports.getGroups = async (req, res) => {
    console.log(colors.green('[GET] Get Groups'));

    const { category_id } = req.query;

    var msg = "";

    try {
        if (!category_id) {
            const groups = await models.Group.getAllGroups();

            msg = "전체 그룹 조회 성공";

            console.log(colors.green('Success: ' + msg));

            const result = {
                status: 200,
                message: msg,
                data: {
                    groups
                }
            };

            res.status(200).json(result);
        } else {
            const groups = await models.Group.getCategoryGroups(category_id);

            msg = "카테고리 그룹 조회 성공";

            console.log(colors.green('Success: ' + msg));

            const result = {
                status: 200,
                message: msg,
                data: {
                    groups
                }
            };

            res.status(200).json(result);
        };
    } catch (error) {
        msg = "서버 에러";

        console.log(colors.red('ServerError: ' + error));

        const result = {
            status: 500,
            message: msg,
            data: {
                error
            }
        };

        res.status(500).json(result);
    };
};

exports.getGroupInfo = async (req, res) => {
    console.log(colors.green('[GET] Group Info'));

    const { group_id } = req.query;

    var msg = "";

    if (!group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const groupInfo = await models.Group.getGroupInfo(group_id);

            msg = "그룹 정보 조회 성공";

            console.log(colors.green('Success: ' + msg));

            const result = {
                status: 200,
                message: msg,
                data: {
                    groupInfo
                }
            };

            res.status(200).json(result);
        } catch (error) {
            msg = "서버 에러";

            console.log(colors.red('ServerError: ' + error));

            const result = {
                status: 500,
                message: msg,
                data: {
                    error: error
                }
            };

            res.status(500).json(result);
        };
    };
};

exports.createGroup = async (req, res) => {
    console.log(colors.yellow('[POST] Create Group'));

    const { body } = req;

    var msg = "";

    if (!body.name) {
        msg = "name이 없습니다.";

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_time) {
        msg = "deadline_time이 없습니다.";

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_member_count) {
        msg = "deadline_member_count가 없습니다.";

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.category_id) {
        msg = "category_id이 없습니다.";

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {

            console.log(body);
            await models.Group.createGroup(body);

            msg = "그룹 생성 성공";

            console.log(colors.green('Success: ' + msg));

            const result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        } catch (error) {
            console.log(colors.red(error));

            msg = "서버 에러";

            const result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        };
    };
};