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
            const retVal = [];
            const groups = await models.Group.getAllGroups();

            for (let index = 0; index < groups.length; index += 1) {
                const group = groups[index];
                const groupMember = await models.GroupMember.getMembers(group.id);
                group.members = groupMember;
                group.dataValues.member_count = groupMember.length;

                groups[index] = group;
            }

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

        console.log(colors.magenta('Error: ' + msg));

        const result = {
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

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_time) {
        msg = "deadline_time이 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.deadline_member_count) {
        msg = "deadline_member_count가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.category_id) {
        msg = "category_id이 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const member = req.decoded;

            const insertResult = await models.Group.createGroup(body, member.id);
            console.log(insertResult.founder);
            console.log(insertResult.id);

            const join = {
                isAdmin: 1,
                member_status: 1,
                group_id: insertResult.id,
                member_id: member.id
            };

            console.log(join)

            await models.GroupMember.join(join);

            msg = "그룹 생성 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        } catch (error) {
            console.log(colors.red('ServerError: ' + error));

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
    const member = req.decoded;

    const found = await models.Group.findGroupFounder(body.group_id);

    var msg = "";
    var result = {};

    console.log(member);
    console.log(found)

    if (!body.group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
     } else if(member.id != found.founder) {
         
        msg = "권한이 없습니다."
        const result = {
            status: 400,
            message: msg
        }

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

exports.delete = async (req, res) => {
    console.log(colors.red('[DELETE] Delete Group'));

    const { group_id } = req.body;
    const member = req.decoded;

    const found = await models.Group.findGroupFounder(group_id);
    
    var msg = "";
    var result = {};

    if (!group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if(member.id != found.founder) {
        
        msg = "권한이 없습니다."
        const result = {
            status: 400,
            message: msg
        }

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

exports.joinGroup = async (req, res) => {
    console.log(colors.green('[GET] Get Groups'));

    const { group_id } = req.body;
    const member = req.decoded;

    let result = {};
    let InsertResult = {};

    console.log(group_id);
    console.log(member.id);

    const checkDistinct = await models.GroupMember.checkDistinct(group_id, member.id);

    console.log(checkDistinct);

    try {
        if (!group_id) {
            msg = "group_id가 없습니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 400,
                message: msg
            };

            res.status(400).json(result);
        }
        else if(!checkDistinct) {
            msg = "이미 신청중인 그룹입니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else {
            const join = {
                isAdmin: 0,
                member_status: 0,
                group_id: group_id,
                member_id: member.id
            };

            InsertResult = await models.GroupMember.join(join);

            const msg = "신청 성공";

            result = {
                status: 200,
                message: msg,
                data: {
                    InsertResult
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
};

exports.accecptJoin = async (req, res) => {
    console.log(colors.green('[GET] Get Groups'));

    const { group_id, member_id } = req.body;
    const member = req.decoded;

    let result = {};
    let InsertResult = {};

    console.log(group_id);
    console.log(member.id);

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);

    console.log(checkFounder);

    try {
        if (!group_id) {
            msg = "group_id가 없습니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 400,
                message: msg
            };

            res.status(400).json(result);
        } else if(!member_id) {
            msg = "member_id 없습니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 400,
                message: msg
            };

            res.status(400).json(result);
        } else if(!checkFounder) {
            msg = "신청한 유저가 아닙니다";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        }
        else {
            
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
};