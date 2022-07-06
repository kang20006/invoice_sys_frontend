<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        
      </span>
      <span v-else>Menu</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/invoice" icon="fas fa-columns">Invoice</SidebarLink>
    <SidebarLink to="/company" icon="fas fa-building">Company</SidebarLink>
    <SidebarLink to="/item" icon="fas fa-cubes-stacked">Item</SidebarLink>
    <SidebarLink to="/activity" icon="fas fa-briefcase">Activity</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #00094B;
  --sidebar-item-hover: #00157F;
  --sidebar-item-active: #003297;
}
</style>

<style scoped>
    .sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    }
    .sidebar h1 {
    height: 2.5em;
    }
    .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    color: rgba(255, 255, 255, 0.7);
    transition: 0.2s linear;
    }
    .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
    }
</style>