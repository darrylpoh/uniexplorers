import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    searchResults : [],
    searchQuery : ''
  }),
  actions: {
    setSearchResults(results) {
      this.searchResults = results;
    },
    setSearchQuery(query) {
      this.searchQuery = query
    }
  },
})
