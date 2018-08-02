<template>
    <div class="col-sm-6">
        <small>
            &nbsp;

            <span v-if="data">
                <font-awesome-icon v-if="!playing"
                                   icon="volume-up"
                                   @click="play" />

                <font-awesome-icon v-if="playing"
                                   icon="stop-circle"
                                   @click="stop" />

                <span v-if="data.ddictTarget"
                      class="text-muted">
                    {{ data.ddictTarget }}
                </span>
            </span>
        </small>

        <textarea ref="input"
                  v-model="trans"
                  class="form-control"
                  readonly
                  spellcheck="false" />

        <p v-if="data"
           class="text-right text-muted textarea-footer">
            <small>Powered by Google Translate</small>
        </p>
    </div>
</template>

<script>
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
    },
    data() {
        return {
            player: new Audio(),
            playing: false,
        }
    },
    computed: {
        trans() {
            if (!this.data) {
                return ''
            }

            return this.data.sentences.map(sentence => sentence.trans).join('')
        },
    },
    watch: {
        data() {
            textarea.init(this.$refs.input)
            textarea.autoResize(this.$refs.input)
        },
        tts(url) {
            if (!url) {
                return
            }

            this.player.src = url
        },
    },
    mounted() {
        textarea.init(this.$refs.input)
        textarea.autoResize(this.$refs.input)

        // player on ended event
        this.player.addEventListener('ended', () => {
            this.playing = false
        })
    },
    methods: {
        play() {
            if (!this.tts.target) {
                return
            }
            this.player.src = this.tts.target

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
    },
}
</script>