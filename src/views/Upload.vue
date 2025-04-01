<template>
    <div class="upload">
        <div class="container">
            <div class="upload__inner">
                <base-drop-place></base-drop-place>

                <template v-if="getDroppedFiles.length">

                    <div class="upload__title">ВЫБРАННЫЕ ФАЙЛЫ</div>

                    <div class="files__grid">
                        <base-file 
                            v-for="(data, index) in getDroppedFiles" 
                            :file="data" 
                            :key="index" 
                            :isRaw="true" 
                            :isDownloadble="false"
                            :isRemoveable="true"

                            @remove="unpinFile"
                        ></base-file>
                    </div>

                    <div class="line"></div>

                    <div class="upload__extra">
                        <div class="upload__title">ДОПОЛНИТЕЛЬНО</div>

                        <v-select
                            label="SelectFolder" 
                            :activeOption="selectedFolder"
                            :options="getFolders"
                            @select="option => { selectedFolder = option }"
                            @more="$router.push('/new-folder')"
                        ></v-select>
                    </div>

                    <div class="line"></div>

                    <base-button :isColored="true" :isRed="true" @click.native="send">
                        {{ 'Files_Upload' | localize }}
                    </base-button>

                    <div class="upload__margin"></div>
                </template>
                <div class="upload__empty" v-else>
                    ПУСТО
                </div>

                <base-loading-overlay :isVisible="isRequestActive"></base-loading-overlay>
            </div>
        </div>
    </div>
</template>

<script>
import BaseDropPlace from '../components/Base/BaseDropPlace.vue';
import BaseButton from '../components/Base/BaseButton.vue';
import BaseIcon from '../components/Base/BaseIcon.vue';
import BaseFile from '../components/Base/BaseFile.vue';
import BaseLoadingOverlay from '../components/Base/BaseLoadingOverlay.vue';
import vSelect from '../components/inputs/vSelect.vue';

import vFilesWrapper from '../components/vFilesWrapper.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Upload",
    components: { BaseDropPlace, vFilesWrapper, BaseButton, BaseIcon, BaseLoadingOverlay, BaseFile, vSelect },
    data() {
        return {
            files: [],
            isRequestActive: false,
            selectedFolder: ''
        }
    },
    methods: {
        ...mapActions(['sendFiles', 'removeFileFromState']),
        async send() {
            try {
                this.isRequestActive = true;
                
                // this.selectedFolder.id 

                await this.sendFiles({ files: this.getDroppedFiles, folder: this.selectedFolder.id });

                this.files = [];

                this.$router.push('/');

                this.isRequestActive = false;
            } catch (error) {
                throw error;
            }
        },
        unpinFile(data) {
            console.log('removeFile', data);

            this.removeFileFromState(data);
        }
    },
    computed: {
        ...mapGetters(['getDroppedFiles', 'getFolders'])
    },
    created() {
        console.log('created')
        this.selectedFolder = this.getFolders[0];
    },
    updated() {
        console.log('selectedfolder', this.selectedFolder);
    }
}
</script>

<style lang="scss">
    .upload {
        &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            padding-top: calc(var(--drop-place-height) + 1.6rem);
        }

        &__title {
            margin: 0 auto 1.6rem;

            font-weight: 800;
            font-size: 2rem;
            color: #FFF;

            text-align: center;
            text-transform: uppercase;
        }

        &__subtitle {
            margin: 3.5rem auto -2rem;

            color: #737373;
            font-size: 3.5rem;

            text-transform: uppercase;
        }

        &__empty {
            font-weight: 900;
            color: #181818;
            margin: 8rem auto;
            font-size: 9rem;
        }

        &__extra {
        }

        &__margin {
            margin-bottom: 16rem;
        }
    }
</style>