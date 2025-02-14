<template>
  <form class="license-form flex items-stretch" @submit.prevent="validateLicenseKey">
    <TextInput
      v-model="licenseKey"
      v-sparkle-focus
      :disabled="loading"
      class="!rounded-r-none"
      name="license"
      placeholder="Enter your license key"
      required
    />
    <Btn :disabled="loading" class="!rounded-l-none" type="submit">Activate</Btn>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDialogBox } from '@/composables/useDialogBox'
import { useErrorHandler } from '@/composables/useErrorHandler'

import Btn from '@/components/ui/form/Btn.vue'
import TextInput from '@/components/ui/form/TextInput.vue'
import { forceReloadWindow } from '@/utils/helpers'

const { showSuccessDialog } = useDialogBox()
const licenseKey = ref('')
const loading = ref(false)

const validateLicenseKey = async () => {
  try {
    loading.value = true
    forceReloadWindow()
  } catch (error: unknown) {
    useErrorHandler('dialog').handleHttpError(error)
  } finally {
    loading.value = false
  }
}
</script>
