<template>
    <div v-if="data && data.related_words && data.related_words.word"
         class="card border-secondary text-secondary section">
        <div class="card-header">{{ name }}</div>
        <div class="card-body">
            <span v-for="(word, index) in data.related_words.word"
                  :key="`${word}-${index}`">

                <span class="badge badge-secondary clickable-badge"
                      @click="$emit('translate', word)">{{ word }}</span>

                <span/>
            </span>
        </div>
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
            name: 'See also',
        }
    },
}
</script>