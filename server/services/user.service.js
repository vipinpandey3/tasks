const models = require('../models');
const {Op} = require('sequelize')

const user_service = {
    create_taks: async(reqBody, reqUser) => {
        try {
            reqBody.user_id = reqUser.user_id;
            let result = await models.Task.create(reqBody);
            console.log("result of create is", result);
            return {
                status: true,
                message: "task created",
                id: result.id
            }
        } catch (error) {
            console.log("error inside the create_taks", error)
            return {
                status: false,
                message: error.message
            }
        }
    },

    update_task_status: async(reqBody) => {
        try {
            const task = await models.Task.findOne({ where: { id: reqBody.task_id } });
            if (!task) {
                throw new Error('Task not found')
            }
            let result = await task.update(reqBody);
            return {
                status: true,
                message: "task updated"
            }
        } catch (error) {
            console.log("error inside the update_task_status", error)
            return {
                status: false,
                message: error.message
            }
        }
    },

    update_tasks: async(reqBody) => {
        try {
            const task = await models.Task.findOne({ where: { id: reqBody.task_id } });
            if (!task) {
                throw new Error('Task not found')
            }
            let result = await task.update(reqBody);
            return {
                status: true,
                message: "task updated"
            }
        } catch (error) {
            console.log("error inside the update_tasks", error)
            return {
                status: false,
                message: error.message
            }
        }
    },

    get_tasks: async(reqBody, reqUser) => {
        try {
            let query = {}
            console.log("reqBody", reqBody)
            const {limit, offset, search, status} = reqBody;
            query.limit = parseInt(limit);
            query.offset = parseInt(offset);
            let where = {};
            where.user_id = reqUser.user_id;
            if(search) {
                where.title = {
                    [Op.like]: `%${search}%`
                };
            }
            if(status) {
                where.status = status;
            }

            query.where = where;
            let tasks = await models.Task.findAll(query);
            return {
                status: true,
                message: "fetched all taks",
                data: {
                    tasks: tasks,
                    attributes: [
                        {
                            "title": "Title",
                            "dataIndex": "title",
                            "sorter": true
                        },
                        {
                            "title": "Description",
                            "dataIndex": "description",
                            "sorter": true
                        },
                        {
                            "title": "Status",
                            "dataIndex": "status"
                        }
                    ]
                }
            }
        } catch (error) {
            console.log("error inside the get_tasks", error)
            return {
                status: false,
                message: error.message
            }
        }
    },

    delete_task: async(reqBody, reqUser) => {
        try {
            const task = await models.Task.findOne({ where: { id: reqBody.task_id } });
            if (!task) {
                throw new Error("no task found to delete");
            }
            await task.destroy();
            return {
                status: true,
                message: "task deleted"
            }
        } catch (error) {
            console.log("error inside the delete_task", error)
            return {
                status: false,
                message: error.message
            }
        }
    }
}

module.exports = user_service