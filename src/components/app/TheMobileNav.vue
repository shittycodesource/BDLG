<template>
    <nav class="mobile-nav">
        <div class="mobile-nav__inner">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TheMobileNav"
    }
</script>

<style lang="scss">
    .mobile-nav {
        position: fixed;
        bottom: -.5rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 6.5rem;

        display: flex;
        align-items: center;
        justify-content: space-between;

        background: rgba(19, 18, 21, .85);
        backdrop-filter: blur(3rem);

        z-index: 1000;

        padding: 1.1rem 2rem;
        border-top-left-radius: 1.6rem;
        border-top-right-radius: 1.6rem;

        &::after {
            content: "";
            position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 0;

            border-radius: 1.6rem; /*1*/
            border: .1rem solid transparent; /*2*/
            background: linear-gradient(180deg,#3C3C3C, transparent) border-box; /*3*/
            // background: linear-gradient(180deg,#BFFF98,#32363C) border-box; /*3*/
            -webkit-mask: /*4*/
                linear-gradient(#fff 0 0) padding-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor; /*5'*/
                    mask-composite: exclude; /*5*/

            pointer-events: none;
        }

        &__inner {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>