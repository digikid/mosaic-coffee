import { manageStoreHooks } from '@/utils/store/hooks'

export const usePartners = () => ({
  ...manageStoreHooks('partners')
})
