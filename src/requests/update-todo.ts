import axios from 'axios'

type Params = {
  task_id: string
  is_done: string
}

const updateTodo = async ({ task_id, is_done }: Params): Promise<any> => {
  const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/todos/${task_id}`
  const data = { is_done: is_done.toString() }
  const data1 = await axios.patch(endpoint, data)
  return data1
}

export default updateTodo
