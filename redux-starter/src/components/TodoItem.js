import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleComplete, toggleCompleteAsync, deleteTodo } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	const handleCompleteClick = () => {
		// use 'toggleComplete' for local request
		dispatch(toggleCompleteAsync({ id: id, completed: !completed }))
	}

	const deleteClick = () => {
		dispatch(deleteTodo({ id: id }));
	}
	
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input
						type='checkbox'
						className='mr-3'
						checked={completed}
						onChange={handleCompleteClick}
					>
					</input>
					{title}
				</span>
				<button onClick={deleteClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
