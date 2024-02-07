<script setup>
import { hread, secondsToTime } from '../utils'
const props = defineProps({
    nodeData: Object
});
</script>

<template>
    <article class="round s12 m12 l6 no-margin" v-for="node in Object.keys(nodeData)">
        <article class="border">
            <h5>
                <button v-if="nodeData[node].status" class="small-round green white-text"><i>arrow_drop_up</i>UP</button>
                <button v-if="!nodeData[node].status" class="small-round red white-text"><i>arrow_drop_down</i>DOWN</button>
                {{ node }}
            </h5>
            <div class="small-divider"></div>
            <div class="grid">
                <div class="s6">
                    <i>ac_unit</i>
                    <p>CPU: {{ nodeData[node].cpu.usage }}% ({{ nodeData[node].cpu.cores }} cores)</p>
                    <progress max="100" :value="nodeData[node].cpu.usage"></progress>
                    <i>memory</i>
                    <p>Memory: {{ hread(nodeData[node].mem.used) }} / {{ hread(nodeData[node].mem.total) }}</p>
                    <progress :value="nodeData[node].mem.used / nodeData[node].mem.total"></progress>
                </div>
                <div class="s6">
                    <i>storage</i>
                    <p>Storage: {{ hread(nodeData[node].fs.used) }} / {{ hread(nodeData[node].fs.total) }}</p>
                    <progress :value="nodeData[node].fs.used / nodeData[node].fs.total"></progress>
                    <i>rss_feed</i>
                    <p>Transmitted: ↑ {{ hread(nodeData[node].network.tx) }} | ↓ {{
                        hread(nodeData[node].network.rx) }}</p>
                    <p>Real Time&nbsp; : ↑ {{ hread(nodeData[node].network.tx_current, true) }}ps | ↓ {{
                        hread(nodeData[node].network.rx_current, true) }}ps</p>
                </div>
            </div>
        </article>
        <div class="grid">
            <div class="s6">
                <i>more_horiz</i>
                <p><i>start</i></p>
                <p>Uptime: {{ secondsToTime(nodeData[node].uptime) }}</p>
                <p><i>android</i></p>
                <p>Platform: {{ nodeData[node].os.os }} {{ nodeData[node].os.version }}</p>
            </div>
            <div class="s6">
                <i>snowing_heavy</i>
                <p>Loadavg: {{ nodeData[node].loadavg }}</p>

                <i>swap_calls</i>
                <p>Swap: {{ hread(nodeData[node].mem.swap.used) }} / {{ hread(nodeData[node].mem.swap.total) }}
                </p>
                <progress :value="nodeData[node].mem.swap.used / nodeData[node].mem.swap.total"></progress>
            </div>
        </div>
    </article>
</template>
<style></style>