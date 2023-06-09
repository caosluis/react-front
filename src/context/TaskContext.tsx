import { createContext, useEffect, useState } from "react";
import { deleteTaskRequest, getTaskRequest, postTaskRequest } from "../api/tasks";
import { CreateTask, Task } from "../interfaces/task.interface";

interface TaskContextValue {
    tasks: Task[],
    createTask: (task: CreateTask) => Promise<void>,
    deleteTask: (id: string) => Promise<void>
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async () => { },
    deleteTask: async (id: string) => { }
})

interface Props {
    children: React.ReactNode
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        getTaskRequest()
            .then((response) => response.json())
            .then((data) => setTasks(data))
    }, [])

    const createTask = async (task: CreateTask) => {
        const res = await postTaskRequest(task)
        const data = await res.json()
        setTasks([...tasks, data])
    }

    const deleteTask = async (id: string) => {
        const res = await deleteTaskRequest(id)
        if (res.status === 204) {
            setTasks(tasks.filter(task => task._id !== id))
        }

    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
            {children}
        </TaskContext.Provider >
    )
}