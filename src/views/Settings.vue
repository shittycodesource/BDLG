<template>
    <div class="settings">
        <div class="container">
            <div class="settings__inner">

                <div class="settings__title">{{ 'Settings_Title' | localize }}</div>

                <v-select 
                    label="Settings_Language" 
                    :activeOption="selectedLanguage"
                    :options="[ { name: 'Русский' }, { name: 'English' } ]"
                    @select="option => { selectedLanguage = option; update() }"

                    :addMore="false"
                ></v-select>

                <v-select 
                    label="Settings_Language" 
                    :activeOption="selectedLanguage"
                    :options="[ { name: 'Русский' }, { name: 'English' } ]"
                    @select="option => { selectedLanguage = option; update() }"

                    :addMore="false"
                ></v-select>

            </div>
        </div>
    </div>
</template>

<script>
    import vSelect from '../components/inputs/vSelect.vue';

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Settings",
        data() {
            return {
                selectedLanguage: {},
            }
        },
        components: {
            vSelect
        },
        computed: {
            ...mapGetters(['getSettings'])
        },
        methods: {
            ...mapActions(['updateSettings']),
            update() {
                this.updateSettings({
                    language: this.selectedLanguage.name
                })
            }
        },
        created() {
            this.selectedLanguage = { name: this.getSettings.language }
        }
    }
</script>

<style lang="scss">
    .settings {

        &__inner {
            display: flex;
            justify-content: center;
            flex-direction: column;

            max-width: 37rem;
            margin: 0 auto;
        }


        &__title {
            font-size: 3.5rem;
            font-weight: 800;
            color: #606060;

            text-align: center;

            margin: 3.5rem auto;
        }
    }
</style>