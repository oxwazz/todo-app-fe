import React from 'react'
import type { NextPage } from 'next'
import {
  AiOutlineCalendar,
  AiOutlinePieChart,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineLineChart,
  AiOutlineMessage,
  AiOutlineRise,
  AiOutlinePlus,
} from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { FaTasks } from 'react-icons/fa'
import { BsThreeDots, BsFillCheckSquareFill } from 'react-icons/bs'
import tw, { css } from 'twin.macro'
import { Children } from 'react'

// const hoverStyles = css`
//   &:hover {
//     border-color: black;
//     ${tw`text-black`}
//   }
// `
// const Input = ({ hasHover }: any) => <input css={[tw`border`, hasHover && hoverStyles]} />

const Home: NextPage = ({ children }) => {
  return (
    <div tw="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[250px auto] gap-6 p-4 h-screen">
      {/* LEFT SIDE */}
      <div tw="bg-white rounded-3xl p-6 flex flex-col hidden sm:hidden md:flex">
        <div tw="hover:bg-[#f3f3f3]  cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlinePieChart
            style={{ stroke: '#6969DE', strokeWidth: '10' }}
            tw="text-[#6969DE] text-xl"
          />
          <p tw="text-[#6969DE] font-bold">Tasks</p>
        </div>
        {/* <div tw="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineCalendar tw="text-[#8E9CAD] text-xl" />
          <p tw="text-[#8E9CAD]">Calendar</p>
        </div>
        <div tw="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineRise tw="text-[#8E9CAD] text-xl" />
          <p tw="text-[#8E9CAD]">Activity</p>
        </div>
        <div tw="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineMessage tw="text-[#8E9CAD] text-xl" />
          <p tw="text-[#8E9CAD]">Messages</p>
        </div>
        <div tw="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineLineChart tw="text-[#8E9CAD] text-xl" />
          <p tw="text-[#8E9CAD]">Project Plan</p>
        </div> */}
        <div tw="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineSetting tw="text-[#8E9CAD] text-xl" />
          <p tw="text-[#8E9CAD]">Settings</p>
        </div>
        <div tw="hover:bg-[#ffeaea] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3 mt-auto">
          <AiOutlineLogout tw="text-[#E86566] text-xl" />
          <p tw="text-[#E86566]">Log out</p>
        </div>
      </div>
      {/* MAIN */}
      {children ? children : ''}
      {/* <div tw="bg-[#222c41] rounded-3xl">&nbsp;</div> */}

      {/* RIGHT SIDE */}
      {/* <div tw="bg-gradient-to-b from-[#343F54] rounded-3xl hidden sm:hidden lg:block">&nbsp;</div> */}
    </div>
  )
}

export default Home
