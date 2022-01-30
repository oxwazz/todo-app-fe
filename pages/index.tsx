import type { NextPage } from 'next'
import {
  AiOutlineCalendar,
  AiOutlinePieChart,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineLineChart,
  AiOutlineMessage,
  AiOutlineRise,
} from 'react-icons/ai'

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-[250px_auto_250px] gap-8 p-4 h-screen">
      <div className="bg-white rounded-3xl p-6 flex flex-col gap-6">
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlinePieChart
            style={{ stroke: '#6969DE', strokeWidth: '10' }}
            className="text-[#6969DE] text-xl"
          />
          <p className="text-[#6969DE] font-bold">Dashboard</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlineCalendar className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Calendar</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlineRise className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Activity</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlineMessage className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Messages</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlineLineChart className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Project Plan</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4">
          <AiOutlineSetting className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Settings</p>
        </div>
        <div className="bg-green-700- flex justify-items-center items-center gap-4 mt-auto">
          <AiOutlineLogout className="text-[#E86566] text-xl" />
          <p className="text-[#E86566]">Log out</p>
        </div>
      </div>
      <div className="bg-white rounded-3xl">&nbsp;</div>
      <div className="bg-[#343F54] rounded-3xl">&nbsp;</div>
    </div>
  )
}

export default Home
