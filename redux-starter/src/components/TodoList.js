import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

import { motion } from 'framer-motion';
import Loader from './loader/Loader';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const [index, setIndex] = useState(0);
	const [check, setCheck] = useState(false);
	const [newTodos, setNewTodos] = useState([]);

	useEffect(() => {
		dispatch(getTodosAsync());
		if (getTodosAsync.fulfilled) {
			console.log('ready');
		}
	}, [dispatch]);

	// const todos = [
	// 	{ id: 1, title: 'todo1', completed: false },
	// 	{ id: 2, title: 'todo2', completed: false },
	// 	{ id: 3, title: 'todo3', completed: true },
	// 	{ id: 4, title: 'todo4', completed: false },
	// 	{ id: 5, title: 'todo5', completed: false },
	// ];

	useEffect(() => {
		
		setTimeout(() => {
			if (index < todos.length && todos.length !== 1 && todos[0].id !== 1) {
				setNewTodos(state => [...state, todos[index]]);
				setIndex(state => state + 1);
			}

			if (todos[0]?.id === 1) {
				setCheck(true);
			}
		}, 300);
	}, [index, check]);

	useEffect(() => {

		if (todos.length === 1) {
			setNewTodos(state => [...todos]);
			setIndex(state => state + 1);
		}
		
		if (check) {
			setNewTodos(state => [...todos]);
		}

		if (index > 0) {
			setNewTodos(state => [...todos]);
		}
	}, [todos]);

	useEffect(() => {
		setNewTodos(state => [...state]);
	}, [todos]);

	return (
		<div>
			<ul className='list-group'>
				{newTodos?.length > 0
					?
					newTodos?.map((todo) => (
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 100 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							key={todo.id}
						>
							<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
						</motion.div>
					))

					: <Loader />
				}
			</ul >
		</div>

	);
};

export default TodoList;
