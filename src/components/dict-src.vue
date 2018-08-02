<template>
    <div v-if="data && data.definitions"
         class="card border-success text-success section">
        <div class="card-header">{{ name }}</div>

        <ul class="list-group list-group-flush">
            <li v-for="(dict, index) in data.definitions"
                :key="`${dict.pos}-${index}`"
                class="list-group-item">
                <h5 class="card-title text-muted title">{{ dict.pos }}</h5>

                <div v-for="(entry, index) in dict.entry"
                     :key="`${entry.definition_id}-${index}`">
                    <span>{{ entry.gloss }}</span>
                    <br>
                    <small class="text-muted">{{ entry.example }}</small>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            name: 'Definitions',
        }
    },
}
</script>