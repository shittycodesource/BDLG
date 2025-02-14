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

                    <base-button :isColored="true" :isRed="true" @click.native="send">
                        {{ 'Files_Upload' | localize }}
                    </base-button>
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

import vFilesWrapper from '../components/vFilesWrapper.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Upload",
    components: { BaseDropPlace, vFilesWrapper, BaseButton, BaseIcon, BaseLoadingOverlay, BaseFile },
    data() {
        return {
            files: [],
            isRequestActive: false,
        }
    },
    methods: {
        ...mapActions(['sendFiles', 'removeFileFromState']),
        async send() {
            try {
                this.isRequestActive = true;
                
                await this.sendFiles(this.getDroppedFiles);

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
        ...mapGetters(['getDroppedFiles'])
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
    }
</style>