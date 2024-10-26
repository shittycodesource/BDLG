<template>
    <div class="files">
        <base-grid-header @toggle="value => isGrid = value" :isGrid="isGrid">ФАЙЛЫ</base-grid-header>

        <div class="files__grid" v-if="isGrid">
            <base-file v-for="(data, index) in array" :file="data" :key="index"></base-file>
        </div>
        <div class="files__list" v-else>
            <base-list-file v-for="(data, index) in array" :data="data" :key="index"></base-list-file>
        </div>
    </div>
</template>

<script>
    import BaseGridHeader from './BaseGridHeader.vue';
    import BaseFile from './BaseFile.vue';
    import BaseListFile from './BaseListFile.vue';

    export default {
        name: "BaseFilesGrid",
        components: {
            BaseGridHeader,
            BaseFile,
            BaseListFile
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
                if (this.isGrid == false) return this.placeholder;

                const arr = [];

                this.placeholder.forEach(item => {
                    
                    item.files.forEach(file => {
                        arr.push({
                            ...file,
                            createdAt: item.createdAt,
                            isAnonymous: item.isAnonymous,
                            userId: item.userId,
                            id: item.id
                        });
                    })

                });

                return arr;
            }
        }
    }
</script>

<style lang="scss">
    .files {
        &__grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.2rem;
        }
    }
</style>