<template>
    <div v-if="select"
         class="row section">

        <div class="col">
            <select v-model="src"
                    :class="{'form-control': true, 'border-danger': warning}"
                    @change="srctarget">

                <option v-for="(value, key) in select.srcs"
                        :value="key"
                        :key="key">
                    {{ value }}
                </option>
            </select>
        </div>

        <div>
            <span id="swap"
                  class="form-control bg-light"
                  @click="swap">
                <font-awesome-icon icon="exchange-alt" />
            </span>
        </div>

        <div class="col">
            <select v-model="target"
                    :class="{'form-control': true, 'border-danger': warning}"
                    @change="srctarget">

                <option v-for="(value, key) in select.targets"
                        :value="key"
                        :key="key">
                    {{ value }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        select: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            src: '',
            target: '',

            warning: false,
        }
    },
    watch: {
        select() {
            this.src = this.select.src
            this.target = this.select.target
        },
    },
    methods: {
        warn() {
            this.warning = true

            setTimeout(() => {
                this.warning = false
            }, 2000)
        },
        swap() {
            // ignore when no available lang
            if (
                !this.select.srcs.hasOwnProperty(this.target) ||
                !this.select.targets.hasOwnProperty(this.src)
            ) {
                this.warn()
                return
            }

            // swap
            const tmp = this.target
            this.target = this.src
            this.src = tmp

            // update parent
            this.srctarget()
        },
        srctarget() {
            const select = JSON.parse(JSON.stringify(this.select))
            select.src = this.src
            select.target = this.target

            this.$emit('srctarget', select)
        },
    },
}
</script>

<style>
#swap {
    border: none;
}
</style>
