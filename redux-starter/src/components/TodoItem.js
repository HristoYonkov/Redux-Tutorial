import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleComplete, toggleCompleteAsync, deleteTodo, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	const handleCompleteClick = () => {
		// use 'toggleComplete' for local request
		dispatch(toggleCompleteAsync({ id: id, completed: !completed }))
	}

	const deleteClick = () => {
		// use 'deleteTodoAsync' for local request
		if (completed) {
			// if (window.confirm('Are you sure you want to delete the item?')) {
			// }
			dispatch(deleteTodoAsync({ id: id }));
		} else {
			alert('You must check the item as completed!')
		}
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
