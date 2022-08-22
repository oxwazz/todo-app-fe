import axios from 'axios'

type RegisterFunc = ({
  username,
  password,
  email,
  profile_picture,
}: {
  username: string
  password: string
  email: string
  profile_picture?: string
}) => Promise<[error: any, data: any]>

const register: RegisterFunc = async (registerData) => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/register`
    const { data } = await axios.post(endpoint, registerData)

    return [null, data]
  } catch (error: any) {
    return [error.response.data, null]
  }
}
export default register
