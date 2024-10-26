<template>
    <v-input-block ref="select" @click.native="isOpen = !isOpen" :isFocused="isFocused || isOpen">
        <template #label>{{ label | localize }}</template>

        <button class="select-trigger" :class="{ 'open': isOpen }" type="button" @click.stop="isOpen = !isOpen" @focus="isFocused = true" @blur="isFocused = false">
            <span>
                <template v-if="!activeOption.name">{{ options[0].name }}</template>
                <template v-else>{{ activeOption.name }}</template>
            </span>
            <v-icon name="down" width="2rem" height="2rem"/>
        </button>

        <template #outside>
            <div class="select-options" v-if="isOpen" v-click-outside="close">
                <button 
                    class="select-options__item"
                    type="button"
                    
                    v-for="(item, index) in options"
                    :key="index"
                    @click="$emit('select', item)"
                >
                    {{ item.name }}
                </button>
            </div>
        </template>
    </v-input-block>
</template>

<script>
    import vInputBlock from './vInputBlock.vue';
    import vIcon from '../Base/BaseIcon.vue';

    export default {
        name: "vSelect",
        data() {
            return {
                isOpen: false,
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
            activeOption: {
                type: Object,
                default: () => { return {} } 
            },
            options: {
                type: Array,
                default: () => [{ name: "First" }, { name: "Second" }]
            }
        },
        methods: {
            close(event) {
                if (this.$refs.select.$el.contains(event.target)) {
                    return;
                }

                this.isOpen = false;
            }
        }
    }
</script>

<style lang="scss">
    .select {

        &-trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0;

            width: 100%;

            cursor: pointer;
            border: none;
            background: none;

            font-family: inherit;
            font-size: 1.6rem;
            font-weight: 500;
            color: #000000;

            user-select: none;

            &:focus {
                outline: none;
            }

            svg {
                fill: #000000;
                transition: transform .2s ease;
            }

            &.open {
                svg {
                    transform: rotate(180deg);
                }
            }
        }

        &-options {
            border-radius: .8rem;
            background: #F7F9FB;
            border: .1rem solid #E7E7E7;
            box-shadow: 0rem 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.05);
            cursor: pointer;

            user-select: none;

            display: flex;
            flex-direction: column;

            position: absolute;
            top: calc(100% + 1rem);

            left: 0;
            right: 0;

            width: 100%;

            overflow: hidden;

            &__item {
                padding: 1.2rem 1.5rem;
                
                border: none;
                background: none;
                cursor: pointer;
                border-bottom: .1rem solid #E7E7E7;

                font-family: inherit;
                font-size: 1.6rem;
                color: #000;
                text-align: left;

                &:hover {
                    background: #E7E7E7;
                }

                &:focus {
                    outline: none;
                    background: #BED4FF;
                }

                &:last-child {
                    border: none;
                }
            }
        }

    }
</style>