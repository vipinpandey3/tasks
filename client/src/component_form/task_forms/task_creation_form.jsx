import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import moment from 'moment';

const TasksForm = ({ formValue, on_finish, on_cancel }) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      ...formValue,
      dueDate: formValue.dueDate ? moment(formValue.dueDate) : null,
    });
  }, [formValue]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={on_finish}
      initialValues={{
        ...formValue,
        dueDate: formValue.dueDate ? moment(formValue.dueDate) : null,
      }}
      style={{ width: '100%' }}
    >
      <Row gutter={16}>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a value' }]}
            hasFeedback
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a value' }]}
            hasFeedback
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || moment(value).isValid()) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Invalid date'));
                },
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Create Task
        </Button>
        <Button type="default" onClick={on_cancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TasksForm;
