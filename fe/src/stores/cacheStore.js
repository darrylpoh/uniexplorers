import { defineStore } from 'pinia'
import axios from 'axios'
import { fetchWrapper } from '../helpers/fetch-wrapper'

export const useCacheStore = defineStore({
  id: 'cache',
  state: () => ({
    img : {},
    threads : [],
    current : null,

  }),
  actions: {
    async setCurrentThread(thread_id) {
        if (this.threads === [] || !this.current) {
            return fetchWrapper.get(import.meta.env.VITE_BACKEND + '/forum/' + thread_id).then(data => {
              this.current = data[0]
              console.log(this.current)
              return this.current
            })
          } else {
            this.current = this.threads.find(obj => obj.thread_id == thread_id);
            return this.current
          }
    },
    setThreads(threads) {
      this.threads = threads
    },
    addImg(key, imgBlob) {
        this.img[key] = imgBlob
    },
    async getImg(key) {
        if (this.img[key]) {
            return this.img[key]
        } else {
            return await axios.get(import.meta.env.VITE_BACKEND + '/images/' + key, {responseType : 'blob'}).then(res => {
                const retrievedImg = URL.createObjectURL(new Blob([res.data]))
                this.img[key] = retrievedImg
                return retrievedImg
            })
        }
    }
  },
})
