<template>
    <app-popup :export_data="data"
               :export_select="select"
               :export_tts="tts"
               @srctarget="srctarget"
               @translate="translate" />
</template>

<script>
import popup from './components/popup.vue'

// testing purpose
import sample_data from './sample/sample_data'
import sample_languages from './sample/sample_languages'
const sample_tts_url = 'http://www.jingle.org/westwood8.mp3'

export default {
    name: 'Test',
    components: {
        appPopup: popup,
    },
    data() {
        return {
            data: null,
            select: null,
            tts: {},
        }
    },
    created() {
        // testing purpose
        setTimeout(() => {
            this.select = {
                src: 'auto',
                target: 'en',

                srcs: sample_languages.sl,
                targets: sample_languages.tl,
            }
        }, 500)
    },
    methods: {
        translate(input) {
            if (!input) {
                return
            }

            // cache target
            const target = this.select.target

            // testing purpose
            setTimeout(() => {
                // translate
                this.data = JSON.parse(JSON.stringify(sample_data))
                this.data.text = 'hello'

                // set data src and target
                if (!this.data.hasOwnProperty('src')) {
                    this.data.src = this.select.src
                }
                if (!this.data.hasOwnProperty('target')) {
                    this.data.target = target
                }
                this.data.ddictSrc = this.select.srcs[this.data.src]
                this.data.ddictTarget = this.select.targets[this.data.target]

                // generate tts urls
                this.tts = {
                    src: [sample_tts_url],
                    target: [sample_tts_url, sample_tts_url, sample_tts_url],
                }
            }, 50)
        },
        srctarget(select) {
            this.select = select

            // if select change => translate
            const text = document.getElementById('input').value
            if (text.trim().length === 0) return
            this.translate(text)
        },
    },
}
</script>