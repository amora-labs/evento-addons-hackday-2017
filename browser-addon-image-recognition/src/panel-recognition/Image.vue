<script>
import recognize from '../recognize';
import ImageData from './ImageData.vue';
import { get } from 'lodash';

export default {
  components: { ImageData },
  props: {
    url: String,
  },
  data () {
    return {
      loading: true,
      error: false,
      debug: {},
      imageData: []
    }
  },
  computed: {
    showData () {
      return this.loading === false && this.error === false;
    }
  },
  methods: {
    loadData () {
      this.loading = true;
      this.error = false;
      this.imageData = {};

      recognize(this.url)
        .then(result => {
          this.loading = false;
          this.debug = result;
          this.imageData = get(result, 'outputs.0.data.concepts', {});
        })
        .catch (e => {
          if (e instanceof Error) {
            this.error = e.message;
          } else {
            this.error = get(e, 'data.outputs.0.status.description', 'Sorry, deu bad!');
          }
          this.loading = false;
          console.error(e);
        })
    }
  },
  mounted () {
    this.loadData()
  }
};
</script>

<template>
  <div>
    <img :src="url">
    <p class="error" v-if="error">{{ error }}</p>
    <div v-if="loading" class="has-text-centered has-text-info">
      <span class="icon is-large">
        <i class="fa fa-refresh fa-spin fa-3x"></i>
      </span>
    </div>
    <image-data :data="imageData" v-if="showData"></image-data>
  </div>
</template>

<style scoped>
  img {
    width: 100%;
  }
</style>
