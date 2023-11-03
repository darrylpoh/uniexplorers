import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchWrapper } from '../helpers/fetch-wrapper';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    searchResults : [],
    searchQuery : '',
    minGpa : 2,
    textSearchResults : []
  }),
  actions: {
    async getSearchResults(query) {
      // if no query and no results, assumed to be first time load, so retrieve all and set mingpa
      if (!query && this.searchResults.length == 0) {
        return fetchWrapper.get(import.meta.env.VITE_BACKEND + '/universities').then(data => {
          this.searchResults = data
          this.minGpa = data.reduce((prev, curr) => prev.gpa_10_percentile < curr.gpa_10_percentile ? prev : curr).gpa_10_percentile
        }).catch(err => {
          return Promise.reject(err);
          })
      } else if (query == 'reset') {
        // if i get query is reset, then re-retrieve all
        return fetchWrapper.get(import.meta.env.VITE_BACKEND + '/universities').then(data => {
          this.searchResults = data
        }).catch(err => {
          return Promise.reject(err);
          })
      } else if (!query) {
        // if i dont get any query, but is still called, means im just trying to get the results
        return this.searchResults
      } else {
        return fetchWrapper.get(import.meta.env.VITE_BACKEND + '/universities' + query).then(data => {
          this.searchResults = data
          return data.length > 0
        }).catch(err => {
          return Promise.reject(err);
        })
      }

    },
    setSearchResults(results) {
      this.searchResults = results
    },
    async getTextSearchResults(query) {

    },
    setSearchQuery(query) {
      this.searchQuery = query
    }
  },
})
