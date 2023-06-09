import { ChangeEvent, FormEvent, useState } from "react"
/* import { postTaskRequest } from "../api/tasks" */
import { useTasks } from "../context/useTasks"

function TaskForm() {
  const [task, setTasks] = useState({
    title: "",
    description: "",
    done: false
  })

  const { createTask } = useTasks()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTasks({ ...task, [e.target.name]: e.target.value })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createTask(task)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='title'
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
          placeholder='Write a title'
          onChange={handleChange} />
        <textarea
          name="description"
          rows={3}
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
          placeholder='Write a description'
          onChange={handleChange}></textarea>
        <label htmlFor="">
          <input type="checkbox" className='h-5 w-5 text-indigo-600'
            onChange={(e) => {
              setTasks({ ...task, done: !task.done })
            }} />
          <span>Done</span>
        </label>
        <button className='bg-indigo-500 px-3 block py-2 w-full'>Save</button>
      </form>
    </div>
  )
}

export default TaskForm