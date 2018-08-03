<template>
    <div class="col-sm-6 section">
        <small v-if="data"
               class="textarea-src-target-header">

            <font-awesome-icon v-if="!playing"
                               icon="volume-up"
                               @click="play" />

            <font-awesome-icon v-if="playing"
                               icon="stop-circle"
                               @click="stop" />

            <span v-if="data.ddictSrc"
                  class="text-muted">
                {{ data.ddictSrc }} ―
            </span>

            <span v-for="(sentence, index) in data.sentences"
                  :key="`${sentence.src_translit}-${index}`"
                  class="text-muted">
                {{ sentence.src_translit }}
            </span>

        </small>

        <span v-if="input != ''"
              id="clear"
              @click="clear">
            <font-awesome-icon icon="times-circle" />
        </span>

        <textarea ref="input"
                  v-model.trim="input"
                  class="form-control textarea-src-target"
                  autofocus />

        <p class="text-right text-muted textarea-footer">
            <small v-if="input != ''">{{ input.length }} / {{ INPUT_MAX_LENGTH }}</small>
        </p>
    </div>
</template>

<script>
import config from '../config'
import textarea from '../core/textarea'

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
        }
    },
    watch: {
        replace(new_input) {
            this.input = new_input
        },
    },
    mounted() {
        // textarea
        textarea.init(this.$refs.input, config.INPUT_MAX_LENGTH)

        // player on ended event
        this.player.addEventListener('ended', () => {
            this.playing = false
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
            this.player.src = this.tts.src

            this.player.load()
            this.playing = true
            this.player.play().catch(() => {
                this.playing = false
            })
        },
        stop() {
            this.playing = false
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