import React from 'react'
import type { NextPage } from 'next'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { FaTasks } from 'react-icons/fa'
import { BsThreeDots, BsFillCheckSquareFill } from 'react-icons/bs'
import tw, { css } from 'twin.macro'
import { useQuery } from 'react-query'
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
  name: string
  description: string
}

interface ReturnData {
  row: tasks[]
}

const fetchData = async ({ signal }: any): Promise<ReturnData> => {
  const { data } = await axios.get('https://qazwsx-todo-app-be.herokuapp.com/todos', {
    // Pass the signal to `axios`
    signal,
  })
  return { row: data }
}

const Home: NextPage = () => {
  const { data, isLoading, isError } = useQuery('/todos', ({ signal }) => fetchData({ signal }))

  console.log(3333, data?.row, isLoading, isError)

  return (
    <MainLayout>
      <div tw="rounded-3xl flex flex-col gap-6 flex flex-col">
        {/* MAIN_1 */}
        <div tw="pt-8 flex items-center gap-4">
          <h1 tw="text-white text-2xl font-bold mr-auto">Dashboard</h1>
          <div tw="bg-[#F7C046] rounded-xl flex items-center py-2 px-4 text-sm text-[#222c41]">
            <AiOutlinePlus tw="text-[#222c41] mr-1" />
            New Task
          </div>
          <div tw="w-[34px] h-[34px] border border-[#343F54] rounded-full flex justify-center items-center">
            <IoMdNotificationsOutline tw="text-white" />
          </div>
          <div
            tw="w-[34px] h-[34px] rounded-full bg-cover"
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
            <div tw="px-5 pt-5 pb-2 flex justify-between items-center">
              <p tw="text-white font-bold">Today Tasks</p>
              <BsThreeDots tw="text-white text-lg" />
            </div>
            {!isLoading &&
              data?.row.map((task, index) => (
                <React.Fragment key={index}>
                  <div tw="w-full flex items-center px-5">
                    <div tw="w-[45px] h-[45px] border border-[#8E9CAD] rounded-xl flex justify-center items-center mr-3">
                      <FaTasks tw="text-xl text-[#F7C046]" />
                    </div>
                    <div tw="mr-auto">
                      <p tw="text-white font-bold text-xs mb-[2px]">{task.name}</p>
                      <p tw="text-[#8E9CAD] text-[11px]">{task.description}</p>
                    </div>
                    <div>
                      <BsFillCheckSquareFill tw="text-[#F7C046]" />
                    </div>
                  </div>
                  <hr tw="bg-[#8e9cad25] border-none h-[1px] my-2 mx-5 ml-20" />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
