<template>
    <input
        ref="fileInput"
        class="file-reader"
        type="file"
        @change="onChange"
        multiple
    >
</template>

<script>
    export default {
        name: "BaseFileReader",
        props: {
            filesArray: {
                type: [Array, FileList],
                default: () => []
            },
        },
        methods: {
            onChange(event) {
                let files = event.target.files || event.dataTransfer.files;

                
                files = [...files, ...this.filesArray];
                
                console.log(files)
                this.$emit('emitFiles', files);
            }
        }
    }
</script>

<style lang="scss">
    .file-reader {
        opacity: 0;
        z-index: -100;
    }
</style>