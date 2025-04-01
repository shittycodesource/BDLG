<template>
    <div class="folder-page">
        <div class="container">
            <div class="folder-page__inner">

                <base-drop-place></base-drop-place>
                
                <transition name="baseOverlayTransition">
                    <base-files-grid v-if="isLoading == false" :files="array" :title="folder.name"></base-files-grid>
                    <!-- <div class="upload__empty" v-else-if="isLoading">
                        ЗАГРУЗКА...
                    </div> -->
                </transition>
                <div class="folder__empty" v-if="array.length == 0 && isLoading == false">
                    ПУСТО
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseDropPlace from '../components/Base/BaseDropPlace.vue';
    import BaseFilesGrid from '../components/Base/BaseFilesGrid.vue';

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Folder",
        components: {
            BaseDropPlace,
            BaseFilesGrid,
        },
        data() {
            return {
                isLoading: true,
                array: [],
                folder: {},
            }
        },
        computed: {
            ...mapGetters(['getFolder'])
        },
        methods: {
            ...mapActions(['fetchFolder'])
        },
        async created() {
            try {
                const id = this.$route.params.id
                // const files = this.getFolder(id);

                const { folder, array } = await this.fetchFolder({ id: id });

                this.folder = folder;
                this.array = array;

                console.log(this.array)

                console.log('folder fetched');

                this.isLoading = false;
            } catch(error) {
                throw error;
            }
        }
    }
</script>

<style lang="scss">
    .folder-page {
        &__inner {
            padding-top: calc(var(--drop-place-height) + 1.6rem);
        }
    }

    .folder__empty {
        font-weight: 900;
        color: #181818;
        margin: 8rem auto;
        text-align: center;
        font-size: 9rem;
    }
</style>