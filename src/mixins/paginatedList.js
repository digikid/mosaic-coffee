import { pageLimit } from '@/config'

export default {
  props: {
    limit: {
      type: Number,
      default: pageLimit
    },
    searchQuery: {
      type: String,
      default: ''
    }
  }
}
