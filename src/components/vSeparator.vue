<template>
    <div class="separator">
        <span>{{ time | date(false, true) }}</span>
    </div>
</template>

<script>

    export default {
        name: "vSeparator", 
        props: {
            time: {
                type: Date
            }
        }
    }
</script>

<style lang="scss">
    .separator {
        display: flex;
        align-items: center;
        justify-content: center;

        // max-width: 56rem; 
        margin: 2rem auto;
        width: 100%;
        
        position: relative;
        overflow: hidden;

        span {
            background: var(--background);
            position: relative; 

            padding: .5rem 1.2rem;
            font-weight: 900;
            color: #fff;

            text-transform: uppercase;

            z-index: 2;
        }

        &::after {
            content: "";

            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            left: 0;
            right: 0;

            height: .1rem;
            width: 100%;

            // max-width: 56rem;
            background: #373737;

            z-index: 1;
        }
    }
</style>