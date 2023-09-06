import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: {
      'Business' : 'bluepastel',
      'Information Systems' : 'greenpastel',
      'Accountancy' : 'yellowpastel',
      'Computer Science' : 'red',
    }
  }),
  getters: {
    getColour(state) {
      return (tag) => {state.tags[tag]}
    }
  },
})
