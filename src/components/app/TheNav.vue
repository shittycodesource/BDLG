<template>
    <nav class="nav">
        <router-link  
            v-for="(link, index) in links"
            :key="index"
            :to="link.path" 
            :exact="link.exact"

            class="nav__link"
            active-class="active"
        >
            <base-icon :name="link.icon.name" :width="link.icon.width" :height="link.icon.height"></base-icon>
            <span>{{ link.name | localize }}</span>
        </router-link>
    </nav>
</template>

<script>
    import BaseIcon from '../Base/BaseIcon';

    export default {
        name: "TheNav",
        components: {
            BaseIcon,
        },
        props: {
            links: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="scss">
    .nav {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;

        width: 100%;

        &__link {
            display: flex;
            align-items: center;
            gap: 1.2rem;

            width: 100%;

            padding: 1rem 2rem;

            font-weight: 600;
            font-size: 1.6rem;
            color: var(--button-text);
            text-decoration: none;
            text-transform: uppercase;

            border: .1rem solid var(--button-border);
            border-radius: 50rem;
            background: var(--button-bg);

            transition: background .2s ease, color .2s ease, fill .2s ease, border-color .2s ease;
            
            svg {
                fill: var(--button-text);
                transition: fill .2s ease;

                width: 2.3rem;
            }

            &:hover {
                border-color: var(--button-border-hover);
                background: var(--button-bg-hover);
                color: var(--button-text-hover);

                svg {
                    fill: var(--button-text-hover);
                }
            }

            &.active {
                border-color: var(--button-border-colored);
                background: var(--button-bg-colored);
                color: var(--button-text-colored);

                svg {
                    fill: var(--button-text-colored);
                }
            }
        }
    }
</style>  