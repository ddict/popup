<template>
    <div class="col-sm-6 section">
        <small v-if="data"
               class="textarea-src-target-header">

            <span class="pointer" v-if="!playing" @click="play">🗣️</span>
            <span class="pointer" v-if="playing" @click="stop">⏹️</span>

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
              class="small pointer"
              @click="clear">
            ❌
        </span>

        <textarea id="input"
                  ref="input"
                  v-model.trim="input"
                  class="form-control textarea-src-target"
                  :style="{ 'text-align': rtl ? 'right' : 'left' }"
                  autofocus />

        <p class="small form-check text-muted textarea-footer">
            <input id="auto_translate" class="form-check-input" v-model="auto_translate" type="checkbox"> 
            <label for="auto_translate" class="form-check-label">Auto translate</label>
            <small class="float-right" v-if="input != ''">{{ input.length }} / {{ INPUT_MAX_LENGTH }}</small>
        </p>
    </div>
</template>

<script>
import config from "../config";
import textarea from "../core/textarea";

const helper = require("../helper");

const LABEL_AUTO_TRANSLATE = "auto_translate";

export default {
    props: {
        data: {
            type: Object,
            default: null
        },
        tts: {
            type: Object,
            default: null
        },
        replace: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            input: "",
            INPUT_MAX_LENGTH: config.INPUT_MAX_LENGTH,
            input_timeout: null,

            player: new Audio(),
            playing: false,

            ttsIndex: 0,

            auto_translate: false
        };
    },
    computed: {
        rtl() {
            if (!this.data) return false;
            return helper.isRTL(this.data.src);
        }
    },
    watch: {
        replace(new_input) {
            this.input = new_input;

            setTimeout(() => {
                this.$refs.input.select()
            }, 100)
        },
        tts() {
            // new data -> reset index
            this.ttsIndex = 0;
        },
        auto_translate() {
            localStorage.setItem(LABEL_AUTO_TRANSLATE, this.auto_translate);
        }
    },
    mounted() {
        // textarea
        textarea.init(this.$refs.input, config.INPUT_MAX_LENGTH);

        // player on ended event
        this.player.addEventListener("ended", () => {
            this.ttsIndex++;

            // all played
            if (this.ttsIndex >= this.tts.src.length) {
                this.stop();
                return;
            }

            // play next
            this.play();
        });

        // textarea on change event
        this.$refs.input.addEventListener("input", () => {
            textarea.autoResize(this.$refs.input);

            // auto translate on/off
            if (!this.auto_translate) return;

            // delay
            clearTimeout(this.input_timeout);
            this.input_timeout = setTimeout(this.translate, config.INPUT_DELAY);
        });

        // translate when hit enter
        this.$refs.input.addEventListener("keyup", e => {
            // auto translate on/off
            if (this.auto_translate) return;

            // enter
            if (e && e.keyCode === 13) this.translate();
        });
    },
    created() {
        // load auto translate setting
        const auto_translate = localStorage.getItem(LABEL_AUTO_TRANSLATE);
        if (auto_translate === "true") this.auto_translate = true;
    },
    methods: {
        play() {
            if (!this.tts.src) {
                return;
            }
            this.player.src = this.tts.src[this.ttsIndex];

            // this.player.load()
            this.playing = true;
            this.player.play().catch(() => {
                this.playing = false;
            });
        },
        stop() {
            this.playing = false;
            this.ttsIndex = 0;
            this.player.pause();
        },
        clear() {
            // emit parent clear
            this.$emit("clear");

            this.input = "";
            textarea.init(this.$refs.input, config.INPUT_MAX_LENGTH);

            this.$refs.input.focus();
        },
        translate() {
            if (!this.input) {
                this.clear();
                return;
            }

            // emit parent translate
            this.$emit("translate", this.input);
        }
    }
};
</script>