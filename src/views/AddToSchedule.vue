<template>
    <div class="add-to-schedule">
        <div class="container">

            <div class="add-to-schedule__inner">

                <div class="add-to-schedule__time">

                    <div class="add-to-schedule__start">
                        <div class="add-to-schedule__title">Start</div>

                        <div class="add-to-schedule__inputs">
                            <div class="add-to-schedule__input">
                                <div class="add-to-schedule__label">Date</div>
                                <input type="date" v-model="startDate"/>
                            </div>
                            <div class="add-to-schedule__input">
                                <div class="add-to-schedule__label">Time</div>
                                <input type="time" v-model="startTime"/>
                            </div>
                        </div>
                    </div>

                    <div class="add-to-schedule__end">
                        <div class="add-to-schedule__title">End</div>
                        
                        <div class="add-to-schedule__inputs">
                            <div class="add-to-schedule__input">
                                <div class="add-to-schedule__label">Date</div>
                                <input type="date" v-model="endDate"/>
                            </div>
                            <div class="add-to-schedule__input">
                                <div class="add-to-schedule__label">Time</div>
                                <input type="time" v-model="endTime"/>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="add-to-schedule__result">
                    Start Time: {{  startAt  }}<br/>
                    End Time: {{  endAt  }}
                </div>
        
                <div class="add-to-schedule__inputs">
                    <v-text-input label="Class" v-model="subject" :value="subject"></v-text-input>
                    <v-text-input label="Teacher" v-model="teacher" :value="teacher"></v-text-input>

                    <div>
                        <v-button @click.native="isABreak = !isABreak">Mark as a break</v-button>
                        {{ isABreak }}
                    </div>

                    <base-button @click.native="add">Add</base-button>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    import vTextInput from '../components/inputs/vTextInput.vue';
    import BaseButton from '../components/Base/BaseButton.vue';

    import { mapActions } from 'vuex';

    export default {
        name: "AddToSchedule",
        components: {
            vTextInput,
            BaseButton
        },
        data() {
            return {
                startDate: false,
                endDate: false,
                startTime: false,
                endTime: false,

                isABreak: false,

                subject: '',
                teacher: '',
            }
        },
        computed: {
            startAt() {
                return `${this.startDate || 'NOT DEFINED'}, ${this.startTime || 'NOT DEFINED'}`;
            },
            endAt() {
                return `${this.endDate || 'NOT DEFINED'}, ${this.endTime || 'NOT DEFINED'}`;
            }
        },
        methods: {
            ...mapActions(['addToSchedule']),
            async add() {
                try {
                    const formattedStart = new Date(this.startDate + " " + this.startTime);
                    const formattedEnd = new Date(this.endDate + " " + this.endTime);

                    const data = {
                        start: formattedStart,
                        end: formattedEnd,
                        subject: this.subject,
                        teacher: this.teacher,
                        isABreak: this.isABreak
                    }


                    console.log('data', data);

                    await this.addToSchedule(data);
                } catch(error) {
                    throw error;
                }
            }
        }
    }
</script>

<style lang="scss">
    .add-to-schedule {
        &__inner {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        &__time {
            display: flex;
            align-items: center;
            gap: 2.5rem;

            margin-bottom: 2.5rem;
        }

        &__result {
            margin-bottom: 2.5rem;
        }

        &__start,&__end {
            width: 50%;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        &__title {
            font-weight: 700;
            color: #5B93FF;
            font-size: 2rem;
        }

        &__inputs {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        
        &__input {
            width: 100%;
        
            input {
                width: 100%;
            }
        }

        &__label {
            margin-bottom: .5rem;
            font-weight: 700;
            color: #5B93FF;
            font-size: 1.6rem;
        }
    }
</style>