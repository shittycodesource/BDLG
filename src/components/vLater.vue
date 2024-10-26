<template>
    <div class="later">
        {{ 'Later' | localize }}...
    </div>
</template>

<script>
    export default {
        name: "vLater"
    }
</script>

<style lang="scss">
    .later {
        margin: 4.5rem auto;

        text-align: center;
        font-weight: 800;
        color: #5B93FF;
        font-size: 5rem;

        text-transform: uppercase;
    }
</style>