<template>
  <div class="section">
    <div class="field">
      <label class="label">API Key</label>
      <div class="control">
        <input class="input" type="text" v-model="key" placeholder="...">
      </div>
      <p class="help">
        <a href="https://clarifai.com/developer/account/keys/create">Clarifai</a> API Key <br>
        <small>Minium scope: <em>Search by Inputs and Concepts</em></small>
      </p>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-primary" @click="save()">Save</button>
        <button class="button is-red" @click="load()">Reset</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: ''
    }
  },
  methods: {
    load () {
      browser.storage.local.get()
        .then(data => {
          this.key = data.clarifai_api_key || ''
        })
    },
    save () {
      const data = { clarifai_api_key: this.key }
      browser.storage.local.set(data)
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style lang="css">
</style>
