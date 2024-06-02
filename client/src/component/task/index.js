import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import constant_helper from '../../helper/constant_helper';
import moment from 'moment';
import UserContainer from '../../container/user';
import TasksForm from '../../component_form/task_forms/task_creation_form';
import * as antd from 'antd';
import { FormateDate, getCurrentDate } from "../../helper/date_helper";

class TaskComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      show_task_creation_form: false,
      is_task_updating: false,
      task_id: null,
      formValue: {
        title: '',
        description: '',
        status: 'To Do',
        dueDate: getCurrentDate()
      },
      filter: { limit: 10, offset: 0, status: '', dueDate: null },
      showDialogueBox: false,
      tableParams: {
        pagination: {
          current: 1,
          pageSize: 10,
        },
      },
      selectedRowKeys: [],
      std: '',
    };
    this.set_state = this.set_state.bind(this);
    this.load_tasks = this.load_tasks.bind(this);
    this.on_finish = this.on_finish.bind(this);
    this.create_task = this.create_task.bind(this);
    this.update_task = this.update_task.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.handle_cancel = this.handle_cancel.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.load_tasks(this.state.filter);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  set_state(key, value) {
    this.setState({
      ...this.state,
      [key]: value,
    });
  }

  load_tasks(filterValues) {
    const opts = {
      event: constant_helper.get_app_constant().FETCH_TASKS_LIST,
      endpoint: 'user/get-tasks',
      params: filterValues,
      has_authorization: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    this.props.app_action.api_generic_get(opts, (result) => {
      if (result.data.resultShort === 'success') {
        console.log('result.data', result.data);
        this.setState({
          taskList: result.data.data.tasks,
          tableParams: {
            ...this.state.tableParams,
            pagination: {
              ...this.state.tableParams.pagination,
              total: result.data.data.totalCount,
            },
          },
        });
      }
    });
  }

  create_task(value) {
    const opts = {
      event: constant_helper.get_app_constant().API_CREATE_TASKS,
      endpoint: 'user/create-task',
      params: value,
      has_authorization: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    this.props.app_action.api_generic_post(opts, (result) => {
      if (result.data.resultShort === 'success') {
        this.setState({
          ...this.state,
          show_task_creation_form: false,
          is_task_updating: false,
        });
        this.load_tasks(this.state.filter);
        this.set_state('show_task_creation_form', false);
      }
    });
  }

  update_task(value) {
    value.dueDate = value.dueDate ? moment(value.dueDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const opts = {
      event: constant_helper.get_app_constant().API_CREATE_TASKS,
      endpoint: `user/update_tasks/${this.state.task_id}`,
      params: value,
      has_authorization: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    this.props.app_action.api_generic_post(opts, (result) => {
      console.log('result.data.resultShort', result);
      if (result.data.status === 'success') {
        this.setState({
          ...this.state,
          task_id: null,
          show_task_creation_form: false,
          is_task_updating: false,
        });
        this.load_tasks(this.state.filter);
      }
    });
  }

  on_finish(value) {
    let dueDate = FormateDate(value.dueDate);
    value.dueDate = dueDate;
    if (this.state.is_task_updating) {
      this.update_task(value);
    } else {
      this.create_task(value);
    }
  }

  onSelectChange = (newSelectedRowKeys) => {
    this.setState({ selectedRowKeys: newSelectedRowKeys });
  };

  handleEdit = (record) => {
    this.setState({
      ...this.state,
      show_task_creation_form: true,
      is_task_updating: true,
      formValue: {
        ...record,
        dueDate: record.dueDate ? moment(record.dueDate) : null,
      },
      task_id: record.key,
    });
  };

  handleDelete = (record) => {
    const opts = {
      event: constant_helper.get_app_constant().API_CREATE_TASKS,
      endpoint: `user/update_task_status/${record.key}`,
      params: {
        status: "Deleted"
      },
      has_authorization: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    this.props.app_action.api_generic_post(opts, (result) => {
      if (result.data.status === 'success') {
        this.load_tasks(this.state.filter);
      }
    });
  };

  handleFilterChange = (changedValues, allValues) => {
    this.set_state('filter', allValues);
  };

  handleFilterSubmit = () => {
    const { filter, tableParams } = this.state;
    const filterValues = {
      status: filter.status,
      dueDate: filter.dueDate ? moment(filter.dueDate).format('YYYY-MM-DD') : null,
    };
    this.load_tasks({
      ...filterValues,
      limit: tableParams.pagination.pageSize,
      offset: (tableParams.pagination.current - 1) * tableParams.pagination.pageSize,
    });
  };

  handleClearFilter = () => {
    this.setState({
      filter: { limit: 10, offset: 0, status: '', dueDate: null },
      tableParams: {
        pagination: {
          current: 1,
          pageSize: 10,
        },
      },
    }, () => {
      this.load_tasks(this.state.filter);
    });
  };

  handle_cancel = () => {
    this.setState({
      show_task_creation_form: false,
      is_task_updating: false,
      formValue: {
        title: '',
        description: '',
        status: 'To Do',
        dueDate: getCurrentDate()
      },
      task_id: null,
    });
  };

  handleTableChange = (pagination) => {
    this.set_state('tableParams', { pagination });
    this.load_tasks({
      ...this.getCurrentParams(),
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
    });
  };

  getCurrentParams = () => {
    const { filter } = this.state;
    return {
      status: filter.status,
      dueDate: filter.dueDate ? moment(filter.dueDate).format('YYYY-MM-DD') : null,
    };
  };

  rowClassName = (record) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const recordDueDate = record.dueDate ? moment(record.dueDate).format('YYYY-MM-DD') : null;
    if (recordDueDate === currentDate) {
      return 'highlight-row';
    }
    return '';
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        antd.Table.SELECTION_ALL,
        antd.Table.SELECTION_INVERT,
        antd.Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
            this.setState({ ...this.state, selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

    const columns = [
      ...this.props.task.tasks.attributes,
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <antd.Button
              icon={<EditOutlined />}
              onClick={() => this.handleEdit(record)}
              style={{ marginRight: 8 }}
            />
            <antd.Button
              icon={<DeleteOutlined />}
              onClick={() => this.handleDelete(record)}
              danger
            />
          </span>
        ),
      },
    ];

    const dataSource = this.props.task.tasks.list.map((task) => ({
      key: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? moment(task.dueDate).format('YYYY-MM-DD') : '-',
    }));

    return (
      <div style={{ width: '80%', margin: '0 auto' }}>
        <UserContainer {...this.props} />
        {
          !this.state.show_task_creation_form && 
          <antd.Form style={{marginTop: '10px'}} layout="inline" onValuesChange={this.handleFilterChange}>
          <antd.Form.Item label="Status" name="status">
            <antd.Select style={{ width: 120 }}>
              <antd.Select.Option value="">All</antd.Select.Option>
              <antd.Select.Option value="To Do">To Do</antd.Select.Option>
              <antd.Select.Option value="In Progress">In Progress</antd.Select.Option>
              <antd.Select.Option value="Done">Done</antd.Select.Option>
            </antd.Select>
          </antd.Form.Item>
          <antd.Form.Item label="Due Date" name="dueDate">
            <antd.DatePicker format="YYYY-MM-DD" />
          </antd.Form.Item>
          <antd.Form.Item>
            <antd.Button type="primary" onClick={this.handleFilterSubmit}>
              Filter
            </antd.Button>
          </antd.Form.Item>
          <antd.Form.Item>
            <antd.Button type="default" onClick={this.handleClearFilter}>
              Clear Filter
            </antd.Button>
          </antd.Form.Item>
        </antd.Form>
        }
        {this.state.show_task_creation_form && (
          <TasksForm formValue={this.state.formValue} on_finish={this.on_finish} on_cancel={this.handle_cancel} />
        )}
        {!this.state.show_task_creation_form && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '10px' }}>
            <antd.Button type="primary" onClick={() => { this.setState({ ...this.state, show_task_creation_form: true }); }}>
              Create Tasks
            </antd.Button>
          </div>
        )}
        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <antd.Table
            columns={columns}
            rowKey={(record) => record.key}
            rowSelection={rowSelection}
            dataSource={dataSource}
            pagination={this.state.tableParams.pagination}
            loading={this.state.loading}
            rowClassName={this.rowClassName} // Add rowClassName property
            onChange={this.handleTableChange} // Handle pagination change
          />
        </div>
      </div>
    );
  }
}

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired,
  app_action: PropTypes.object.isRequired,
};

export default TaskComponent;
