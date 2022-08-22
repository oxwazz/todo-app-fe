import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
// import { motion } from 'framer-motion'

import { register as signup } from '@/src/requests'

type FormValues = {
  email: string
  username: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().min(3).required(),
    password: yup.string().min(8).required(),
  })
  .required()

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (registerData: FormValues) => {
    const signupPromise = async () => {
      const [err] = await signup({
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        profile_picture: '',
      })
      if (err) return Promise.reject(err.message)
      await Promise.resolve()
    }

    toast.promise(signupPromise(), {
      loading: 'Sign Up..',
      success: 'Sign Up Success',
      error: (error) => `Sign Up Error: ${error}`,
    })
  }

  const onError = async (error: any) => {
    console.log(33333, error)
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-2xl font-bold text-white">Todo App</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-1">
              <label className="text-white" htmlFor="email">
                Email
              </label>
              <input
                className="p-2 rounded-md"
                placeholder="Type your email"
                id="email"
                type="text"
                {...register('email')}
              />
              {errors.email && (
                <strong className="text-[#F7C046] text-xs">{errors.email.message}</strong>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white" htmlFor="username">
                Username
              </label>
              <input
                className="p-2 rounded-md"
                placeholder="Type your username"
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
              className={`flex justify-center items-center mt-4 p-2 rounded-md bg-[#F7C046] hover:bg-[#daa32f] text-[#222c41] ${
                isSubmitting ? 'opacity-30' : ''
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              register
            </button>
          </form>
          <Link href="/login">
            <a className="text-sm text-white hover:underline">Already have account?</a>
          </Link>
        </div>
      </div>
    </>
  )
}
