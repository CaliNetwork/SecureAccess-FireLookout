<script setup>
const props = defineProps({
    connected: Boolean
});
const changeTheme = () => {
    if (ui("mode") == "dark") {
        ui("mode", "light");
        localStorage.setItem('mode', "light");
    } else {
        ui("mode", "dark");
        localStorage.setItem('mode', "dark");
    }
}
</script>

<template>
    <nav class="top-round bottom">
        <router-link to="/">
            <i>home</i>
            <span>Overview</span>
        </router-link>
        <router-link to="/details">
            <i>book</i>
            <span>Details</span>
        </router-link>
        <a @click="changeTheme();">
            <i>contrast</i>
            <span>Theme</span>
        </a>
        <a v-if="connected">
            <i class="green">link</i>
            <span>Connected</span>
        </a>
        <a v-if="!connected">
            <i class="red">link_off</i>
            <span>Disconnected</span>
        </a>
    </nav>
</template>