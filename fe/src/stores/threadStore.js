import { defineStore } from 'pinia'

export const useThreadStore = defineStore({
  id: 'thread',
  state: () => ({
    threads : [],
    current : null
  }),
  actions: {
    setCurrentThread(thread_id) {
      this.current = this.threads.find(obj => obj.thread_id == thread_id);
    },
    setThreads(threads) {
      this.threads = threads
    }
  },
})
