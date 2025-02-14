<template>
</template>

<script lang="ts" setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { eventBus } from '@/utils/eventBus'

import Btn from '@/components/ui/form/Btn.vue'

const openModal = () => eventBus.emit('MODAL_SHOW_SPARKLE')
</script>
