<template>
    <div class="files">
        <base-grid-header @toggle="value => isGrid = value" :isGrid="isGrid">ФАЙЛЫ</base-grid-header>

        <div class="files__grid" v-if="isGrid">
            <template v-for="(data, index) in array">
                <base-link 
                    v-if="data.isLink" 
                    :data="data" 
                    :key="index"
                ></base-link>
                <base-file
                    v-else
                    :file="data" 
                    :key="index" 
                    :isDownloadble="true"
                ></base-file>
            </template>
        </div>
        <div class="files__list" v-else>
            <template v-for="(data, index) in array">
                <template 
                    v-if="index == 0 || 
                        new Date(data.createdAt.toDate()).getDay() != new Date(array[index - 1].createdAt.toDate()).getDay() || 
                        new Date(data.createdAt.toDate()).getMonth() != new Date(array[index - 1].createdAt.toDate()).getMonth()
                    ">
                    <v-separator :style="`transition-delay: ${(index + .5) / 6}s`" :time="data.createdAt.toDate()" :key="data.id"></v-separator>
                </template>

                <base-list-link v-if="data.isLink" :data="data" :key="index"></base-list-link>
                <base-list-file v-else-if="data.files.length" :data="data" :key="index"></base-list-file>
            </template>
        </div>
    </div>
</template>

<script>
    import BaseGridHeader from './BaseGridHeader.vue';
    import BaseFile from './BaseFile.vue';
    import BaseLink from './BaseLink.vue';
    import BaseListFile from './BaseListFile.vue';
    import BaseListLink from './BaseListLink.vue';
    import vSeparator from '../vSeparator.vue';

    export default {
        name: "BaseFilesGrid",
        components: {
            BaseGridHeader,
            BaseFile,
            BaseLink,
            BaseListFile,
            BaseListLink,
            vSeparator
        },
        props: {
            files: {
                type: Array
            }
        },
        data() {
            return {
                isGrid: true,
                placeholder: [
                    {
                        createdAt: "timestamp",
                        files: [
                            { 
                                name: "Presentation.pptx", 
                                ref: "/Presentation.pptx",
                                size: 111,
                                url: "https://firebasestorage.........",
                                extension: "pptx",
                            },
                            {
                                name: "Important file",
                                ref: "/Important file.docx",
                                size: 12332,
                                url: "https://firebasestorage.........",
                                extension: "docx",
                            }
                        ],
                        isAnonymous: true,
                        userId: 0,
                        id: "id1"
                    }
                ]
            }
        },
        computed: {
            array() {
                // if (this.isGrid == false) return this.placeholder;
                if (this.isGrid == false) return this.files;

                const arr = [];

                // this.placeholder.forEach(item => {
                this.files.forEach(item => {

                    if (item.isLink) {
                        arr.push(item);
                    } else {
                        item.files.forEach(file => {
                            arr.push({
                                ...file,
                                createdAt: item.createdAt,
                                isAnonymous: item.isAnonymous,
                                userId: item.userId,
                                id: item.id
                            });
                        })
                    }
                });

                return arr;
            }
        }
    }
</script>

<style lang="scss">
    .files {
        width: 100%;
        
        &__grid {
            // display: grid;
            // grid-template-columns: repeat(4, calc(25% - 1rem));
            gap: 1.2rem;

            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(calc(25% - 1rem), 1fr));
            grid-template-rows: masonry;
        
            width: 100%;
        }

        &__list {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1.2rem;

            width: 100%;
        }
    }
</style>