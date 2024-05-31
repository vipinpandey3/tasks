const request = require('supertest');
const app = require('../index.js'); // Adjust the path as needed

let token;

beforeAll(async () => {
    // Perform a real login to get the token
    const res = await request(app)
        .post('/login')
        .send({
            email: "Vipin123@gmail.com",
            password: "testing123"
        });
    token = res.body.data['jwt'];
});


describe('Task Routes', () => {
    it('should create a task', async () => {
        console.log("token", token)
        const res = await request(app)
            .post('/user/create-task')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                status: "To Do",
                title: 'Test Task',
                description: 'This is a test task'
            });
        console.log('Create task response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should update task status', async () => {
        const res = await request(app)
            .post('/user/update_task_status/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'Deleted'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'task updated');
    });

    it('should update task', async () => {
        const res = await request(app)
            .post('/user/update_tasks/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Task Title',
                description: 'Updated task description'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'task updated');
    });

    it('should get tasks', async () => {
        const res = await request(app)
        .get('/user/get-tasks?limit=20&offset=0&search=product')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
    });

    it('should delete a task', async () => {
        const res = await request(app)
        .delete('/user/delete-task/1')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'task deleted');
    });
});
