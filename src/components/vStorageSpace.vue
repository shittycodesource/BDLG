<template>
    <div class="storage-space">
        <header class="storage-space__header">
            <div class="storage-space__used" :class="{ 'show': getStorageSize != 0 }">
                {{ getSize }}
            </div>
            <div class="storage-space__text"  :class="{ 'show': getStorageSize != 0 }">
                {{ 'Space_UsedFrom' | localize }}
                5
                {{ 'Space_GB' | localize }}
            </div>
        </header>
        <div class="storage-space__bar" :class="{ 'show': getStorageSize != 0 }">
            <div class="storage-space__filled" :style="{ 'width': getWidth }"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import formatBytes from '../utils/formatBytes.js';

    export default {
        name: "vStorageSpace",
        data() {
            return {
                isMounted: false
            }
        },
        computed: {
            ...mapGetters(['getStorageSize']),
            getWidth() {
                return `${this.getStorageSize / 5368709120 * 100}%`;
            },
            getSize() {
                return formatBytes(this.getStorageSize, 0);
            }
        },
        mounted() {
            this.isMounted = true;
        }
    }
</script>

<style lang="scss">
    .storage-space {
        display: flex;
        flex-direction: column;  
        gap: 1.6rem;

        max-width: 49rem;
        margin: 3.2rem auto 2rem;

        &__header {
            display: flex;
            align-items: flex-end;
            gap: .5rem;
        }

        &__used {
            font-size: 2.5rem;
            font-weight: 800;


            line-height: .5;

            opacity: 0;
            transform: translateY(.5rem);

            transition: all .5s;

            &.show {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        &__text {
            font-size: 2rem;
            color: #767676;
            
            line-height: .5;

            opacity: 0;
            transform: translateY(-.5rem);

            transition: all .65s;

            &.show {
                transform: translateY(0);
                opacity: 1;
            }
        }

        &__bar {
            border-radius: .6rem;
            background: #ECECEC;

            width: 0%;
            height: .8rem;

            position: relative;
            overflow: hidden;
            
            transition: all .45s ease;

            opacity: 0;

            &.show {
                opacity: 1;
                width: 100%;
            }
        }

        &__filled {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;

            height: 100%;

            background: #5B93FF;

            transition: width .25s ease;
        }
    }
</style>