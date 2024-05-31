const {
    create_taks,
    update_task_status,
    update_tasks,
    get_tasks,
    delete_task
} = require('../services/user.service')

const user_controller = {
    create_taks: async(req, res) => {
        try {
            console.log("req.user", req.user)
            let reqBody = req.body;
            let reqUser = req.user;
            let result = await create_taks(reqBody, reqUser);
            if(!result.status) {
                return res.status(404).json({
                    status: "failure",
                    message: error.message
                })
            }
            return res.status(200).json({
                status: "success",
                message: result.message,
                id: result.id
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    },

    update_task_status: async(req, res) => {
        try {
            console.log("req.user", req.user)
            let reqBody = {
                task_id: req.params.task_id,
                status: req.body.status
            }
            let reqUser = req.user;
            let result = await update_task_status(reqBody, reqUser);
            if(!result.status) {
                throw new Error(result.message)
            }
            return res.status(200).json({
                status: "success",
                message: result.message
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    },

    update_tasks: async(req, res) => {
        try {
            let reqBody = {
                task_id: req.params.task_id,
                ...req.body
            }
            let reqUser = req.user;
            let result = await update_task_status(reqBody, reqUser);
            // let result = await update_tasks(reqBody, reqUser);
            if(!result.status) {
                return res.status(404).json({
                    status: "failure",
                    message: error.message
                })
            }
            return res.status(200).json({
                status: "success",
                message: result.message
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    },

    get_tasks: async(req, res) => {
        try {
            let reqBody = req.query, reqUser = req.user;
            let result = await get_tasks(reqBody, reqUser);
            if(!result.status) {
                return res.status(404).json({
                    status: "failure",
                    message: result.message
                })
            }
            return res.status(200).json({
                status: "success",
                message: result.message,
                data: result.data
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    },

    delete_task: async(req, res) => {
        try {
            let reqBody = req.params, reqUser = req.user;
            let result = await delete_task(reqBody, reqUser);
            if(!result.status) {
                return res.status(404).json({
                    status: "failure",
                    message: result.message
                })
            }
            return res.status(200).json({
                status: "success",
                message: result.message,
                data: result.data
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    }
}

module.exports = user_controller;