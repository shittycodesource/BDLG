<template>
    <div class="list-file">
        <header class="list-file__header">
            <div class="list-file__uploader">
                <template v-if="data.isAnonymous">Anonymous </template>
                <template v-else>No accs yet </template>
                <span>uploaded {{ data.files.length }} files</span>
            </div>
            <div class="list-file__date">
                {{ data.createdAt }}
            </div>
        </header>
        <main class="list-file__content">
            <div 
                v-for="(file, index) in data.files" 
                :key="index"
            
                class="list-file__item"    
            >
                <div class="list-file__data">
                    <div class="list-file__icon">
                        <img :src="require(`@/assets/svg/${img(file.extension)}`)">
                    </div>
                    <div class="list-file__name">{{ file.name }}</div>
                </div>
                <div class="list-file__download">
                    download
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import BaseButton from './BaseButton.vue';
    import BaseIcon from './BaseIcon.vue';

    export default {
        name: "BaseListFile",
        components: { BaseButton, BaseIcon },
        props: {
            data: {
                type: Object,
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
    .list-file {
        width: 100%;

        display: flex;
        flex-direction: column;

        background: #151517;
        border: .1rem solid #222026;
        border-radius: .8rem;

        overflow: hidden;

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            width: 100%;

            background: #18171A;
            border-bottom: .1rem solid #222026;

            padding: 1.2rem 1.6rem;
        }

        &__item {
            display: flex;
            align-items: center;
            justify-content: space-between;

            width: 100%;

            padding: 1.6rem;

            border: .1rem solid #222026;
        }

        &__data {
            display: flex;
            align-items: center;
            gap: .8rem;
        }

        &__icon {
            img {
                object-fit: cover;
                max-height: 3.4rem;
                height: 100%;
                max-width: 100%;
                display: block;
            }
            // object-fit: cover;
        }
    }
</style>