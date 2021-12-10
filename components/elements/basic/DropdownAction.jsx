import React from "react";
import { Dropdown, Tooltip, Menu, Popconfirm, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

const DropdownAction = (props) => {
	const onClick = (key) => {
		if (props.onMenuClick) props.onMenuClick(key);
	};

	const menuView = (
		<Menu>
			
			<Menu.Item key={0} onClick={() => onClick("edit")}>
				<i className="icon-pencil mr-2"></i>
				Edit
			</Menu.Item>
			<Menu.Item key={0}>
				<Popconfirm title="Are you sure to delete this product?" onConfirm={() => onClick("delete")} okText="Yes" cancelText="No">
					<i className="icon-trash2 mr-2"></i>
					Delete
				</Popconfirm>
			</Menu.Item>
		</Menu>
	);
	return (
		<Dropdown overlay={menuView} className="ps-dropdown">
			<a onClick={(e) => e.preventDefault()} className="ps-dropdown__toggle">
				<i className="icon-ellipsis"></i>
			</a>
		</Dropdown>
	);
};

export default DropdownAction;

export const TableActions = ({ editDisabled, isPublic, item, editPath, deleteAction, editAction, loaderSelector }) => {
	const loader = useSelector(loaderSelector);

	const dispatch = useDispatch();
	const onEditConfirm = () => {
		dispatch(editAction(item));
		if (editPath) Router.push(editPath);
	};

	const onDeleteConfirm = () => dispatch(deleteAction(item));

	return (
		<React.Fragment>
			<Tooltip title={editDisabled ? "Sold product cannot be edited" : "Edit Product"}>
				<span style={editDisabled ? { cursor: "not-allowed" } : { cursor: "pointer" }} onClick={editDisabled ? null : onEditConfirm}>
					<i className="icon-pencil mr-2"></i>
				</span>
			</Tooltip>

			{loader ? (
				<span style={{ marginLeft: 5, pointerEvents: "none" }}>
					<Spin />
				</span>
			) : (
				<Popconfirm placement="leftTop" title="Are you sure to delete this listing?" onConfirm={onDeleteConfirm} okText="Yes" cancelText="No">
					<span style={{ marginLeft: 5, cursor: "pointer" }}>
						<i className="icon-trash2 mr-2"></i>
					</span>
				</Popconfirm>
			)}
		</React.Fragment>
	);
};

TableActions.defaultProps = {
	deleteAction: () => {},
	editAction: () => {},
	loaderSelector: () => {},
	editPath: null,
};
