<template>
    <v-input-block ref="input" :isFocused="isFocused">
        <template #label>{{ label | localize(false) }}</template>

        <input 
            class="input"
            type="text"

            :placeholder="placeholder"
            :value="value" 
            
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="onInput"
        />

        <template #outside>

        </template>
    </v-input-block>
</template>

<script>
    import vInputBlock from './vInputBlock.vue';
    import vIcon from '../Base/BaseIcon.vue';

    export default {
        name: "vTextInput",
        data() {
            return {
                isFocused: false,
            }
        },
        components: {
            vInputBlock,
            vIcon
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: '',
            }
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value);
            }
        }
    }
</script>

<style lang="scss">
    .input {
        width: 100%;

        background: none;
        border: none;
        cursor: pointer;

        font-family: inherit;
        font-size: inherit;
        color: inherit;

        &:focus {
            outline: none;
        }
    }
</style>