<script setup>
import NodeCard from '../components/NodeCard.vue';
const props = defineProps({
    data: Object
});
</script>
<template>
    <div class="grid">
        <NodeCard :nodeData="data"></NodeCard>
    </div>
</template>