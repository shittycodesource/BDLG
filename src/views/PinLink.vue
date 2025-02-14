<template>
    <div class="pin-link">
        <div class="container">
            <div class="pin-link__inner">
                <h3 class="pin-link__title">Прикрепить ссылку</h3>

                <div class="pin-link__form">
                    <v-text-input class="pin-link__input" v-model="name" label="Подпись" placeholder="Ссылка на троян..."></v-text-input>

                    <v-text-input class="pin-link__input" v-model="text" label="Ссылка" placeholder="https://...">
                        <template #inside>
                            <base-button 
                                v-if="text.trim().length == 0" 
                                :isColored="true" 
                                :isRed="true" 
                                :isSmall="true"
                                @click.native="paste"
                            >ВСТАВИТЬ</base-button>
                        </template>
                    </v-text-input>

                    <!-- <base-button 
                        v-if="text.length" 
                        :isColored="true" 
                        :isRed="true" 
                        :isSmall="false"
                        @click.native="paste"
                    >ОЧИСТИТЬ</base-button> -->
                </div>

                     
                <template v-if="text.trim().length > 0 && name.trim().length > 0">
                    <div class="line"></div>

                    <base-button 
                        :isColored="true" 
                        :isRed="true" 
                        :isSmall="false"
                        @click.native="upload"
                    >ОТПРАВИТЬ</base-button>
                </template>

            </div>
        </div>

        <base-loading-overlay :isVisible="isRequestActive"></base-loading-overlay>
    </div>
</template>

<script>
    import vTextInput from '../components/inputs/vTextInput.vue';
    import BaseButton from '../components/Base/BaseButton.vue';

    import BaseLoadingOverlay from '../components/Base/BaseLoadingOverlay.vue';

    import { mapActions } from 'vuex';

    export default {
        name: "PinLink",
        components: {
            vTextInput,
            BaseButton,
            BaseLoadingOverlay
        },
        data() {
            return {
                name: "",
                text: "",
                isRequestActive: false
            }
        },
        methods: {
            ...mapActions(['uploadLink']),
            async paste() {
                try {
                    const text = await navigator.clipboard.readText()
                    this.text = text;
                } catch(error) {
                    console.log('paste error')
                    throw error;
                }
            },
            async upload() {
                try {
                    this.isRequestActive = true;

                    await this.uploadLink({ name: this.name.trim(), url: this.text.trim() });

                    this.text = '';
                    this.name = '';

                    this.$router.push('/');

                    this.isRequestActive = false;
                } catch(error) {
                    console.log('link upload error');
                    throw error;
                }
            }
        }
    }
</script>

<style lang="scss">
    .pin-link {
        &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        &__title {
            font-weight: 800;
            font-size: 4rem;
            text-transform: uppercase;
        }

        &__input {
            width: 100%;
            max-width: 45rem;
        }

        &__form {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            gap: 1.2rem;

            // & > button {
            //     margin-top: calc(1.9rem + .8rem);
            // }
        }
    }
</style>