import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

function TodoList() {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
    }

    const updatedTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (
            prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos(
            (prev) => prev.map((
                prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)
        )
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        if (todos && todos.length > 0) {
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
        <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
            <div className="bg-gradient-to-tr from-sky-950 from-40% via-blue-900 via-75% to-blue-800 to-90% flex flex-col min-h-screen py-8">
                <div className="absolute md:top-12 md:left-12 top-4 left-6 hover:scale-110">
                    <Link to="/" className='flex flex-row'>
                        <img
                            src='assets/back.png'
                            alt="Back"
                            className="md:w-10 md:h-9 w-8 h-7"
                        />
                    </Link>
                </div>
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    )
}

export default TodoList;