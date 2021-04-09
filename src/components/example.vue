<template>
    <div v-if="data && data.examples"
         class="card border-dark text-dark section">
        <div class="card-header">
            {{ name }}

            <span v-if="data.examples.example.length > 1 && !more" style="float: right" @click="more = true">
                <b-icon-arrows-expand></b-icon-arrows-expand>
            </span>
            <span v-if="data.examples.example.length > 1 && more" style="float: right" @click="more = false">
                <b-icon-arrows-collapse></b-icon-arrows-collapse>
            </span>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item"
                v-html="data.examples.example[0].text" />
        </ul>

        <transition name="fade">
            <ul v-if="more"
                class="list-group list-group-flush">
                <li v-for="(example, index) in data.examples.example.slice(1)"
                    :key="`${example.definition_id}-${index}`"
                    class="list-group-item"
                    v-html="example.text" />
            </ul>
        </transition>
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
            name: 'Examples',

            more: false,
        }
    },
}
</script>