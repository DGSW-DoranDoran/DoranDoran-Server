const colors = require('colors');
const models = require('../../models');
const slack = require('../../middleware/logging');

exports.getGroups = async (req, res) => {
    console.log(colors.green('[GET] Get Groups'));

    const { category_id } = req.query;

    var msg = "";
    var result = {};

    try {
        if (!category_id) {
            const groups = await models.Group.getAllGroups();

            msg = "전체 그룹 조회 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
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

            result = {
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

        result = {
            status: 500,
            message: msg,
            data: {
                error
            }
        };

        res.status(500).json(result);
    };
    
    result.body = Object.values(req.body);
    result.query = Object.values(req.query);

    slack(result);
};

exports.getGroupInfo = async (req, res) => {
    console.log(colors.green('[GET] Group Info'));

    const { group_id } = req.query;

    var msg = "";
    var result = {};

    if (!group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const groupInfo = await models.Group.getGroupInfo(group_id);
            const groupMember = await models.GroupMember.getMembers(group_id);

            groupInfo.dataValues.groupMember = groupMember

            msg = "그룹 정보 조회 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
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

exports.createGroup = async (req, res) => {
    console.log(colors.yellow('[POST] Create Group'));

    const { body } = req;

    var msg = "";
    var result = {};

    if (!body.name) {
        msg = "name이 없습니다.";

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_time) {
        msg = "deadline_time이 없습니다.";

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_member_count) {
        msg = "deadline_member_count가 없습니다.";

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.category_id) {
        msg = "category_id이 없습니다.";

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            await models.Group.createGroup(body);

            msg = "그룹 생성 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        } catch (error) {
            console.log(colors.red(error));

            msg = "서버 에러";

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

exports.modifyGroup = async (req, res) => {
    console.log(colors.blue('[PUT] Modify Group'));

    const { body } = req;

    var msg = "";
    var result = {};

    if (!body.group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.red('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            await models.Group.modify(body);

            msg = "그룹 정보 수정 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        } catch (error) {
            msg = "서버 에러";

            console.log('ServerError: ' + error);

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

exports.delete = async (req, res) => {
    console.log(colors.red('[DELETE] Delete Group'));

    const { group_id } = req.body;

    var msg = "";
    var result = {};

    if (!group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.red('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            await models.Group.delete(group_id);

            msg = "그룹 삭제 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
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