<template>
    <header class="schedule-header">  
        <div class="container">
            <div class="schedule-header__inner">

                <div class="schedule-header__left"></div>
                <div class="schedule-header__center">
                    <span>{{ time | date({ onlyTime: false, usingWords: false, onlyDay: true }) }}</span>
                    <div class="schedule-header__time">
                        {{ time | date({ onlyTime: true, usingWords: false, onlyDay: false, seconds: true }) }}
                    </div>
                    <!-- <v-icon name="clocks" width="20px" height="20px"/> -->
                </div>

                <div class="schedule-header__right">
                    <v-button :isSmall="true" @click.native="$emit('toggleBreaks')">
                        Перемены
                    </v-button>
                    <!-- <v-button :isSmall="true">Редактировать</v-button>
                    <router-link to="/add-to-schedule">
                        <v-button :isSmall="true">Добавить</v-button>
                    </router-link> -->
                </div>

            </div>
        </div>
    </header>
</template>

<script>
    import BaseButton from './Base/BaseButton.vue';
    import BaseIcon from './Base/BaseIcon.vue';

    export default {
        name: "vScheduleHeader",
        components: {
            BaseButton,
            BaseIcon
        },
        props: {
            time: {
                type: [Object, Date]
            }
        }
    }
</script>

<style lang="scss" >
    .schedule-header {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.5rem;

        &__inner {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;

        }

        &__left {
            flex-grow: 0;
            width: 33.33%;
        }

        &__center {
            display: flex;
            align-items: center;
            justify-content: center;
            // flex-grow: 1;
            gap: .5rem;
            width: 33.33%;

            text-transform: capitalize;

            font-weight: 700;
            font-size: 2rem;
            color: #000;

            span {
                min-width: max-content;
                // word-break: keep-all;
                // word-wrap: keep-all;
            }
        }

        &__time {
            color: #5B93FF;
            font-size: 2.5rem;
        }

        &__right {
            width: 33.33%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            flex-direction: column;
            gap: 1.5rem;
            
            flex-grow: 0;
        }

    }
</style>