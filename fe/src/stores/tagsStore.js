import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: {
      'Business' : {
        background : 'bluepastel',
        font : 'content'
      },
      'Information Systems' : {
        background : 'greenpastel',
        font : 'content'
      },
      'Accountancy' : {
        background : 'yellowpastel',
        font : 'white'
      },
      'Computer Science' : {
        background : 'red',
        font : 'white'
      },
    }
  }),
})
