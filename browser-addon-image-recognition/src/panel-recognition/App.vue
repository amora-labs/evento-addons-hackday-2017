<script>
import { isEmpty } from 'lodash';
import RocogImage from './Image.vue'

export default {
  components: { RocogImage },
  data () {
    return {
      url: '',
    }
  },
  computed: {
    hasImage () {
      return !isEmpty(this.url);
    }
  },
  methods: {
    goToConfig () {
      browser.sidebarAction.setPanel({
        panel: browser.extension.getURL('html/config.html'),
      });
    },
    getImageUrl () {
      const url = new URL(window.location.href);
      return url.searchParams.get('image');
    }
  },
  mounted () {
    this.url = this.getImageUrl()
  }
}
</script>

<template>
  <div class="section">
    <div v-if="!hasImage">
      Waiting...
    </div>
    <RocogImage :url="url" v-if="hasImage" />

    <a @click="goToConfig" class="button is-small is-outlined is-fullwidth">Configuration</a>
  </div>
</template>

<style>

</style>
