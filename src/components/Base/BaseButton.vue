<template>
    <button class="btn" :class="[{ 'btn--colored': isColored }, { 'btn--red': isRed }, { 'btn--small': isSmall }]" type="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "BaseButton",
        props: {
            isRed: { type: Boolean, default: false },
            isSmall: { type: Boolean, default: false },
            isColored: { type: Boolean, default: false },
        }
    }
</script>

<style lang="scss">
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;

        padding: 1rem 2.4rem;

        background: var(--button-bg);
        border: 1px solid var(--button-border);
        border-radius: 50rem;   
        cursor: pointer;

        text-align: center;

        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--button-border-text);
        text-transform: uppercase;
        text-decoration: none;

        svg {
            fill: #fff;
        }

        &--colored {
            background: var(--button-bg-colored);
            border-color: var(--button-border-colored);
            
            color: var(--button-text-hover);

            svg {
                fill: var(--button-text-hover);
            }
        }

        &--red {
            border-color: #CA3774;
            background: #EC4E87;
            color: #AA0048;
        }

        &--small {
            font-size: 1.2rem;
        }
    }
</style>