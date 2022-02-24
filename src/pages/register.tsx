import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'

type FormValues = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().min(3).required(),
    password: yup.string().min(8).required(),
  })
  .required()

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  console.log(33331, isSubmitting)

  const onSubmit = async (formData: FormValues) => {
    const tes = new Promise((resolve, reject) => {
      setTimeout(() => resolve('foo'), 3000)
    })
    const halo = await tes
    console.log(33333, halo)
  }

  const onError = async (error: any) => {
    console.log(33333, error)
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-bold text-white">Todo App</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-1">
            <label className="text-white" htmlFor="username">
              Username
            </label>
            <input
              className="p-2 rounded-md"
              placeholder="hello@world.com"
              id="username"
              type="text"
              {...register('username')}
            />
            {errors.username && (
              <strong className="text-[#F7C046] text-xs">{errors.username.message}</strong>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 rounded-md"
              placeholder="Type your password"
              id="username"
              type="password"
              {...register('password')}
            />
            {console.log(errors)}
            {errors.password && (
              <strong className="text-[#F7C046] text-xs">{errors.password.message}</strong>
            )}
          </div>
          <button
            className="flex justify-center items-center mt-4 p-2 rounded-md bg-[#F7C046] hover:bg-[#daa32f] text-[#222c41]"
            type="submit"
          >
            {/* {isSubmitting ? (
              <motion.div animate={{ x: 100 }} transition={{ ease: 'easeOut', duration: 2 }}>
                sdfsdf
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ x: 100 }}
                transition={{ ease: 'easeOut', duration: 2 }}
              >
                sdfsdfdddd
              </motion.div>
            )} */}
            <motion.div
              animate={isSubmitting ? { opacity: 0 } : { opacity: 100 }}
              transition={{ ease: 'easeOut', duration: 1 }}
            >
              sdfsdfdddd
            </motion.div>
            {/* {isSubmitting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            register */}
          </button>
        </form>
        <Link href="/login">
          <a className="text-sm text-white hover:underline">Already have account?</a>
        </Link>
      </div>
    </div>
  )
}
