<template>
    <svg class="icon">
        <use :xlink:href="`#${name}`"></use>
    </svg>
</template>

<script>
    export default {
        name: 'BaseIcon',
        props: { name: { type: String, default: '' } }
    }
</script>