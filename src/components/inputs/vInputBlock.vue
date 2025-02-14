<template>
    <div class="input-block" :class="{ 'input-block--focused': isFocused }">
        <div class="input-block__label">
            <slot name="label"></slot>
        </div>

        <div class="input-block__wrapper">
            <slot></slot>

            <div class="input-block__inside">
                <slot name="inside"></slot>
            </div>
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

        &__inside {
            // margin-right: -1rem;
            // margin-bottom: -.5rem;
            // margin-top: -.5rem;
            position: absolute;
            top: .4rem;
            bottom: .4rem;
            right: .4rem;
        }

        &__wrapper {
            display: flex;
            align-items: center;

            // padding: 1.2rem 1.6rem;
            padding: 1.2rem 1.4rem;

            border-radius: 5rem;
            background: #131215;
            border: .1rem solid #222026;

            position: relative;
            
            &:after {
                content: "";
    
                width: calc(100% + 1rem);
                height: calc(100% + 1rem);
    
                border-radius: 5rem;
                border: .2rem solid #E6406B;
    
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