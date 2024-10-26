<template>
    <div class="files-wrapper" :class="{ 'files-wrapper--new': data.isNew == true }">
        <!-- <div class="files-wrapper__warning" v-if="data.isAnonymous && header">
            NOT VERIFIED USER
        </div> -->

        <div class="files-wrapper__new" v-if="data.isNew == true">
            NEW
        </div>

        <header class="files-wrapper__header" v-if="header">

            <div class="files-wrapper__left">
                <div class="files-wrapper__name">
                    <template v-if="data.isAnonymous">
                        {{ 'Files_Anonymous' | localize }}
                    </template>
                    <template v-else>
                        {{ data.userData.name }}
                    </template>
                </div>
                <div class="files-wrapper__text">
                    {{ 'Files_Uploaded' | localize }} 
                    {{ data.files.length }} 
                    {{ data.files.length == 1 ? 'Files_File' : 'Files_Files' | localize }}</div>
            </div>        

        <!-- файлов: 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 25 26 27 28 29 30  -->
        <!-- файла: 22 23 24  -->
        <!-- файл: 0 21 31 -->

            <div class="files-wrapper__right">
                {{ data.createdAt.toDate() | date(false, true) }}
            </div>
        </header>
        <div class="files-wrapper__list">
            <v-file 
                v-for="(file, index) in data.files"
                :file="file"
                :isRemoveable="isRemoveable"
                :key="index"

                @remove="$emit('remove', file)"
            ></v-file>
        </div>
    </div>
</template>

<script>
    import vFile from './Base/BaseFile.vue';

    export default {
        name: "vFilesWrapper",
        components: { vFile },
        props: {
            header: {
                type: Boolean,
                default: true,
            },
            isRemoveable: {
                type: Boolean,
                default: false,
            },
            data: {
                type: Object,
                default() {
                    return {
                        isAnonymous: true, 
                        userId: 0,
                        createdAt: 0,
                        files: [ { name: "Name1", url: 'fileurl...' } ]
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .files-wrapper {
        max-width: 78rem;
        width: 100%;
        margin: 3rem auto;
        
        display: flex;
        flex-direction: column;

        border-radius: .4rem;
        border: .1rem solid #E7E7E7;


        position: relative;
        z-index: 2;
        
        &--new {
            z-index: 1001;

            &::before {
                content: "";

                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);

                border: .2rem dotted white;
                border-radius: 1.5rem;

                width: calc(100% + 2rem);
                height: calc(100% + 2rem);

                pointer-events: none;

                z-index: 1;
            }
        }

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            width: 100%;

            padding: 1.5rem;

            background: #F7F9FB;
            border-bottom: .1rem solid #E7E7E7;
        }

        &__left {
            display: flex;
            align-items: center;
            gap: .5rem;
        }

        &__name {
            font-size: 1.6rem;
            font-weight: 700;
        }

        &__text {
            color: #555555;
        }

        &__warning {
            font-size: 1.6rem;
            font-weight: 700;
            color: #AA0048;
            
            border: 1px solid #CA3774;
            background: #EC4E87;
            border-radius: .2rem;
            
            padding: .4rem 1.2rem;

            position: absolute;
            top: -2rem;
            left: -1rem;
        }

        &__new {
            font-size: 1.8rem;
            font-weight: 700;
            color: #379710;

            border: 1px solid #44df72;
            background: #7dff77;
            border-radius: 0.3rem;
            
            padding: .4rem 1.2rem;

            position: absolute;
            top: -2rem;
            right: -1rem;

            z-index: 2;
        }

        &__list {
            width: 100%;
        }
    }
</style>