<template>
    <aside class="sidebar">
        <header class="sidebar__header">
            <img class="sidebar__logo-backdrop" :src="require('@/assets/backdrop.svg')">
            <img :src="require('@/assets/logo.svg')">
            <div class="sidebar__title">
                ФАЙЛЫ
            </div>
        </header>
        <main class="sidebar__main">
            <the-nav :links="upperLinks"></the-nav>
        </main>
        <footer class="sidebar__footer">
            <!-- <the-nav :links="lowerLinks"></the-nav> -->
        </footer>
    </aside>
</template>

<script>
    import TheNav from './TheNav.vue';

    export default {
        name: "TheSidebar",
        components: {
            TheNav,
        },
        data() {
            return {
                upperLinks: [
                    { name: "Nav_Files", path: "/", exact: true, icon: { name: "folder", width: "2.1rem", height: "1.9rem" } },
                    { name: "Nav_Upload", path: "/upload", exact: false, icon: { name: "upload", width: "2.3rem", height: "1.9rem" } },
                    { name: "Nav_PinLink", path: "/link", exact: false, icon: { name: "link", width: "2.3rem", height: "1.9rem" } },
                    // { name: "Nav_MyFiles", path: "/my", exact: false, icon: { name: "archive", width: "2.2rem", height: "1.9rem" } },
                    // { name: "Nav_Schedule", path: "/schedule", exact: false, icon: { name: "bell", width: "2.4rem", height: "2rem" } },
                    // { name: "Nav_Settings", path: "/settings", exact: false, icon: { name: "settings", width: "2.4rem", height: "2rem" } },
                    // { name: "Nav_Login", path: "/login", exact: false, icon: { name: "login", width: "2rem", height: "2rem" } },
                ],
                lowerLinks: [
                    // { name: "Nav_Schedule", path: "/schedule", exact: false, icon: { name: "schedule", width: "2.4rem", height: "2rem" } },
                ], 
            }
        }
    }
</script>

<style lang="scss">
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 23rem;
        height: 100%;

        position: fixed;
        top: 0;
        left: 0;
        bottom: 0; 

        background: var(--sidebar);
        border: 1px solid var(--sidebar-border);
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
         
        &__logo-backdrop {
            position: absolute;
            width: 100% !important;
            left: 0;
            height: 100% !important;
            transform: scale(2);

            user-select: none;
            pointer-events: none;

            z-index: -1;
        }

        &__header {
            height: 6rem;
            width: 100%;

            display: flex;
            align-items: center;
            gap: .5rem;

            padding: 1.5rem;
            margin-bottom: .8rem;

            img {
                width: 3.5rem;
                height: 3.5rem;
            }
        }

        &__title {
            font-size: 3.5rem;
            color: #5B93FF;
            font-weight: 800;

            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &__main {
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
            flex-grow: 1;

            width: 100%;
            padding-top: 2rem;
            padding-left: 1.2rem;
            padding-right: 1.2rem;


            position: relative;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);

                width: calc(100% - 3rem);
                height: .1rem;

                background: rgba(255, 255, 255, .1);
            }
        }

        &__footer {
            width: 100%;
            flex-grow: 0;
            padding-bottom: 2rem;
        }
    }
</style>