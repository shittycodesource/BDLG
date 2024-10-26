<template>
    <div class="file">
        <header class="file__header">
            <div class="file__icon">
                <img :src="require(`@/assets/svg/${img(file.extension)}`)">
            </div>
            <div class="file__name">{{ file.name }}</div>

            <div class="file__actions">
                <div class="file__editing" v-if="false">
                    <button class="file__button" type="button">
                        <base-icon name="download" width="16px" height="15px"></base-icon>
                    </button>
                    <button class="file__button" type="button">
                        <base-icon name="download" width="20px" height="20px"></base-icon>
                    </button>
                </div>
                <span v-else></span>
                <div class="file__download">
                    <button class="file__button" type="button">
                        <base-icon name="load" width="24px" height="24px"></base-icon>
                    </button>
                </div>
            </div>
        </header>
        <main class="file__content">
            <div class="file__uploader">
                <template v-if="file.isAnonymous">Anonymous</template>
                <template v-else>No accs yet</template>
            </div>
            <div class="file__date">
                {{ file.createdAt }}
            </div>
        </main>

        <!-- <div class="file__name">{{ file.name }}</div>
        <div class="file__action">
            <a 
                class="file__link"
                :href="file.url"
                target="_blank" 
                :download="file.name" 
            ><base-button :isSmall="true" v-if="isRemoveable == false">{{ 'Files_Download' | localize }}</base-button>
            </a>
            <base-button :isSmall="false" :isRed="true" v-if="isRemoveable" @click.native="$emit('remove')">{{ 'Files_Remove' | localize }}</base-button>
        </div> -->
    </div>
</template>

<script>
    import BaseButton from './BaseButton.vue';
    import BaseIcon from './BaseIcon.vue';

    export default {
        name: "BaseFile",
        components: { BaseButton, BaseIcon },
        props: {
            file: {
                type: [Object, File],
                default: () => {}
            },
            isRemoveable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            img(ext) {
                // get image based on file extension

                const list = {
                    'pptx': 'powerpoint.svg',
                    'docx': 'word.svg',
                    'doc': 'word.svg',
                }

                return list[ext];
            }
        }
    }
</script>

<style lang="scss">
    .file {
        display: flex; 
        flex-direction: column;
        // align-items: center;
        // justify-content: space-between;

        // padding: 1.2rem 1.6rem;

        // border-bottom: 1px solid #E7E7E7;
        // background: #fff;

        background: #151517;
        border: .1rem solid #222026;
        border-radius: .8rem;

        position: relative;
    
        height: 20.3rem;


        &__header {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            
            text-align: center;

            padding-top: 2rem;

            flex-grow: 1;
        }

        &__actions {
            position: absolute;
            top: .4rem;
            left: .4rem;
            width: calc(100% - .8rem);

            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        &__editing {
            display: flex;
            flex-direction: column;
            gap: .4rem;
        }

        &__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-grow: 0;

            padding: 0 .8rem 1.2rem;
        }

        &__uploader {
            font-size: 1.4rem;
            font-weight: 400;
        }

        &__date {
            font-size: 1.2rem;
            font-weight: 400;
        }

        &__button {
            width: 3rem;
            height: 3rem;

            background: #313131;
            border: .1rem solid #3E3E3E;
            border-radius: .6rem;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;

            svg {
                fill: #7E7E7E;
            }
        }

        &__icon {
            margin-bottom: 1.6rem;
        }

        &__name {
            font-size: 1.6rem;
            font-weight: 600;
        }

        &__link {
            text-decoration: none;
        }
    }
</style>