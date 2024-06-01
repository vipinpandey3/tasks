/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import constant_helper from "../../helper/constant_helper";
// import collection_helper from "../../helper/collection_helper";
// import UserContainer from '../../container/user';
// import TasksForm from '../../component_form/task_forms/task_creation_form'
import * as antd from 'antd'

class TaskList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
            filter: {
                status: 'current'
            },
            showDialogueBox: false,
            tableParams: {
                pagination: {
                    current: 1,
                    pageSize: 10,
                },
            },
            selectedRowKeys: [],
            std: ""
		};
		this.set_state = this.set_state.bind(this);
	}

	componentDidMount() {
        console.log("this.props", this.props)
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	
	set_state(key, value) {
		this.setState({
			...this.state,
			[key]: value
		})
	}

    onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        this.setState({ selectedRowKeys: newSelectedRowKeys });
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
                this.setState({...this.state, selectedRowKeys: newSelectedRowKeys });
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
		return (
			<div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              <antd.Table
                columns={this.props.task.list}
                rowKey={(record) => record.key}
                rowSelection={rowSelection}
                // dataSource={dataSource}
                pagination={this.state.tableParams.pagination}
                loading={this.state.loading}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => { 
                      this.on_row_click(record, rowIndex); 
                    },
                  };
                }}
              />
          </div>
		)
	}
}

TaskList.propTypes = {
	tasks: PropTypes.object.isRequired,
	app_action: PropTypes.object.isRequired,
};


export default TaskList