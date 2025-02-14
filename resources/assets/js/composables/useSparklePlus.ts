import { computed } from 'vue'
import { commonStore } from '@/stores/commonStore'

export const useSparkle = () => {
  return {
    isPlus: computed(() => commonStore.state.sparkle.active),
    license: {
      shortKey: commonStore.state.sparkle.short_key,
      customerName: commonStore.state.sparkle.customer_name,
      customerEmail: commonStore.state.sparkle.customer_email,
    },
    checkoutUrl: computed(() =>
      ``,
    ),
  }
}
