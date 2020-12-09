<template>
    <div>
        <app-selects :select="select"
                     @srctarget="srctarget(arguments[0])" />

        <div class="row section">

            <app-input :data="data"
                       :tts="tts"
                       :replace="replace"
                       @translate="translate(arguments[0], false)"
                       @clear="clear" />

            <app-result :data="data"
                        :tts="tts" />
        </div>

        <div class="card-columns" :style="{ 'text-align': rtl ? 'right' : 'left' }">
            <app-dict-target :data="data"
                             @translate="translate(arguments[0], true, true)" />

            <app-dict-src :data="data" />

            <app-syno :data="data"
                      @translate="translate(arguments[0], true)" />

            <app-more :data="data"
                      @translate="translate(arguments[0], true)" />
        </div>

        <div class="row">
            <div class="col">
                <app-example :data="data" />
            </div>
        </div>
    </div>
</template>

<script>
import selects from './selects.vue'
import input from './input.vue'
import result from './result.vue'
import dictSrc from './dict-src.vue'
import dictTarget from './dict-target.vue'
import example from './example.vue'
import syno from './syno.vue'
import more from './more.vue'

const helper = require('../helper')

export default {
    name: 'Popup',
    components: {
        appSelects: selects,
        appInput: input,
        appResult: result,
        appDictSrc: dictSrc,
        appDictTarget: dictTarget,
        appExample: example,
        appSyno: syno,
        appMore: more,
    },
    props: {
        export_data: {
            type: Object,
            default: null,
        },
        export_select: {
            type: Object,
            default: null,
        },
        export_tts: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            data: null,
            select: null,
            tts: null,
            replace: '',
        }
    },
    computed: {
        rtl() {
            if (!this.data) return false
            return helper.isRTL(this.data.target)
        },
    },
    watch: {
        export_data(data) {
            this.data = data
        },
        export_select(select) {
            this.select = select
        },
        export_tts(tts) {
            this.tts = tts
        },
    },
    methods: {
        clear() {
            this.data = null
        },
        translate(input, is_replace, is_swap) {
            // click on translations
            if (is_swap) {
                // stop if src or target is undefined
                if (
                    !this.data.src ||
                    this.data.src === 'auto' ||
                    !this.data.target
                ) {
                    return
                }

                const select = JSON.parse(JSON.stringify(this.select))
                select.src = this.data.target
                select.target = this.data.src

                // set global select
                this.$emit('srctarget', select)
            }

            // scroll top
            window.scrollTo(0, 0)

            this.clear()

            // click on more/syno
            if (is_replace) {
                this.replace = input
            }

            this.$emit('translate', input)
        },
        srctarget(select) {
            this.$emit('srctarget', select)

            // translate when src or target change
            if (this.data) {
                const input = this.data.sentences
                    .map(sentence => sentence.orig)
                    .join('')

                this.$emit('translate', input)
            }
        },
    },
}
</script>

<style>
.section {
    margin-bottom: 0.5rem;
}

.textarea-footer {
    margin-bottom: 0;
}

.title {
    text-transform: capitalize;
}

.clickable-badge {
    margin-right: 0.2rem;
}

.textarea-src-target {
    padding-top: 1.6rem;
}

.textarea-src-target-header {
    position: absolute;
    top: 0.4rem;
    left: 1.5rem;
}

#clear {
    position: absolute;
    top: 0.1rem;
    right: 1.2rem;
}
.pointer {
    cursor: pointer;
}
</style>
