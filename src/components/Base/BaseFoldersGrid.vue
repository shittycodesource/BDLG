<template>
    <div class="folders">
        
        <base-grid-header>ПАПКИ</base-grid-header>

        <div class="folders__grid">
            <base-folder v-for="(data, index) in folders" :data="data" :key="index"></base-folder>
        </div>
    </div>
</template>

<script>
    import BaseGridHeader from './BaseGridHeader.vue';
    import BaseFolder from './BaseFolder.vue';

    export default {
        name: "BaseFoldersGrid",
        components: {
            BaseGridHeader,
            BaseFolder
        },
        props: {
            folders: {
                type: Array
            }
        }
    }
</script>

<style lang="scss">
    .folders {
        margin-bottom: 1.6rem;

        &__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.6rem;
        }
    }
</style>