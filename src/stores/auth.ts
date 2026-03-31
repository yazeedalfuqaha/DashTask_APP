import { defineStore } from 'pinia'
import { auth } from 'src/boot/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'

export type User = {
  uid: string
  email: string | null
  displayName: string | null
} | null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User,
    error: null as string | null,
    initialized: false 
  }),
  actions: {

    async signup(email: string, password: string, name: string) {
      this.error = null
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(res.user, {
          displayName: name
        })

        this.user = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: name
        }
      } catch (err: unknown) {
        this.error = (err as { message: string })?.message ?? String(err)
      }
    },

    async login(email: string, password: string) {
      this.error = null
      try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        this.user = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName
        }
      } catch (err: unknown) {
        this.error = (err as { message: string })?.message ?? String(err)
      }
    },

    async logout() {
      try {
        await signOut(auth)
        this.user = null
      } catch (err) {
        console.error('Logout error:', err)
      }
    },

    setUserFromFirebase(firebaseUser: { uid: string; email: string | null; displayName?: string | null } | null) {
      this.user = firebaseUser
        ? {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName ?? null
          }
        : null
    },


    init() {
      onAuthStateChanged(auth, (firebaseUser) => {
        this.setUserFromFirebase(firebaseUser)
        this.initialized = true
      })
    }

  }
})
