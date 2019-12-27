const colors = require('colors');
const models = require('../../models');
const slack = require('../../middleware/logging');
const moment = require('moment');

exports.getGroups = async (req, res) => {
    console.log(colors.green('[GET] Get Groups'));

    const { category_id } = req.query;

    console.log(req.query);

    var msg = "";
    var result = {};

    try {
        if (!category_id) {
            const groups = await models.Group.getAllGroups();

            for (let index = 0; index < groups.length; index += 1) {
                const group = groups[index];
                const groupMember = await models.GroupMember.getMembers(group.id);
                group.members = groupMember;
                group.dataValues.member_count = groupMember.length;
                group.dataValues.create_time = moment(group.create_time).format('lll');
                group.dataValues.deadline_time = moment(group.deadline_time).format('lll');

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

    console.log(req.query);

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

            console.log(groupInfo);

            if (!groupInfo) {
                msg = "없는 그룹입니다.";

                console.log(colors.magenta("Error: " + msg));

                result = {
                    status: 1000,
                    message: msg
                }

                res.status(1000).json(result);
            } else {
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

exports.createGroup = async (req, res) => {
    console.log(colors.yellow('[POST] Create Group'));

    const { body } = req;

    console.log(body);

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

            if (req.file !== undefined) {
                body.image = req.file.path;
            }

            const insertResult = await models.Group.createGroup(body, member.id);

            const join = {
                isAdmin: 1,
                member_status: 1,
                group_id: insertResult.id,
                member_id: member.id
            };

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

    console.log(body);

    const found = await models.Group.findGroupFounder(body.group_id);

    var msg = "";
    var result = {};

    if (!body.group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (member.id != found.founder) {

        msg = "권한이 없습니다."
        const result = {
            status: 400,
            message: msg
        }

        res.status(400).json(result);
    } else {
        try {
            body.image = req.file.path;
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

    console.log(body);

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
    } else if (member.id != found.founder) {

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
    console.log(colors.yellow('[POST] Join Group'));

    const { group_id } = req.body;
    const member = req.decoded;

    console.log(req.body);

    let result = {};
    let InsertResult = {};

    console.log(group_id);
    console.log(member.id);

    const checkDistinct = await models.GroupMember.checkDistinct(group_id, member.id);

    const checkStatus = await models.Group.findStatus(group_id);

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
        else if (!checkDistinct) {
            msg = "이미 신청중인 그룹입니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else if(checkStatus.status === 1) {
            msg = "신청이 마감된 그룹입니다";

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

            const msg = "그룹 신청 성공";

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
    console.log(colors.blue('[PUT] Accecpt Join'));

    const { group_id, member_id } = req.body;
    const member = req.decoded;

    console.log(req.body);
    console.log(member);

    let result = {};
    let InsertResult = {};

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);
    const checkMember = await models.GroupMember.checkMember(group_id, member_id);

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
        } else if (checkFounder === false) {
            msg = "권한이 없습니다.(개설자 X)";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else if(checkMember === null) {
            msg = "신청한 유저가 아닙니다";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else if(checkMember === false) {
            msg = "이미 가입된 유저입니다";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else {
            InsertResult = await models.GroupMember.updateMemberStatus(group_id, member_id);

            let count = await models.Group.findMemberCount(group_id);

            if(InsertResult != undefined) {
                res.status(500).json(InsertResult);
            }

            msg = "신청을 수락했습니다";

            result = {
                status: 200,
                message: msg,
            };

            await models.Group.plusMemberCount(group_id, ++count.member_count);

            count = await models.Group.findMemberCount(group_id);

            const deadlineCount = await models.Group.findDeadlineCount(group_id);

            console.log(count);
            console.log(deadlineCount);

            if(deadlineCount.deadline_member_count === count.member_count)
            {
                await models.Group.changeStatus(group_id);
            }

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

exports.lockGroup = async (req, res) => {
    console.log(colors.blue('[PUT] Accecpt Join'));

    const { group_id } = req.body;
    const member = req.decoded;

    console.log(req.body);
    console.log(member);

    let result = {};

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);

    try {
        if (!group_id) {
            msg = "group_id가 없습니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 400,
                message: msg
            };

            res.status(400).json(result);
        } else if (!member) {
            msg = "토큰이 없습니다.";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 400,
                message: msg
            };

            res.status(400).json(result);
        } else if (checkFounder === false) {
            msg = "권한이 없습니다.(개설자 X)";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        } else {
            await models.Group.changeStatus(group_id);

            msg = "변경 성공";

            result = {
                status: 200,
                message: msg,
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

exports.transferAdmin = async (req, res) => {
    console.log(colors.green('[PUT] Transfer Admin'));

    const { group_id, member_id } = req.body;
    const member = req.decoded;

    let result = {};
    let InsertResult = {};

    console.log(group_id);
    console.log(member.id);

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);
    const checkMember = await models.GroupMember.checkMember(group_id, member_id);

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
        } else if (checkFounder === null) {
            msg = "신청한 유저가 아닙니다";

            console.log(colors.magenta('Error: ' + msg));

            result = {
                status: 403,
                message: msg
            };

            res.status(403).json(result);
        }
        else {
            InsertResult = await models.GroupMember.transferAdmin(group_id, member_id);

            if (InsertResult != undefined) {
                res.status(500).json(InsertResult);
            }

            await models.Group.transferAdmin(group_id, member_id);

            msg = "어드민 권한 양도 성공";

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        };
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

exports.secession = async (req, res) => {
    console.log(colors.red('[DELETE] Secession Group'));

    const { group_id } = req.body;
    const member = req.decoded;

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);
    const checkMember = await models.GroupMember.checkMember(group_id, member.id);
    
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
    } else if(!member) {
        msg = "토큰이 없습니다."

        console.log(colors.magenta('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        }

        res.status(400).json(result);
    } else if(checkFounder === true) {
        msg = "개설자는 탈퇴할 수 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if(checkMember === null || checkMember) {
        msg = "그룹에 가입된 유저가 아닙니다."
        
        console.log(colors.magenta('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        }

        res.status(400).json(result);
    } else {
        try {
            await models.GroupMember.secession(group_id, member.id);

            let count = await models.Group.findMemberCount(group_id);

            msg = "그룹 삭제 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            await models.Group.plusMemberCount(group_id, --count.member_count);

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

exports.joinDeny = async (req, res) => {
    console.log(colors.red('[DELETE] Secession Group'));

    const { group_id, member_id } = req.body;
    const member = req.decoded;

    const checkFounder = await models.GroupMember.checkFounder(group_id, member.id);
    const checkMember = await models.GroupMember.checkMember(group_id, member_id);
    
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
    } else if(!member) {
        msg = "토큰이 없습니다."

        console.log(colors.magenta('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        }

        res.status(400).json(result);
    } else if(checkFounder === false) {
        msg = "권한이 없습니다.(개설자 X)";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if(!checkMember) {
        msg = "이미 가입된 유저입니다."
        
        console.log(colors.magenta('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        }

        res.status(400).json(result);
    } else {
        try {
            await models.GroupMember.secession(group_id, member_id);

            msg = "신청 거절";

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

// deadline_time: 신청할떄 new Date()로 시간 비교해 status 변경 후 response 전송
// member_count: 신청한 뒤 member_count === deadline_member_count일때 status 변경 후 response 전송