import { CreateTask } from '../interfaces/task.interface'

const API = 'http://localhost:3000/api'


export const postTaskRequest = async (task: CreateTask) =>
    fetch(`${API}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    })

export const getTaskRequest = async () => fetch(`${API}/tasks`)

export const deleteTaskRequest = (id: string) => fetch(`${API}/tasks/${id}`,
    {
        method: "DELETE"
    })