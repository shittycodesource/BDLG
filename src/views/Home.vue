<template>
    <div class="home">
        <div class="container">
            <div class="home__inner">

            <base-drop-place></base-drop-place>

            <!-- <base-folders-grid :folders="folders"></base-folders-grid> -->
            
            <base-files-grid  :files="getFiles" ></base-files-grid>
        </div>

            <!-- <v-storage-space></v-storage-space> -->

<!--             
            <transition-group tag="div" name="list" class="list" v-if="getFiles.length" appear>
                <template v-for="(data, index) in getFiles">
                    <template 
                        v-if="index == 0 || 
                            new Date(data.createdAt.toDate()).getDay() != new Date(getFiles[index - 1].createdAt.toDate()).getDay() || 
                            new Date(data.createdAt.toDate()).getMonth() != new Date(getFiles[index - 1].createdAt.toDate()).getMonth()
                        ">
                        <v-separator :style="`transition-delay: ${(index + .5) / 6}s`" :time="data.createdAt.toDate()" :key="data.id"></v-separator>
                    </template>

                    <v-files-wrapper 
                        :style="`transition-delay: ${index / 6}s`"
                        :data="data"
                        :key="index"
                    ></v-files-wrapper>
                </template>
            </transition-group>


            <div class="home__new" v-if="getFileOverlayState">
                <button type="button" class="home__close" @click="closeOverlay">
                    <base-icon name="remove" width="45px" height="45px"></base-icon>
                </button>
            </div> -->
        </div>
    </div>
</template>

<script>
import vStorageSpace from '../components/vStorageSpace.vue';
import vFilesWrapper from '../components/vFilesWrapper.vue';


import BaseIcon from '../components/Base/BaseIcon.vue';
import BaseDropPlace from '../components/Base/BaseDropPlace.vue';
import BaseFoldersGrid from '../components/Base/BaseFoldersGrid.vue';
import BaseFilesGrid from '../components/Base/BaseFilesGrid.vue';
import vSeparator from '../components/vSeparator.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: { vStorageSpace, vFilesWrapper, BaseFilesGrid, BaseFoldersGrid, BaseDropPlace, BaseIcon, vSeparator },
    data() {
        return {
            files: [],
            isLoaded: false,

            folders: [
                { name: "Русский", colors: { primary: "#FF6B02", secondary: "#E6406B", bottom: "#1B0B02" } },
                { name: "Математика", colors: { primary: "#32F1FF", secondary: "#0B6DFF", bottom: "#0A2D36" } },
                { name: "Английский Язык", colors: { primary: "#7C02FF", secondary: "#B273FF", bottom: "#300F56" } } ,
                { name: "Информатика", colors: { primary: "#4852C1", secondary: "#FF4E7C", bottom: "#1B1629" } }, 
                { name: "Физика", colors: { primary: "#BB2035", secondary: "#FF0630", bottom: "#390E13" } }, 
                { name: "Обществознание", colors: { primary: "#9CFFAB", secondary: "#18D181", bottom: "#08280F" } }, 
                { name: "История", colors: { primary: "#F4DB4E", secondary: "#FF842D", bottom: "#3C3719" } }, 
                { name: "Литература", colors: { primary: "#FF4FDF", secondary: "#FF6CCE", bottom: "#4E1A44" } }, 
                { name: "Всякое", colors: { primary: "#fff", secondary: "#fff", bottom: "#353535" } }, 
            ]
        }
    },
    methods: {
        ...mapActions(['fetchFiles', 'hideFileOverlay']),
        closeOverlay() {
            this.hideFileOverlay();
        }
    },
    computed: {
        ...mapGetters(['getFiles', 'getFileOverlayState']),
        isNewInList() {
            let bool = false;

            this.getFiles.forEach(item => item.isNew == true ? bool = true : '');

            return bool;
        }
    },
    // async created() {
    //     try {
    //         this.isLoaded = false;
    //         const files = await this.fetchFiles();

    //         this.files = files;

    //         this.isLoaded = true;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
</script>

<style lang="scss">
    .home {
        &__inner {
            padding-top: calc(var(--drop-place-height) + 1.6rem);
        }

        &__new {
            &::before {
                content: "";

                width: 100%;
                height: 100%;
                
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                background: rgba(0, 0, 0, .5);
                z-index: 999;
            }
        }

        &__close {
            position: fixed;

            top: 2.5rem;
            right: 2.5rem;

            width: 7rem;
            height: 7rem;

            border-radius: 500rem;
            background: #5B93FF;
            border: 1px solid #88B0FF;
            cursor: pointer;

            svg {
                fill: #fff;
            }

            z-index: 1000;
        }
    }

    .list { 
        &-enter {
            opacity: 0;
            transform: translateY(15px);
        }

        &-enter-to {
            opacity: 1;
            transform: translateX(0px);
        }

        &-enter-active {
            transition: all 0.5s ease;
        }

        &-leave {
            opacity: 1;
            transform: translateX(0px);
        }

        &-leave-to {
            opacity: 0;
        }

        &-leave-active {
            transition-delay: 0s !important;
        }
    }

// .file__name {
//     font-weight: 700;
//     font-size: 45px;
//     margin-bottom: 25px;
// }

// .file__button {
//     padding: 15px 25px;

//     font-family: inherit;

//     border: none;

//     background: black;
//     color: #fff;
//     font-size: 25px;
//     font-weight: 700;
//     border-radius: 15px;
//     cursor: pointer;

//     &:hover {
//         background: #1f1f1f;
//     }
// }


// span {
//     font-size: 25px;
//     opacity: .6;
//     font-weight: 700;
// }

// ul li {
//     margin-bottom: 15px;
// }
</style>
