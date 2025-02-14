<template>
  <div
    v-sparkle-focus
    class="about text-k-text-secondary text-center max-w-[480px] overflow-hidden relative"
    data-testid="about-sparkle"
    tabindex="0"
    @keydown.esc="close"
  >
    <main class="p-6">
      <div class="mb-4">
        <img alt="Sparkle's logo" class="inline-block" src="@/../img/logo.svg" width="128">
      </div>

      <p v-if="shouldNotifyNewVersion" data-testid="new-version-about">
        <a :href="latestVersionReleaseUrl" target="_blank">
          A new version of Sparkle is available ({{ latestVersion }})!
        </a>
      </p>

      <p class="author">
        Made with ❤️ by
        <a href="" rel="noopener" target="_blank">Sparkle Infotech</a>
        and quite a few
        <a href="" rel="noopener" target="_blank">awesome</a>&nbsp;<a
          href="" rel="noopener" target="_blank"
        ></a>.
      </p>

      <CreditsBlock v-if="isDemo" />
      <SponsorList />
    </main>

    <footer>
      <Btn danger data-testid="close-modal-btn" rounded @click.prevent="close">Close</Btn>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useAuthorization } from '@/composables/useAuthorization'
import { useNewVersionNotification } from '@/composables/useNewVersionNotification'
import { eventBus } from '@/utils/eventBus'

import SponsorList from '@/components/meta/SponsorList.vue'
import Btn from '@/components/ui/form/Btn.vue'
import CreditsBlock from '@/components/meta/CreditsBlock.vue'

const emit = defineEmits<{ (e: 'close'): void }>()

const {
  shouldNotifyNewVersion,
  currentVersion,
  latestVersion,
  latestVersionReleaseUrl,
} = useNewVersionNotification()

const { isAdmin } = useAuthorization()

const close = () => emit('close')

const showPlusModal = () => {
  close()
  eventBus.emit('MODAL_SHOW_SPARKLE')
}

const isDemo = window.IS_DEMO
</script>

<style lang="postcss" scoped>
p {
  @apply mx-0 my-3;
}

a {
  @apply text-k-text-primary hover:text-k-accent;
}

.plus-badge {
  .key {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(97.78deg, #c62be8 17.5%, #671ce4 113.39%);
  }
}
</style>
