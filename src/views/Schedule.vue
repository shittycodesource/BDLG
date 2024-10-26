<template>
    <div class="schedule">
        <v-schedule-header v-if="currentTime != 0" :time="currentTime.toDate()" @toggleBreaks="areBreaksHidden = !areBreaksHidden"></v-schedule-header>

        <template v-if="currentTime != 0"> 
            <v-schedule-card

                v-if="areBreaksHidden && data.isMarkedAsBreak ? false : true"
                v-for="(data, index) in schedule"
                :data="data"
                :currentTime="currentTime"
                :key="index"
            ></v-schedule-card>
        </template>

        <v-homichok-loader :isVisible="isLoading"></v-homichok-loader>
    </div>
</template>



<script>
    import vScheduleHeader from '../components/vScheduleHeader.vue';
    import vScheduleCard from '../components/vScheduleCard.vue';

    import vHomichokLoader from '../components/vHomichokLoader.vue';

    import { mapGetters, mapActions } from "vuex";

    /* 
        currentTime is a reference to getServerTime 
        so every second the data in vuex state updates
    
        if you copy the serverTime value using json stringify or object assign
        it will lose firebase getDate() function
    */
       
    export default {
        name: "Schedule",
        components: { vScheduleHeader, vScheduleCard, vHomichokLoader },
        data() {
            return {
                currentTime: 0,
                firstValue: 0,
                
                updateInterval: null,

                areBreaksHidden: false,

                schedule: [],

                isLoading: true
            }
        },
        computed: {
            ...mapGetters(['getServerTime']),

            // crap, can delete it
            // formattedTime() {
            //     let num = 0;

            //     num += this.currentTime.seconds;
            //     num += this.currentTime.nanoseconds;

            //     return new Date(num).getFullYear();
            // }
        },
        methods: {
            ...mapActions(['fetchServerTime', 'fetchSchedule']),
            setFirstValue() { // store first value that was fetched from server
                this.firstValue = this.getServerTime;
            },

            setCountingInterval() { // set interval on client so i don't have to trigger the server every second
                // this.currentTime = JSON.parse(JSON.stringify(this.getServerTime));
                // this.currentTime = Object.assign({}, this.getServerTime);
                
                if (this.updateInterval != null) {
                    return false;
                }

                this.currentTime = this.getServerTime;

                this.updateInterval = setInterval(() => {

                    this.currentTime.seconds += 1;

                    // console.log('Interval > getServerTime', this.getServerTime.seconds);
                    // console.log('Interval > currentTime', this.currentTime.seconds);

                }, 1000);

                console.log('currentTime', this.currentTime);
            },
            async visibilityChangeHandler(event) {
                try {
                    console.log('!!! Visibility Changed !!!');
                    // console.log('document hidden', document.hidden);

                    if (document.hidden == false) {
                        this.isLoading = true;

                        clearInterval(this.updateInterval); 
                        this.updateInterval = null;

                        console.log('!not hidden!');

                        console.log('_____About to update');


                            clearInterval(this.updateInterval); 
                        
                            this.currentTime = 0;
                            this.firstValue = 0;

                            console.log('_____Reset Vars');
                            
                            await this.fetchServerTime();

                            // this.setCountingInterval();

                            console.log('_____Done');

                            this.isLoading = false;

                    } else {
                        console.log('!hidden!');
                    }

                } catch(error) {
                    throw error;
                } 
            }
        },
        async created() {
            try {
                await this.fetchServerTime();

                const schedule = await this.fetchSchedule();
 
                this.schedule = schedule.sort((a, b) => a.startTime.toDate() - b.startTime.toDate())


                // console.log('window', window);

                window.addEventListener('visibilitychange', this.visibilityChangeHandler);

                this.isLoading = false;

            } catch(error) {
                throw error;
            } 
        },
        beforeDestroy() {
            clearInterval(this.updateInterval); 

            window.removeEventListener('visibilitychange', this.visibilityChangeHandler);
        },
        watch: {
            'getServerTime': {
                handler() {
                    console.log('watch: getServerTime handler()')

                    if (this.firstValue == 0) {
                        this.setFirstValue();

                        // console.log(this.getServerTime);
                        this.setCountingInterval();
                    }
                }
            }
        }
    }
</script>

<style lang="scss" >
    .schedule {
        display: flex;
        // align-items: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;
        padding-top: 6rem;
    }
</style>