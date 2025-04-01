<template>
    <div id="app">
        <the-sprites></the-sprites>
        <the-sidebar v-if="!isMobile"></the-sidebar>
        <the-mobile-nav v-else></the-mobile-nav>

        <main class="main">
            <router-view></router-view>
        </main>

        <div id="preloadedImage"></div>
    </div>
</template>

<script>
import TheSprites from './components/app/TheSprites.vue';
import TheSidebar from './components/app/TheSidebar.vue';
import TheMobileNav from './components/app/TheMobileNav.vue';

import formatBytes from './utils/formatBytes';
import { mapActions } from 'vuex';

export default {
    name: "App",
    components: { TheSprites, TheSidebar, TheMobileNav },
    data() {
        return {
            isMobile: false
        }
    },
    methods: {
        ...mapActions(['loadSettings', 'fetchStorageSize', 'fetchFiles', 'fetchServerTime']),
        async onCreate() {
            try {
                this.loadSettings();
                this.fetchFiles();
                this.fetchServerTime();

                const size = await this.fetchStorageSize();

                console.log('App.vue: fetched size', size);
                console.log('App.vue: fetched size', formatBytes(size));
            } catch(error) {
                throw error;
            }
        },
        onResize () {
          this.isMobile = window.innerWidth <= 930
        }
    },
    created() {
        this.onCreate();        
    },
    mounted () {
        this.onResize()
        window.addEventListener('resize', this.onResize, { passive: true })
    }
}
</script>

<style lang="scss">
    html {
        font-size: 62.5%;

        // Vars
        --background: #0C0C0C;

        --sidebar: #131215;
        --sidebar-border: #222026;

        --gradient: linear-gradient(0deg, #B81A73, #FA4F66);

        --text-main: #ffffff;
        --text-secondary: #DBDBDB;

        // Button
        --button-bg: transparent; 
        --button-border: transparent;
        --button-text: #9A9A9A;

        --button-bg-hover: rgba(255, 255, 255, .04); 
        --button-border-hover: rgba(255, 255, 255, .05);
        --button-text-hover: #fff;

        --button-bg-colored: rgba(230, 64, 107, .15);
        --button-border-colored: rgba(230, 64, 107, .2);
        --button-text-colored: #E6406B;

        // Drop Place
        --drop-place-height: 23.4rem;
        --drop-place-background: #131215;
        --drop-place-background-active: #222026;
    }

    body {
        margin: 0;
        padding: 0;

        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.6rem;

        color: var(--text-main);
        background: var(--background);
    }

    #app {
        height: 100vh;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .main {
        padding-left: 23rem;

        @media screen and (max-width: 930px) {
            padding-left: 0rem;
        }
    }

    .container {
        max-width: 108rem;
        margin: 0 auto;
        padding: 0 1.5rem;
        position: relative;
    }

    @keyframes baseOverlayAnimaton {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .baseOverlayTransition {
        &-leave-active {
            animation: baseOverlayAnimaton .3s ease-in-out reverse;
        }

        
        &-enter-active {
            animation: baseOverlayAnimaton .3s ease-in-out;
        }
    }

    #preloadedImage {
        width: 0;
        height: 0;
        display: inline;
        // background: url('@/assets/homichok.jpg'); 
    }

    .line {
        background: #272727;
        height: .1rem;
        width: 8rem;
        margin: 2rem auto;
    }
</style>
