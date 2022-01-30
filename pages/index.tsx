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

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-[250px_auto_250px] gap-6 p-4 h-screen">
      <div className="bg-white rounded-3xl p-6 flex flex-col gap-2X">
        {/* LEFT SIDE */}
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlinePieChart
            style={{ stroke: '#6969DE', strokeWidth: '10' }}
            className="text-[#6969DE] text-xl"
          />
          <p className="text-[#6969DE] font-bold">Dashboard</p>
        </div>
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineCalendar className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Calendar</p>
        </div>
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineRise className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Activity</p>
        </div>
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineMessage className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Messages</p>
        </div>
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineLineChart className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Project Plan</p>
        </div>
        <div className="hover:bg-[#f3f3f3] rounded-full flex justify-items-center items-center gap-4 px-3 py-3">
          <AiOutlineSetting className="text-[#8E9CAD] text-xl" />
          <p className="text-[#8E9CAD]">Settings</p>
        </div>
        <div className="hover:bg-[#ffeaea] rounded-full flex justify-items-center items-center gap-4 px-3 py-3 mt-auto">
          <AiOutlineLogout className="text-[#E86566] text-xl" />
          <p className="text-[#E86566]">Log out</p>
        </div>
      </div>
      {/* MAIN */}
      <div className="bg-[#343F54]X rounded-3xl flex flex-col gap-6 flex flex-col">
        {/* MAIN_1 */}
        <div className="pt-8 flex items-center gap-4">
          <h1 className="text-white text-2xl font-bold mr-auto">Dashboard</h1>
          <div className="bg-[#F7C046] rounded-xl flex items-center py-2 px-4 text-sm text-[#222c41]">
            <AiOutlinePlus className="text-[#222c41] mr-1" />
            New Task
          </div>
          <div className="w-[34px] h-[34px] border border-[#343F54] rounded-full flex justify-center items-center">
            <IoMdNotificationsOutline className="text-white" />
          </div>
          <div
            className="w-[34px] h-[34px] rounded-full bg-cover"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/ogw/ADea4I6MKP2OEXDsm5vq-vsdEj76LV5RUCZZOgmlu896CnY=s192-c-mo)',
            }}
          ></div>
        </div>
        {/* MAIN_2 */}
        <div className=" flex gap-6">
          <div className="bg-[#343F54] rounded-xl h-[80px] w-full">&nbsp;</div>
          <div className="bg-[#343F54] rounded-xl h-[80px] w-full">&nbsp;</div>
        </div>
        {/* MAIN_3 */}
        <div className="bg-[#343F54] rounded-xl h-[230px]">&nbsp;</div>
        {/* MAIN_4 */}
        <div className="bg-[#343F54] rounded-xl flex-grow">&nbsp;f</div>
      </div>
      {/* <div className="bg-[#222c41] rounded-3xl">&nbsp;</div> */}

      {/* RIGHT SIDE */}
      <div className="bg-[#343F54] rounded-3xl">&nbsp;</div>
    </div>
  )
}

export default Home
