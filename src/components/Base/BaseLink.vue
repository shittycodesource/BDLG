<template>
    <div class="file file--link">
        <header class="file__header">
            <a class="file__icon" :href="data.url" target="_blank">
                <img :src="require(`@/assets/svg/link.svg`)">
            </a>
            <a :href="data.url" target="_blank" class="file__name">{{ data.name }}</a>

            <div class="file__actions">
                <span></span>
                <div class="file__link">
                    <a :href="data.url" target="_blank">
                        <button class="file__button" type="button">ПЕРЕЙТИ</button>
                    </a>
                </div>
            </div>
        </header>
        <main class="file__content">
            <div class="file__uploader" v-if="isRaw == false">
                <template v-if="data.user">{{ data.user.name }}</template>
                <template v-else>{{ "FileGuest" | localize }}</template>
            </div>
            <div class="file__date" v-if="isRaw != true">
                {{ data.createdAt.toDate() | date(false, true) }}
            </div>
        </main>
    </div>
</template>

<script>
    import BaseButton from './BaseButton.vue';
    import BaseIcon from './BaseIcon.vue';

    import { mapGetters } from 'vuex';

    export default {
        name: "BaseLink",
        components: { BaseButton, BaseIcon },
        props: {
            data: {
                type: [Object, File],
                default: () => {}
            },
            isRemoveable: {
                type: Boolean,
                default: false
            },
            isRaw: {
                type: Boolean,
                default: false
            },
            isDownloadble: {
                type: Boolean,
                default: false
            },
            isEditing: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['getAuth', 'getUser'])
        }
    }
</script>

<style lang="scss">
    .file {
        &--link {
            background: rgba(146, 189, 255, .5);
            border-color: #92BDFF;
            
            .file {
                &__name {
                    color: #fff;
                    text-decoration: underline;
                    font-weight: 900;
                }

                &__content {
                    color: #92BDFF;
                }

                &__link {
                    a {
                        text-decoration: none;
                    }
                }

                &__button {
                    max-width: unset;
                    width: fit-content;
                    color: #41608E;
                    border-color: #BAD6FF;
                    background: #92BDFF;
                    font-weight: 900;
                    text-decoration: none;
                    font-family: inherit;
                }
            }
        }
    }
</style>