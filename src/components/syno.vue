<template>
    <div v-if="data && data.synsets"
         class="card border-info text-info section">
        <div class="card-header">{{ name }}</div>

        <ul class="list-group list-group-flush">
            <li v-for="(dict, index) in data.synsets"
                :key="`${dict.pos}-${index}`"
                class="list-group-item">
                <h5 class="card-title text-muted title">{{ dict.pos }}</h5>

                <div v-for="(entry, index) in dict.entry"
                     :key="`${entry.definition_id}-${index}`">

                    <span v-for="(synonym, index) in entry.synonym"
                          :key="`${synonym}-${index}`">

                        <span class="badge badge-info clickable-badge"
                              @click="$emit('translate', synonym)">{{ synonym }}</span>

                        <span/>
                    </span>
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
            name: 'Synonyms',
        }
    },
}
</script>