import { defineStore } from 'pinia'

interface IUser {
  name: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const login = (value: IUser) => {
    localStorage.setItem('login', JSON.stringify(value))
  }

  return {
    login
  }
})
