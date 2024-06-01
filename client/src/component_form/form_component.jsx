import React from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const CMForm = ({ formFields, formValue, onFormChange, onFinish, layout, on_change, on_date_change, children }) => {

  const renderFormItem = (input) => {
    switch (input.type) {
      case 'input':
        return (
          <Input
            value={formValue[input.name]}
            onChange={(e) => on_change(input.name, e.target.value)}
          />
        );
      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            value={moment(formValue[input.name])}
            onChange={(value, dateString) => on_date_change(value, dateString, input.name)}
          />
        );
      case 'select':
        return (
          <Select
            value={formValue[input.name]}
            onChange={(e) => on_change(input.name, e)}
          >
            {input.options.map(option => (
              <Select.Option key={option.id} value={option.id}>{option.type}</Select.Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Form layout="vertical"
      onFinish={onFinish} 
      initialValues={formValue} 
      {...formItemLayout} 
      style={{ width: "100%" }}
      >
      <Row gutter={16} >
        {formFields.map(input => (
          <Col className="gutter-row"  key={input.id} xs={24} sm={24} md={12} lg={8} xl={8}>
            <Form.Item key={input.id} label={input.label}>
              {renderFormItem(input)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      {children}
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};

export default CMForm;