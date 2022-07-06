<template>
  <Sidebar/>
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view/>
  </div>
  
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  }
}
</script>


<style>
body {
  background-color: #2b2f4d;
  font-family: "Spartan", sans-serif;
  font-size: 0.75rem;
  line-height: 1.25;
}
.app {
  background-color: #141624;
  width: 100%;
  min-height: 100vh;
  display: flex;
  transition: background-color 0.5s;
}
.dark {
  background-color: #0a0b12;
}
</style>

