/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

import { login } from '@/src/requests'
import { useRouter } from 'next/router'

type FormValues = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

export default function Register() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async ({ username, password }: FormValues) => {
    const loginPromise = async () => {
      // @ts-ignore
      const { error } = await signIn('credentials', { username, password, redirect: false })
      if (error) return Promise.reject(error)
      await router.push('/app')
    }

    await toast.promise(loginPromise(), {
      loading: 'Sign In..',
      success: 'Sign In Success',
      error: (error) => `Sign In Error: ${error}`,
    })
  }

  return (
    <>
      {/* <Toaster /> */}
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-2xl font-bold text-white">Todo App</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
            </div>
            <button
              className="mt-4 p-2 rounded-md bg-[#F7C046] hover:bg-[#daa32f] text-[#222c41]"
              type="submit"
            >
              login
            </button>
          </form>
          <Link href="/register">
            <a className="text-sm text-white hover:underline">Don't have account?</a>
          </Link>
        </div>
      </div>
    </>
  )
}
