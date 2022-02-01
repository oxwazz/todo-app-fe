import React from 'react'
import type { NextPage } from 'next'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { FaTasks } from 'react-icons/fa'
import { BsThreeDots, BsFillCheckSquareFill } from 'react-icons/bs'
import tw, { css } from 'twin.macro'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import { MainLayout } from '@/src/shared-component/layout'

// const hoverStyles = css`
//   &:hover {
//     border-color: black;
//     ${tw`text-black`}
//   }
// `
// const Input = ({ hasHover }: any) => <input css={[tw`border`, hasHover && hoverStyles]} />

interface tasks {
  id: string
  name: string
  description: string
  is_done: boolean
}

interface ReturnData {
  row: tasks[]
}

interface Tes {}

const fetchData = async ({ signal }: any): Promise<ReturnData> => {
  const { data } = await axios.get('http://localhost:3030/todos', {
    // Pass the signal to `axios`
    signal,
  })
  return { row: data }
}

const updateData = async ({ id, is_done }: any): Promise<any> => {
  const data = await axios.patch('http://localhost:3030/todos/' + id, {
    is_done: is_done.toString(),
  })
  return data
}

const Home: NextPage = () => {
  const queryClient = useQueryClient()

  queryClient.setMutationDefaults('addTodo', {
    mutationFn: updateData,
    onMutate: async (variables: tasks) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries('/todos')

      // Create optimistic todo
      console.log(33331, { variables })
      const optimisticTodo = { id: variables.id, is_done: variables.is_done }

      // Add optimistic todo to todos list
      queryClient.setQueryData<ReturnData | undefined>('/todos', (old) => {
        if (old) {
          const newDataIndex = old.row.findIndex((v) => v.id === optimisticTodo.id)
          const newData1 = [...old.row]
          newData1[newDataIndex] = { ...newData1[newDataIndex], ...optimisticTodo }
          console.log({ newData1 })
          return { row: newData1 }
        }
        return old
      })

      // Return context with the optimistic todo
      return { optimisticTodo }
    },
    // onSuccess: (result, variables, context) => {
    //   console.log(33331, { result, variables, context })
    //   // Replace optimistic todo in the todos list with the result
    //   queryClient.setQueryData('/todos', (old) =>
    //     old.map((todo) => (todo.id === context.optimisticTodo.id ? result : todo))
    //   )
    // },
    // onError: (error, variables, context) => {
    //   // Remove optimistic todo from the todos list
    //   queryClient.setQueryData('/todos', (old) =>
    //     old.filter((todo) => todo.id !== context.optimisticTodo.id)
    //   )
    // },
    retry: 3,
  })

  const { data, isLoading, isError } = useQuery('/todos', ({ signal }) => fetchData({ signal }))
  // const mutation = useMutation(
  //   (newData: any) =>
  //     axios.patch('https://qazwsx-todo-app-be.herokuapp.com/todos/' + newData.id, newData),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('/todos')
  //     },
  //   }
  // )
  const mutation = useMutation('addTodo')

  console.log(3333, { data })

  return (
    <MainLayout>
      <div tw="rounded-3xl flex flex-col gap-6 flex flex-col">
        {/* MAIN_1 */}
        <div tw="pt-8 flex items-center gap-4">
          <h1 tw="text-white text-2xl font-bold mr-auto">Dashboard</h1>
          <div tw="bg-[#F7C046] cursor-pointer rounded-xl flex items-center py-2 px-4 text-sm text-[#222c41]">
            <AiOutlinePlus tw="text-[#222c41] mr-1" />
            New Task
          </div>
          <div tw="w-[34px] h-[34px] cursor-pointer border border-[#343F54] rounded-full flex justify-center items-center">
            <IoMdNotificationsOutline tw="text-white" />
          </div>
          <div
            tw="w-[34px] h-[34px] cursor-pointer rounded-full bg-cover"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/ogw/ADea4I6MKP2OEXDsm5vq-vsdEj76LV5RUCZZOgmlu896CnY=s192-c-mo)',
            }}
          ></div>
        </div>
        {/* MAIN_2 */}
        <div tw="flex gap-6">
          <div tw="bg-[#343F54] rounded-2xl w-full flex items-center px-5 py-3">
            <div tw="w-[45px] h-[45px] border border-[#8E9CAD] rounded-xl flex justify-center items-center mr-3">
              <BiTask tw="text-2xl text-[#F7C046]" />
            </div>
            <div tw="mr-auto">
              <p tw="text-white font-bold text-sm">12 Tasks</p>
              <p tw="text-[#8E9CAD] text-xs">Completed</p>
            </div>
            <div>
              <svg tw="w-[62px] h-[62px]">
                <circle
                  tw="text-[#67C7B3]"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                  r="17"
                  cx="31"
                  cy="31"
                />
                <circle
                  tw="text-[#4D4C58] "
                  strokeWidth="7.5"
                  stroke="currentColor"
                  fill="transparent"
                  r="17"
                  cx="31"
                  cy="31"
                />
              </svg>
            </div>
          </div>
          <div tw="bg-[#343F54] rounded-2xl w-full flex items-center px-5 py-3">
            <div tw="w-[45px] h-[45px] border border-[#8E9CAD] rounded-xl flex justify-center items-center mr-3">
              <FaTasks tw="text-xl text-[#F7C046]" />
            </div>
            <div tw="mr-auto">
              <p tw="text-white font-bold text-sm">4 Tasks</p>
              <p tw="text-[#8E9CAD] text-xs">In Progress</p>
            </div>
            <div>
              <svg tw="w-[62px] h-[62px]">
                <circle
                  tw="text-[#B3B2FD]"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                  r="17"
                  cx="31"
                  cy="31"
                />
                <circle
                  tw="text-[#4D4C58] "
                  strokeWidth="7.5"
                  stroke="currentColor"
                  fill="transparent"
                  r="17"
                  cx="31"
                  cy="31"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* MAIN_3 */}
        {/* <div tw="bg-[#343F54] rounded-xl h-[230px]">&nbsp;</div> */}
        {/* MAIN_4 */}
        <div tw="bg-[#343F54] rounded-2xl flex-grow relative overflow-auto scrollbar scrollbar-thumb-rounded scrollbar-thumb-custom-scrollbarlight">
          <div tw=" absolute w-full">
            <div tw="px-5 pt-5 pb-4 flex justify-between items-center">
              <p tw="text-white font-bold">Today Tasks</p>
              <BsThreeDots tw="text-white text-lg cursor-pointer" />
            </div>
            {isLoading && (
              <AiOutlineLoading3Quarters tw="animate-spin text-[#F7C046] text-2xl m-auto" />
            )}
            {!isLoading &&
              data?.row.map((task, index) => (
                <React.Fragment key={index}>
                  <div tw="w-full flex items-center px-5">
                    <div tw="w-[40px] h-[40px] border border-[#8E9CAD] rounded-xl flex justify-center items-center mr-3">
                      <FaTasks tw="text-sm text-[#F7C046]" />
                    </div>
                    <div tw="mr-auto">
                      <p tw="text-white font-bold text-xs mb-[2px]">{task.description}</p>
                      <p tw="text-[#8E9CAD] text-[11px]">{task.name}</p>
                    </div>
                    <div
                      tw="cursor-pointer"
                      onClick={() => {
                        // const variables = () => {}
                        const variables: any = { id: task.id, is_done: !task.is_done }
                        mutation.mutate(variables)
                      }}
                    >
                      <BsFillCheckSquareFill
                        style={{ color: task.is_done ? '#F7C046' : '#8e9cad5a' }}
                      />
                    </div>
                  </div>
                  <hr tw="bg-[#8e9cad25] border-none h-[1px] my-3 mx-5 ml-[70px]" />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
