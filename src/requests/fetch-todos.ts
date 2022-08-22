import axios from 'axios'
import { getSession } from 'next-auth/react'

type Todo = {
  task_id: string
  name: string
  description: string
  is_done: boolean
}

type FetchTodosFn = ({ signal }: any) => Promise<[data: { row: Todo[] }, error: any]>

const fetchData: FetchTodosFn = async ({ signal }) => {
  const session = await getSession()
  // @ts-ignore
  const { access_token } = session?.user

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/todos`
    const { data } = await axios.get(endpoint, {
      signal,
      headers: {
        Authorization: 'Bearer ' + access_token, //the token is a variable which holds the token
      },
    })

    return [{ row: data?.data || [] }, null]
  } catch (error) {
    return [{ row: [] }, error]
  }
}
export default fetchData
