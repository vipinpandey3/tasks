const express = require('express');
const {
    create_taks,
    update_task_status,
    update_tasks,
    get_tasks,
    delete_task
} = require('../controller/user.controller');;
const {validateTaskCreation, validateTaskUpdation} = require('../middlewares/validators')
const router = express.Router();

router.post('/create-task', (req, res, next) => {
    console.log('Inside create-task route');
    create_taks(req, res, next);
});

router.post('/update_task_status/:task_id', update_task_status);

router.post('/update_tasks/:task_id', update_tasks);

router.get('/get-tasks', get_tasks);

router.delete('/delete-task/:task_id', delete_task)

module.exports = router;
