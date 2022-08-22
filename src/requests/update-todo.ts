import axios from 'axios'
import { getSession } from 'next-auth/react'

type UpdateTodoFn = (params: { taskId: string; isDone: string }) => Promise<[data: any, error: any]>

const updateTodo: UpdateTodoFn = async ({ taskId, isDone }) => {
  console.log(3333002, { taskId, isDone })
  const session = await getSession()
  // @ts-ignore
  const { access_token } = session?.user

  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/todos/${taskId}`,
      {
        is_done: isDone.toString(),
      },
      {
        headers: {
          Authorization: 'Bearer ' + access_token, //the token is a variable which holds the token
        },
      }
    )

    return [data, null]
  } catch (error) {
    return [null, error]
  }
}
export default updateTodo
