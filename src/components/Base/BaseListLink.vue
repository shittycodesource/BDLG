<template>
    <div class="list-file list-file--link">
        <header class="list-file__header">
            <div class="list-file__uploader">
                Гость <span>прикрепил ссылку</span>
            </div>
            <div class="list-file__date">
                {{ data.createdAt.toDate() | date(false, true) }}
            </div>
        </header>
        <main class="list-file__content">
            <div class="list-file__item"    >
                <div class="list-file__data">
                    <div class="list-file__icon">
                        <img :src="require(`@/assets/svg/link.svg`)">
                    </div><!--
                    <div class="file__sprite" v-else>
                        <base-icon name="link" width="2rem" height="2rem"></base-icon>
                    </div> -->
                    <div class="list-file__name">{{ data.name }}</div>
                </div>
                <a :href="data.url" download target="_blank" class="list-file__download-link">
                    <button class="list-file__download" type="button">
                        <base-icon name="load" width="2rem" height="2rem"></base-icon>
                        ПЕРЕЙТИ
                    </button>
                </a>
            </div>
        </main>
    </div>
</template>

<script>
    import BaseIcon from './BaseIcon.vue';

    export default {
        name: "BaseListLink",
        components: {
            BaseIcon
        },
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style lang="scss">
    .list-file {
        &--link {
            background: rgba(146, 189, 255, .5);
            border-color: #92BDFF;

            .list-file {
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

                &__header {
                    background: #92BDFF;
                    border-color: #BAD6FF;
                    font-weight: 700;
                }

                &__download {
                    max-width: unset;
                    width: fit-content;
                    color: #41608E;
                    border-color: #BAD6FF;
                    background: #92BDFF;
                    font-weight: 900;
                    text-decoration: none;
                    font-family: inherit;

                    svg {
                        display: none;
                    }
                }

                &__item {
                    border: none;
                }
            }

        }
    }
</style>