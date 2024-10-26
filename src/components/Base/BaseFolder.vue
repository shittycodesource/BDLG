<template>
    <router-link 
        class="folder" 
        to="/"
        :style="`
            --primary-color: ${data.colors.primary};
            --secondary-color: ${data.colors.secondary};
            --bottom-color: ${data.colors.bottom};
        `"
    >

        <div class="folder__header">
            <div class="folder__gradient"></div>
            <div class="folder__decor"></div>
            <div class="folder__line"></div>
        </div>

        <div class="folder__content">
            <div class="folder__title">{{ data.name }}</div>
            <router-link class="folder__open" to="/">Открыть ></router-link>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "BaseFolder",
        props: {
            data: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style lang="scss">

    .folder {
        --height: 18rem;
        --header-height: 4.8rem;
        --bg: #151517;

        display: flex;
        flex-direction: column;

        height: var(--height);
        width: 100%;

        border-radius: .8rem;
        background: linear-gradient(180deg, var(--bg) 35%, var(--bottom-color));
        // background: var(--bg);

        overflow: hidden;
        position: relative;
        text-decoration: none;
    
        &__header {
            height: var(--header-height);

            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));

            position: relative;
            overflow: hidden;

            flex-grow: 0;

            transition: height .1s linear;
        }

        &__decor {
            position: absolute; bottom: 0; right: 0;
            height: 2.8rem;
            width: 38%;

            background: var(--bg);
            border-top-left-radius: .8rem;

            border-top: .1rem solid #222026;
            border-left: .1rem solid #222026;

            transition: box-shadow .2s ease;

            z-index: 2;
        }

        &__line {
            position: absolute; bottom: -.9rem; left: 0;
            height: 1rem;
            width: 62%;
            background: #222026;

            transition: box-shadow .2s ease;
        }

        &__content {
            flex-grow: 1;

            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 1.6rem 1.2rem;
        }

        &__title {
            font-size: 2.4rem;
            font-weight: 600;
            line-height: 1;
        
            color: var(--text-main);
        }

        &__open {
            font-size: 1.6rem;
            color: var(--text-secondary);
            text-decoration: none;
        }

        transition: transform .2s ease;

        &::after {
            content: '';

            position: absolute; top: 0; left: 0; bottom: 0;right: 0;

            width: 100%;
            height: 100%;

            pointer-events: none;

            z-index: 10;

            border-radius: .8rem;
            border: .1rem solid transparent; 
            background: linear-gradient(180deg, var(--primary-color), transparent) border-box;
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude; /*5*/
        }

        &:hover {
            --header-height: 6.5rem;

            // .folder__decor {
            //     transition: height .3s ease;

            //     height: 2.2rem;
            // }

            .folder__decor,
            .folder__line {
                box-shadow: 0 0 1.5rem .3rem rgba(0, 0, 0, .6);
            }

            .folder__decor {
                height: 2.4rem;
            }

            transform: translateY(-.2rem);
        }
    }
</style>