<script lang="ts">
export default {
    name: 'Iframe',
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTagStore } from '@/store/index'
const route = useRoute()
const tagStore = useTagStore()
const list = computed(() =>
    tagStore.data.filter((item) => item?.query?.iframe).map((item) => item?.query?.iframe as string)
)
const iframe = computed(() => route.query.iframe)
</script>

<template>
    <Teleport to="#iframe">
        <iframe
            v-show="iframe === src"
            v-for="src in list"
            :src="src"
            :key="src"
            frameborder="0"
            width="100%"
            height="100%"
        ></iframe>
    </Teleport>
</template>
