const models = require('../models');

exports.checkTime = async (req, res, next) => {
    const groups = await models.Group.uncompleted();

    for (var i = 0; i < groups.length; i++) {
        const group = groups[i];

        const now = new Date();
        now.setHours(now.getHours() + 9);
        const deadline = new Date(group.deadline_time);

        if (deadline.getTime() - now.getTime() < 0) {
            await models.Group.changeStatus(group.id);
        }
    }

    await next();
};