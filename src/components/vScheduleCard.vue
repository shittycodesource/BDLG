<template>
    <div 
        class="schedule-card" 
        :class="[
            { 'schedule-card--active': isActive },
            { 'schedule-card--ended': isEnded }
        ]"
    >
        
        <h3 class="schedule-card__title">{{ data.name }}</h3>

        <div class="schedule-card__inner">
            <div class="schedule-card__start">
                {{ data.startTime.toDate() | date({ onlyTime: true, usingWords: false, onlyDay: false }) }}
            </div>
            <div class="schedule-card__bar">
                <div class="schedule-card__progress">
                    <div 
                        class="schedule-card__filled" 
                        :style="{ width: `${percentage}%` }"
                    ></div>
                </div>
            </div>
            <div class="schedule-card__end">
                {{ data.endTime.toDate() | date({ onlyTime: true, usingWords: false, onlyDay: false }) }}
            </div>


            <div class="schedule-card__ended" v-if="isEnded">
                <div class="schedule-card__comment">Окончен</div>
            </div>

            <div class="schedule-card__comment schedule-card__teacher" v-if="data.teacher">{{ data.teacher }}</div>
        </div>

        <div class="schedule-card__hint" v-if="showHint">{{ { start: currentTime.toDate(), end: data.endTime.toDate() } | difference }} м. до конца</div>
        <!-- {{ new Date(this.data.endTime.seconds * 1000 - (this.data.endTime.seconds * 1000 - this.currentTime.seconds * 1000)) }} -->

    </div>
</template>

<script>
    export default {
        name: "vScheduleCard",
        props: {
            data: {
                type: Object
            },
            currentTime: {
                type: [Object, Date]
            }
        },
        computed: {
            percentage() {
                const start = this.data.startTime.toMillis();
                const end = this.data.endTime.toMillis();
                const today = this.currentTime.toMillis();

                const p = Math.round(((today - start) / (end - start)) * 100)
                // const p = ((today - start) / (end - start)) * 100

                return p;
            },
            
            isActive() {
                const value = this.percentage;
                
                if (value < 100 && value > 0) {
                    return true;
                }

                return false;
            },

            // seconds() {
            //     const num = Number((this.data.endTime.seconds - this.currentTime.seconds) / 60).toFixed(2);
            //     const divided = `${num}`.split('.');

            //     console.log(divided)
            //     const result = divided[2]

            //     return result;
            // },

            isEnded() {
                const value = this.percentage;
                
                if (value >= 100) {
                    return true;
                }

                return false;
            },

            showHint() {
                if (this.isEnded) return false;

                const a = this.data.endTime.toDate() - this.data.startTime.toDate();
                const b = this.data.endTime.toDate() - this.currentTime.toDate();

                 // 40:2 < 40 - 15 => false
                 // 40:2 < 40 - 25 => true
                if ((a / 2) < (a - b)) {
                    return true;
                }

                return false;
            }
        }
    }
</script>

<style lang="scss">
    .schedule-card {
        max-width: 48rem;
        width: 100%;

        margin: 0 auto 1.5rem;


        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;

            background: #F9F9F9;
            border: .1rem solid #ECEDEE;
            border-radius: .7rem;

            padding: 1.2rem 1.5rem;

            position: relative;
        }

        &__comment,
        &__person {
            border: .1rem solid #FBFBFB;
            background: #F8F8F8;
            border-radius: .5rem;
            box-shadow: 0 .2rem .8rem 0 rgba(0, 0, 0, .2);

            padding: .4rem .8rem;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 1.6rem;
            font-weight: 700;
            color: #9F9F9F;
        }

        &__title {
            margin: 0;
            margin-bottom: .5rem;
            padding: 0;

            font-size: 2rem;
            font-weight: 700;
            // color: #5B93FF;
            color: #B8B8B8;
        }

        &__start,
        &__end {
            max-width: 6rem;
            width: 100%;

            font-size: 2rem;        
            font-weight: 700;
            color: #B8B8B8;

            text-align: left;
        }

        &__end {
            text-align: right;
        }

        &__bar {
            flex-grow: 1;
        }

        &__progress {
            height: 1rem;
            width: 100%;

            background: #E0E0E0;
            border-radius: 1rem;

            position: relative;

            overflow: hidden;
        }

        &__filled {
            position: absolute;
            left: 0;
            bottom: 0;
            top: 0;

            width: 0%;
            height: 100%;

            background: #5B93FF;

            transition: width .2s linear;
        }

        &__ended {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            background: rgba(255, 255, 255, .5);

            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__teacher {
            position: absolute;
            bottom: -2rem;
            right: -1rem;
        }

        &__hint {
            font-style: italic;
            color: #9F9F9F;
            font-weight: 400;
            // font-size: 1.4rem;
            margin-top: .5rem;
        }

        &--active {
            .schedule-card {
                &__inner {
                    background: #DEE9FF;
                    border-color: #9DBEFF;
                }

                &__title {
                    color: #5B93FF;
                }

                &__progress {
                    background: #BFD5FF;
                }

                &__start,
                &__end {
                    color: #5B93FF;
                }
            }
        }

        &--ended {
            .schedule-card {
                &__filled {
                    background: #B8B8B8;
                }

                &__teacher {
                    opacity: .6;
                }
            }
        }
    }
</style>