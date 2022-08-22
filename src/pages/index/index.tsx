import React from 'react'
import type { NextPage } from 'next'
import { AiOutlinePlus, AiOutlineLoading3Quarters, AiOutlineSetting } from 'react-icons/ai'
import { FaTasks } from 'react-icons/fa'
import { BsThreeDots, BsFillCheckSquareFill } from 'react-icons/bs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Head from 'next/head'

import { MainLayout } from '@/src/shared-components/layout'
import { fetchTodos, updateTodo } from '@/src/requests'
import DialogUser from './dialog-user'

type tasks = {
  task_id: string
  name: string
  description: string
  is_done: boolean
}

type ReturnData = {
  row: tasks[]
}

const Home: NextPage = () => {
  const queryClient = useQueryClient()

  queryClient.setMutationDefaults('addTodo', {
    mutationFn: async ({ task_id, is_done }) => {
      return await updateTodo({ taskId: task_id, isDone: is_done })
    },
    onMutate: async (variables: tasks) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries('/todos')

      // Create optimistic todo
      const optimisticTodo = { task_id: variables.task_id, is_done: variables.is_done }

      // Add optimistic todo to todos list
      queryClient.setQueryData<ReturnData | undefined>('/todos', (old) => {
        if (old) {
          const newDataIndex = old.row.findIndex((v) => {
            console.log(3333, newDataIndex, v, optimisticTodo)
            return v.task_id === optimisticTodo.task_id
          })
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
    retry: 3,
  })

  const { data, isLoading, isError } = useQuery('/todos', async ({ signal }) => {
    const [result] = await fetchTodos({ signal })
    return result
  })
  const mutation = useMutation('addTodo')

  console.log(333399, { data, isLoading, isError })

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
      </Head>
      <MainLayout>
        <div className="rounded-3xl flex flex-col gap-4 md:gap-6">
          {/* MAIN_1 */}
          <div className="pt-8 flex items-center gap-4">
            <h1 className="text-white text-2xl font-bold mr-auto">Dashboard</h1>
            <div className="bg-[#F7C046] cursor-pointer rounded-xl items-center py-2 px-4 text-sm text-[#222c41] hidden whitespace-nowrap sm:flex">
              <AiOutlinePlus className="text-[#222c41] mr-1" />
              New Task
            </div>
            <div className="w-[2.125rem] h-[2.125rem] cursor-pointer border border-[#343F54] rounded-full flex justify-center items-center sm:hidden">
              <AiOutlineSetting className="text-white" />
            </div>
            <DialogUser />
          </div>

          <div className="bg-[#343F54] rounded-2xl flex-grow relative overflow-auto scrollbar scrollbar-thumb-rounded scrollbar-thumb-custom-scrollbarlight">
            <div className=" absolute w-full">
              <div className="px-5 pt-5 pb-4 flex justify-between items-center">
                <p className="text-white font-bold">Today Tasks</p>
                <BsThreeDots className="text-white text-lg cursor-pointer" />
              </div>
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin text-[#F7C046] text-2xl m-auto" />
              )}
              {!isLoading &&
                data?.row?.map((todo, index) => (
                  <React.Fragment key={index}>
                    <div className="w-full flex items-center px-5">
                      <div className="w-[2.5rem] h-[2.5rem] border border-[#8E9CAD] rounded-xl flex justify-center items-center mr-3">
                        <FaTasks className="text-sm text-[#F7C046]" />
                      </div>
                      <div className="mr-auto">
                        <p className="text-white font-bold text-sm mb-[0.125rem]">
                          {todo.description}
                        </p>
                        <p className="text-[#8E9CAD] text-xs">{todo.name}</p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const variables: any = { task_id: todo.task_id, is_done: !todo.is_done }
                          console.log(33334, variables)
                          mutation.mutate(variables)
                        }}
                      >
                        <BsFillCheckSquareFill
                          style={{ color: todo.is_done ? '#F7C046' : '#8e9cad5a' }}
                        />
                      </div>
                    </div>
                    <hr className="bg-[#8e9cad25] border-none h-[0.063rem] my-3 mx-5 ml-[4.375rem]" />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 right-6 w-10 h-10 bg-[#F7C046] rounded-full flex justify-center items-center sm:hidden">
          <AiOutlinePlus className="text-[#222c41]" />
        </div>
      </MainLayout>
    </>
  )
}

export default Home
