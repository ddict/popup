<template>
    <div v-if="data && data.dict"
         class="card border-primary text-primary section">
        <div class="card-header">{{ name }}</div>

        <ul class="list-group list-group-flush">
            <li v-for="(dict, index) in data.dict"
                :key="`${dict.pos}-${index}`"
                class="list-group-item">

                <h5 class="card-title text-muted title">{{ dict.pos }}</h5>

                <div v-for="(entry, index) in dict.entry"
                     :key="`${entry.word}-${index}`">

                    <span class="badge badge-primary clickable-badge"
                          @click="$emit('translate', entry.word)">
                        {{ entry.word }}
                    </span>

                    <small class="text-muted"> ― {{ entry.reverse_translation.join(', ') }}</small>
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
            name: 'Translations',
        }
    },
}
</script>