<template>
    <div class="list-file">
        <header class="list-file__header">
            <div class="list-file__uploader">
                Гость
                <!-- <template v-if="data.isAnonymous">Anonymous </template>
                <template v-else>No accs yet </template> -->
                <span>загрузил {{ data.files.length }} файла</span>
            </div>
            <div class="list-file__date">
                {{ data.createdAt.toDate() | date(false, true) }}
            </div>
        </header>
        <main class="list-file__content">
            <div 
                v-for="(file, index) in data.files" 
                :key="index"
            
                class="list-file__item"    
            >
                <div class="list-file__data">
                    <div class="list-file__icon" v-if="img(file.name) != false">
                        <img :src="require(`@/assets/svg/${img(file.name)}`)">
                    </div>
                    <div class="file__sprite" v-else>
                        <!-- bro -->
                        <base-icon name="img" width="2rem" height="2rem"></base-icon>
                    </div>
                    <div class="list-file__name">{{ file.name }}</div>
                </div>
                <a :href="file.url" download target="_blank" class="list-file__download-link">
                    <button class="list-file__download" type="button">
                        <base-icon name="load" width="2rem" height="2rem"></base-icon>
                        СКАЧАТЬ
                    </button>
                </a>
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
            img(name) {
                // get image based on file extension
                const filename = name;
                const ext = filename.substring(filename.lastIndexOf('.')+1, filename.length)

                const list = {
                    'pptx': 'powerpoint.svg',
                    'ppt': 'powerpoint.svg',
                    'odp': 'powerpoint.svg',
                    'docx': 'word.svg',
                    'doc': 'word.svg',
                    'jpg': 'img.svg',
                    'png': 'img.svg',
                    'pdf': 'pdf.svg',
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

        &__download {
            &-link {
                text-decoration: none;
            }

            display: flex;
            align-items: center;
            gap: .4rem;

            padding: .4rem .8rem;
            border-radius: .6rem;

            background: #313131;
            border: 1px solid #3E3E3E;
            cursor: pointer;

            font-weight: 800;
            font-size: 1.6rem;
            font-family: inherit;

            color: #7E7E7E;
            fill: #7E7E7E;
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