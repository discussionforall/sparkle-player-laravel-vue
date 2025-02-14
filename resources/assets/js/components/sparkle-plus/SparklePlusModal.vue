<template>
  <div class="plus text-k-text-secondary max-w-[480px] flex flex-col items-center" data-testid="" tabindex="0">
    <img
      alt=""
      class="-mt-[48px] rounded-full border-[6px] border-white"
      src=""
      width="96"
    >

    <main class="!px-8 !py-5 text-center flex flex-col gap-5">

      <div v-show="!showingActivateLicenseForm" class="space-x-3" data-testid="buttons">
      </div>

      <div v-if="showingActivateLicenseForm" class="flex gap-3" data-testid="activateForm">
        <ActivateLicenseForm v-if="showingActivateLicenseForm" class="flex-1" />
        <Btn class="cancel" transparent @click.prevent="hideActivateLicenseForm">Cancel</Btn>
      </div>

      <div class="text-[0.9rem] opacity-70">
        Visit <a href="https://sparkle.dev#plus" target="_blank">sparkle.dev</a> for more information.
      </div>
    </main>

    <footer class="w-full text-center bg-black/20">
      <Btn danger data-testid="close-modal-btn" rounded @click.prevent="close">Close</Btn>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import Btn from '@/components/ui/form/Btn.vue'
import ActivateLicenseForm from '@/components/sparkle-plus/ActivateLicenseForm.vue'

const emit = defineEmits<{ (e: 'close'): void }>()

const close = () => emit('close')

const showingActivateLicenseForm = ref(false)

const openPurchaseOverlay = () => {
  close()
}

const showActivateLicenseForm = () => (showingActivateLicenseForm.value = true)
const hideActivateLicenseForm = () => (showingActivateLicenseForm.value = false)

onMounted(() => window.createLemonSqueezy?.())
</script>
