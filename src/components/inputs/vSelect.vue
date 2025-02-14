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

                <button class="select-options__item select-options__item--add-more" v-if="addMore" @click="$emit('more')">
                    <span>Создать новую...</span>
                    <span>+</span>
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
                default: () => { return this.options[0] } 
            },
            options: {
                type: Array,
                default: () => [{ name: "First" }, { name: "Second" }]
            },
            addMore: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            close(event) {
                if (this.$refs.select.$el.contains(event.target)) {
                    return;
                }

                this.isOpen = false;
            }
        },
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
            font-weight: 700;
            color: #fff;

            user-select: none;

            &:focus {
                outline: none;
            }

            svg {
                fill: #fff;
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
            background: #131215;
            border: .1rem solid #222026;
            // background: #F7F9FB;
            // border: .1rem solid #E7E7E7;
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
                border-bottom: .1rem solid #222026;

                font-family: inherit;
                font-size: 1.6rem;
                color: #f1f1f1;
                text-align: left;
                font-weight: 600;

                &--add-more {
                    color: rgba(255, 255, 255, .7);
                    font-weight: 700;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    span:nth-child(2) {
                        font-size: 3rem;
                        font-weight: 400;
                    }
                }

                &:hover {
                    background: #222026;
                }

                &:focus {
                    outline: none;
                    background: #222026;
                }

                &:last-child {
                    border: none;
                }
            }
        }

    }
</style>