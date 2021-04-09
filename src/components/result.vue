<template>
    <div class="col-sm-6 section">
        <small v-if="data"
               class="textarea-src-target-header">

            <span class="pointer" v-if="!playing" @click="play">
                <b-icon-volume-up></b-icon-volume-up>
            </span>
            <span class="pointer" v-if="playing" @click="stop">
                <b-icon-stop-circle></b-icon-stop-circle>
            </span>

            <span v-if="data.ddictTarget"
                  class="text-muted">
                {{ data.ddictTarget }}
            </span>

        </small>

        <textarea ref="input"
                  class="form-control textarea-src-target"
                  :style="{ 'text-align': rtl ? 'right' : 'left' }"
                  readonly
                  spellcheck="false" />

        <p v-if="data"
           class="small text-right text-muted textarea-footer">
            <small>Powered by Google Translate</small>
        </p>
    </div>
</template>

<script>
import textarea from '../core/textarea'

const helper = require('../helper')

export default {
    props: {
        data: {
            type: Object,
            default: null,
        },
        tts: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            player: new Audio(),
            playing: false,

            ttsIndex: 0,
        }
    },
    computed: {
        rtl() {
            if (!this.data) return false
            return helper.isRTL(this.data.target)
        },
    },
    watch: {
        data(data) {
            if (!data) {
                this.$refs.input.value = ''
                textarea.init(this.$refs.input)
                return
            }

            this.$refs.input.value = data.sentences
                .map(sentence => sentence.trans)
                .join('')
            textarea.autoResize(this.$refs.input)
        },
        tts() {
            // new data -> reset index
            this.ttsIndex = 0
        },
    },
    mounted() {
        textarea.init(this.$refs.input)
        textarea.autoResize(this.$refs.input)

        // player on ended event
        this.player.addEventListener('ended', () => {
            this.ttsIndex++

            // all played
            if (this.ttsIndex >= this.tts.target.length) {
                this.stop()
                return
            }

            // play next
            this.play()
        })
    },
    methods: {
        play() {
            if (!this.tts.target) {
                return
            }
            this.player.src = this.tts.target[this.ttsIndex]

            // this.player.load()
            this.playing = true
            this.player.play().catch(() => {
                this.playing = false
            })
        },
        stop() {
            this.playing = false
            this.ttsIndex = 0
            this.player.pause()
        },
    },
}
</script>