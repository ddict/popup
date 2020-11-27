<template>
    <div class="col-sm-6 section">
        <small v-if="data"
               class="textarea-src-target-header">

            <span v-if="!playing" @click="play">🗣️</span>
            <span v-if="playing" @click="stop">⏹️</span>

            <span v-if="data.ddictSrc"
                  class="text-muted">
                {{ data.ddictSrc }}
            </span>

            <span v-for="(sentence, index) in data.sentences"
                  :key="`${sentence.src_translit}-${index}`"
                  class="text-muted">

                <span v-if="sentence.src_translit">
                    ― {{ sentence.src_translit }}
                </span>
            </span>

        </small>

        <span v-if="input != ''"
              id="clear"
              @click="clear">
            ❌
        </span>

        <textarea id="input"
                  ref="input"
                  v-model.trim="input"
                  class="form-control textarea-src-target"
                  :style="{ 'text-align': rtl ? 'right' : 'left' }"
                  autofocus />

        <p class="text-right text-muted textarea-footer">
            <small v-if="input != ''">{{ input.length }} / {{ INPUT_MAX_LENGTH }}</small>
        </p>
    </div>
</template>

<script>
import config from '../config'
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
        replace: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            input: '',
            INPUT_MAX_LENGTH: config.INPUT_MAX_LENGTH,
            input_timeout: null,

            player: new Audio(),
            playing: false,

            ttsIndex: 0,
        }
    },
    computed: {
        rtl() {
            if (!this.data) return false
            return helper.isRTL(this.data.src)
        },
    },
    watch: {
        data(data) {
            if (!data || !data.text) {
                this.input = ''
                return
            }

            this.input = data.text
            this.$refs.input.select()
        },
        replace(new_input) {
            this.input = new_input
        },
        tts() {
            // new data -> reset index
            this.ttsIndex = 0
        },
    },
    mounted() {
        // textarea
        textarea.init(this.$refs.input, config.INPUT_MAX_LENGTH)

        // player on ended event
        this.player.addEventListener('ended', () => {
            this.ttsIndex++

            // all played
            if (this.ttsIndex >= this.tts.src.length) {
                this.stop()
                return
            }

            // play next
            this.play()
        })

        // textarea on change event
        this.$refs.input.addEventListener('input', () => {
            textarea.autoResize(this.$refs.input)

            // delay
            clearTimeout(this.input_timeout)
            this.input_timeout = setTimeout(this.translate, config.INPUT_DELAY)
        })
    },
    methods: {
        play() {
            if (!this.tts.src) {
                return
            }
            this.player.src = this.tts.src[this.ttsIndex]

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
        clear() {
            // emit parent clear
            this.$emit('clear')

            this.input = ''
            textarea.init(this.$refs.input, config.INPUT_MAX_LENGTH)

            this.$refs.input.focus()
        },
        translate() {
            if (!this.input) {
                this.clear()
                return
            }

            // emit parent translate
            this.$emit('translate', this.input)
        },
    },
}
</script>