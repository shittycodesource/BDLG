<template>
    <div class="file">
        <header class="file__header">
            <div class="file__icon" v-if="img() != false">
                <img v-if="img() != false" :src="require(`@/assets/svg/${img()}`)">
            </div>
            <div class="file__sprite" v-else>
                <!-- bro -->
                <base-icon name="img"></base-icon>
            </div>
            <div class="file__name">{{ file.name }}</div>

            <div class="file__actions">
                <div class="file__editing" v-if="isEditing">
                    <button class="file__button" type="button">
                        <base-icon name="download" width="16px" height="15px"></base-icon>
                    </button>
                    <button class="file__button" type="button">
                        <base-icon name="download" width="20px" height="20px"></base-icon>
                    </button>
                </div>
                <span v-else></span>
                <div class="file__download" v-if="isDownloadble">
                    <a :href="file.url" download target="_blank">
                        <button class="file__button" type="button">
                            <base-icon name="load" width="24px" height="24px"></base-icon>
                        </button>
                    </a>
                </div>
                <div class="file__download" v-if="isRemoveable" @click="$emit('remove', file)">
                    <button class="file__button" type="button">
                        <base-icon name="remove" width="24px" height="24px"></base-icon>
                    </button>
                </div>
            </div>
        </header>
        <main class="file__content">
            <div class="file__uploader" v-if="isRaw == false">
                <!-- <template v-if="isRaw">
                    <template v-if="getAuth">{{ getUser.name }}</template>
                    <template v-else>Anonymous</template>
                </template> -->
                <!-- <template v-else> -->
                    <template v-if="file.user">{{ file.user.name }}</template>
                    <template v-else>{{ "FileGuest" | localize }}</template>
                <!-- </template> -->
            </div>
            <div class="file__date" v-if="isRaw != true">
                {{ file.createdAt.toDate() | date(false, true) }}
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

    import { mapGetters } from 'vuex';

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
        methods: {
            img() {
                // get image based on file extension
                const filename = this.file.name;
                const ext = filename.substring(filename.lastIndexOf('.')+1, filename.length)

                const list = {
                    'pptx': 'powerpoint.svg',
                    'ppt': 'powerpoint.svg',
                    'odp': 'powerpoint.svg',
                    
                    'docx': 'word.svg',
                    'doc': 'word.svg',

                    'pdf': 'pdf.svg',

                    'jpg': 'img.svg',
                    'png': 'img.svg',
                    'gif': 'img.svg',
                    'webp': 'img.svg',
                    'svg': 'img.svg',
                    'jpeg': 'img.svg',
                    'webp': 'img.svg',
                }


                if (list[ext] == 'img.svg') {
                    return false;
                }

                if (list[ext] == undefined){
                    return false;
                }

                return list[ext];
            },
        },
        computed: {
            ...mapGetters(['getAuth', 'getUser'])
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
    
        // height: 20.3rem;
        width: 100%;


        &__header {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            
            text-align: center;

            padding-top: 2rem;
            margin-bottom: .8rem;

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

        &__sprite {
            svg {
                fill: #fff;
                max-height: 9.3rem;
            }
        }

        &__name {
            font-size: 1.6rem;
            font-weight: 600;

            padding: 0 .4rem;
            line-height: 1.6;

            white-space: pre-line;
            line-height: 1.5;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            word-break: break-word;
            -webkit-box-orient: vertical;
        }

        &__link {
            text-decoration: none;
        }
    }
</style>