<template>
    <div class="upload">
        <div class="container">
            <div class="upload__inner">

                <div class="upload__title">{{ 'Files_DropHere' | localize }}</div>

                <base-drop-place @setFiles="value => files = value" :files="files"></base-drop-place>

                <div class="upload__subtitle" v-if="files.length">{{ 'Files_FilesToUpload' | localize }}</div>
                
                <base-files-wrapper v-if="files.length"
                    :header="false" 
                    :isRemoveable="true"

                    :data="{ files: files }"

                    @remove="file => files.splice(files.indexOf(file), 1)"
                ></base-files-wrapper>

                <base-loading-overlay :isVisible="isRequestActive"></base-loading-overlay>

                <base-button v-if="files.length" @click.native="send">
                    <base-icon name="send" width="2rem" height="2rem"></base-icon>
                    {{ 'Files_Upload' | localize }}
                </base-button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseDropPlace from '../components/Base/BaseDropPlace.vue';
import BaseButton from '../components/Base/BaseButton.vue';
import BaseIcon from '../components/Base/BaseIcon.vue';
import BaseLoadingOverlay from '../components/Base/BaseLoadingOverlay.vue';

import vFilesWrapper from '../components/vFilesWrapper.vue';

import { mapActions } from 'vuex';

export default {
    name: "Upload",
    components: { BaseDropPlace, vFilesWrapper, BaseButton, BaseIcon, BaseLoadingOverlay },
    data() {
        return {
            files: [],
            isRequestActive: false,
        }
    },
    methods: {
        ...mapActions(['sendFiles']),
        async send() {
            try {
                this.isRequestActive = true;
                
                await this.sendFiles(this.files);

                this.files = [];

                this.$router.push('/');

                this.isRequestActive = false;
            } catch (error) {
                throw error;
            }
        }
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
        }

        &__title {
            margin: 3.2rem auto;

            font-weight: 800;
            font-size: 3.5rem;
            color: #5B93FF;

            text-transform: uppercase;
        }

        &__subtitle {
            margin: 3.5rem auto -2rem;

            color: #737373;
            font-size: 3.5rem;

            text-transform: uppercase;
        }
    }
</style>