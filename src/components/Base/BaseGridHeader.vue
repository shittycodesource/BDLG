<template>
    <header class="grid-header">
        <div class="grid-header__title"><slot></slot></div>
        <div class="grid-header__actions">
            <button type="button" class="grid-header__button" :class="{ 'active': isGrid }" @click="$emit('toggle', true)">
                <base-icon name="grid" width="25px" height="25px"></base-icon>
            </button>
            <button type="button" class="grid-header__button" :class="{ 'active': !isGrid }" @click="$emit('toggle', false)">
                <base-icon name="list" width="25px" height="25px"></base-icon>
            </button>
        </div>
    </header>
</template>

<script>
    import BaseIcon from './BaseIcon.vue';

    export default {
        name: "BaseGridHeader",
        components: {
            BaseIcon
        },
        props: {
            isGrid: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss">
    .grid-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        margin-bottom: 1.2rem;

        &__title {
            font-weight: 800;
            font-size: 2.4rem;
            color: var(--main-text);

            text-transform: uppercase;
        }
        
        &__actions {
            display: flex;
            align-items: center;
            gap: .8rem;
        }

        &__button {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;

            svg {
                fill: #3F3F3F;
            }

            &.active {
                svg { 
                    fill: #E6406B;
                }
            }
        }
    }
</style>