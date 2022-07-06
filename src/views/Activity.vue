<template>
  <div>
    <FullCalendar :events="events" :options="options" />
  </div>
</template>

<script>
import '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/vue3'
import axios from "../plugins/axios";

export default {
  name: 'Activity',
  components: {
     FullCalendar
  },
  data() {
        return {
            options: {
                plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialDate : new Date(),
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                selectable:true, 
                selectMirror: true, 
                dayMaxEvents: true,
                eventClick: this.handleEventClick,
                events: null
            },
           
        };
    },
   methods: {
    handleEventClick(e) {
      confirm(`Activity Title: '${e.event._def.title}'\nDate: '${e.event._instance.range.start}'\nActivity Description: '${e.event._def.extendedProps.act_description}'`
      ) 
    },
  },
   mounted() {
    axios
      .get("/activity/")
      .then((res) => {
        this.options.events = res.data;
        
      })
      .catch((err) => console.log(err.message));
  },

}
</script>

<style scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.fc-header-toolbar) {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>