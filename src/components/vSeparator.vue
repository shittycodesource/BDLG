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

        max-width: 56rem; 
        margin: 2rem auto;
        
        position: relative;
        overflow: hidden;

        span {
            background: #fff;
            position: relative; 

            padding: .5rem 1.2rem;
            font-weight: 500;
            color: #676767;

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

            max-width: 56rem;
            background: #C1C1C1;

            z-index: 1;
        }
    }
</style>