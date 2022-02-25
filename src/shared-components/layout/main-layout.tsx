import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { AiOutlinePieChart, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai'
import { signOut } from 'next-auth/react'

const Home: NextPage = ({ children }) => {
  const router = useRouter()

  const handleClickMenuTasks = () => {
    router.push('/')
  }

  const handleClickMenuSetting = () => {
    router.push('/setting')
  }

  const onLogout = () => {
    signOut({ callbackUrl: 'http://localhost:3030/api/auth/signin' })
  }

  return (
    <div className="grid sm:grid-cols-[250px_auto] gap-6 p-4 h-screen">
      {/* LEFT SIDE */}
      <div className="bg-white rounded-3xl p-6 hidden flex-col sm:flex">
        <div
          onClick={handleClickMenuTasks}
          className="hover:bg-[#f3f3f3]  cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3"
        >
          <AiOutlinePieChart
            style={{ stroke: '#6969DE', strokeWidth: '10' }}
            className="text-[#6969DE] text-xl"
          />
          <p className="text-[#6969DE] font-bold">Tasks</p>
        </div>
        <div
          onClick={handleClickMenuSetting}
          className="hover:bg-[#f3f3f3] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3"
        >
          <AiOutlineSetting className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Settings</p>
        </div>
        <div
          className="hover:bg-[#ffeaea] cursor-pointer rounded-full flex justify-items-center items-center gap-4 px-3 py-3 mt-auto"
          onClick={onLogout}
        >
          <AiOutlineLogout className="text-[#E86566] text-xl" />
          <p className="text-[#E86566]">Log out</p>
        </div>
      </div>
      {children ? children : ''}
    </div>
  )
}

export default Home
