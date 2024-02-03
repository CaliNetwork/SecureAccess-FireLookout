<script setup>
import NodeCardDetailed from '../components/NodeCardDetailed.vue';
const props = defineProps({
    data: Object
});
</script>
<template>
    <div class="grid">
        <NodeCardDetailed :nodeData="data"></NodeCardDetailed>
    </div>
</template>