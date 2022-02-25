import axios from 'axios'

type tasks = {
  task_id: string
  name: string
  description: string
  is_done: boolean
}

type ReturnData = {
  row: tasks[]
}

const fetchData = async ({ signal }: any): Promise<ReturnData> => {
  const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/todos`
  const { data } = await axios.get(endpoint, { signal })
  return { row: data }
}

export default fetchData
