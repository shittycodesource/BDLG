<template>
    <div class="input-block" :class="{ 'input-block--focused': isFocused }">
        <div class="input-block__label">
            <slot name="label"></slot>
        </div>

        <div class="input-block__wrapper">
            <slot></slot>
        </div>

        <slot name="outside"></slot>
    </div>
</template>

<script>
    export default {
        name: "vInputBlock",
        props: {
            isFocused: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .input-block {
        display: flex;
        flex-direction: column;
        gap: .8rem;

        position: relative;

        &__label {
            font-size: 1.6rem;
            font-weight: 600;
            color: #484848;
        }

        &__wrapper {
            padding: 1.2rem 1.6rem;

            border-radius: .8rem;
            background: #F7F9FB;
            border: .1rem solid #E7E7E7;

            position: relative;
            
            &:after {
                content: "";
    
                width: calc(100% + 1rem);
                height: calc(100% + 1rem);
    
                border-radius: 1rem;
                border: .2rem solid #5B93FF;
    
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
    
                opacity: 0;

                transition: .35s all;

                pointer-events: none;
            }
        }


        &--focused {
            .input-block__wrapper {
                &:after {
                    opacity: 1;
                }
            }
        }
    }
</style>