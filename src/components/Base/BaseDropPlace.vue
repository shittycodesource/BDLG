<template>
    <div 
        class="drop-place"
        :class="{ 'drop-place--drag-active': isDragActive }"
        
        @click="openReader"

        @drop.prevent="drop" 
        @dragstart.prevent
        @dragenter.prevent="isDragActive = true"
        @dragover.prevent
        @dragleave.prevent.self="isDragActive = false"
        @dragend.prevent
    >
        
        <div class="drop-place__hero">
            <div class="drop-place__title">ПЕРЕНЕСИТЕ СЮДА ФАЙЛЫ</div>
            <span class="drop-place__or">или</span>
            <base-button :isColored="true">ВЫБЕРИТЕ В ПРОВОДНИКЕ</base-button>
            <!-- <base-icon name="load" width="5.5rem" height="5.3rem"></base-icon> -->
        </div>

        <base-file-reader ref="input" @emitFiles="setFiles" :filesArray="files"></base-file-reader>
    </div>
</template>

<script>
    import BaseIcon from './BaseIcon.vue';
    import BaseButton from './BaseButton.vue';
    import BaseFileReader from './BaseFileReader.vue';

    export default {
        name: "BaseDropPlace",
        components: { BaseIcon, BaseFileReader, BaseButton },
        data() {
            return {
                isDragActive: false,
            }
        },
        props: {
            files: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            dragEnter() { this.isDragActive = true },
            dragLeave() { this.isDragActive = false },
            drop(event) {
                this.$refs.input.onChange(event);
                this.isDragActive = false;
            },

            openReader() {
                this.$refs.input.$el.click();
            },

            setFiles(value) {
                this.$emit('setFiles', value);
            },
        }
    }
</script>

<style lang="scss">
    .drop-place {
        --offset: 5rem;

        // width: 50rem;
        width: 100%;
        height: calc(var(--drop-place-height) + var(--offset));
        padding-top: var(--offset);
        
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        background: var(--drop-place-background);
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' rx='50' ry='50' fill='none' stroke='%23222026FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-bottom-left-radius: 5rem;
        border-bottom-right-radius: 5rem;
        fill: red;
        cursor: pointer;

        position: absolute;

        top: calc(var(--offset) * -1);
        left: 0;
        right: 0;

        transition: background .2s ease;

        &__hero {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1.6rem;

            text-align: cneter
        }

        &__title {
            font-weight: 800;
            font-size: 3rem;
            line-height: .8;
        }

        &__or {
            font-size: 1.6rem;
            color: #A3A3A3;
            font-weight: 400;
            line-height: .7;
        }

        &::before {
            content: "";

            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;

            width: 100%;
            height: 100%;

            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='50' ry='50' stroke='%23E6406BFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
            border-radius: 50px;
            // background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%235B93FFFF' stroke-width='4' stroke-dasharray='10%2c18' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
            // border-radius: 25px;

            opacity: 0;

            transition: opacity .2s ease;
        }

        &:hover {
            // background: #e5e5e5;
            background: var(--drop-place-background-active);
        }

        svg {
            fill: #BBBBBB;
            transition: fill .2s ease;
        }

        &--drag-active {
            &::before {
                opacity: 1;
            }

            svg {
                fill: #5B93FF;
            }

            // background: #e5e5e5;
            background: var(--drop-place-background-active);
        }
    }
</style>