<script setup>
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
if (localStorage.getItem('mode') != null) {
  ui("mode", localStorage.getItem('mode'));
}

let nodeData = ref([])
let status = ref(false)
const fetchData = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const ws = new WebSocket(`${protocol}://${location.host}/api/nodeData`);
  ws.addEventListener("open", event => {
    status.value = true;
    ws.send("Give me big american food");
  })

  ws.addEventListener("message", event => {
    nodeData.value = JSON.parse(event.data);
  })

  ws.addEventListener("close", event => {
    ws.close();
    status.value = false;
    setTimeout(() => {
      console.log("Connection closed, trying to reconnect in 5 seconds")
      fetchData();
    }, 5000);
  });
}
fetchData();
</script>
<template>
  <NavBar :connected="status" />
  <div class="space"></div>
  <main class="responsive">
    <router-view :data="nodeData"></router-view>
  </main>
</template>