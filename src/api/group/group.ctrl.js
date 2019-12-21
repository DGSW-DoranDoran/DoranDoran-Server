const models = require('../../models');
const tokenLib = require('../../lib/token');

exports.showGroupPost = async (req, res) => {
  const { group_id } = req.body;

    try {
        const content = await models.GroupInfo.findGroupInfo(group_id);

        console.log(content);

        const result = {
          status: 200,
          data: {
            content
          },
        }
    
        res.status(200).json(result);
      } catch(error) {
        console.log(`${error} + 서버 에러`);
        const result = {
          status: 500,
          message: "서버 에러!",
        }
  }
}

exports.showAllGroupPost = async (req, res) => {
    try {
        const group = await models.GroupInfo.showAllGroup();

        // if(group.data.group == 1)
        //   group.data.status = true;
        // else
        //   group.data.status = false;

        console.log(group);

        const result = {
          status: 200,
          message: '그룹 전체 조회 성공',
          data: {
            group
          },
        }
    
        res.status(200).json(result);
      } catch(error) {
        console.log(`${error} + 서버 에러`);
        const result = {
          status: 500,
          message: "서버 에러!",
        }
  }
}

exports.createGroupPost = async (req, res) => {
  const { group_id, category_id, name, content, deadline_type, deadline_member, deadline_time, status, create_time, image, founder, member_count } = req.body;

    try {
        const create = await models.GroupInfo.createGroupInfo(group_id, category_id, name, content, deadline_type, deadline_member, deadline_time, status, create_time, image, founder, member_count);

        const result = {
          status: 200,
          message: '생성이 완료되었습니다',
          data: {
            group_id, 
            category_id, 
            name, 
            content, 
            deadline_type,
            deadline_member, 
            deadline_time,
            status, 
            create_time, 
            image,
            founder,
            member_count
          },
        }

        console.log(result);
    
        res.status(200).json(result);
      } catch(error) {
        console.log(`${error} + 서버 에러`);
        const result = {
          status: 500,
          message: "서버 에러!",
        }
  }
}

exports.deleteGroupPost = async (req, res) => {
  const { group_id } = req.body;

    try {
        const _delete = await models.GroupInfo.deleteGroupInfo(group_id);

        console.log(_delete);

        const result = {
          status: 200,
          message: '삭제 성공'
        }
    
        res.status(200).json(result);

      } catch(error) {
        console.log(`${error} + 서버 에러`);
        const result = {
          status: 500,
          message: "서버 에러!",
        }
  }
}