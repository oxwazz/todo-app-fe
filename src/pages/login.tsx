/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (formData: FormValues) => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('foo'), 3000)
    })

    console.log(33331, 'atas')
    toast.promise(myPromise, {
      loading: 'Sign In..',
      success: 'Sign In Success',
      error: 'Sign In Error',
    })

    console.log(33331, 'bawah')

    const tes = await signIn('credentials', {
      username: formData.username,
      password: formData.password,
      redirect: false,
    })

    console.log(3333, tes)
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
