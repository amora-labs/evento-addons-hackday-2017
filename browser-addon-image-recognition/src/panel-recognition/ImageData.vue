<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <progress class="progress" :value="item.value * 100" max="100" :title="`${item.value * 100}%`">{{ item.value * 100 }}%</progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
</style>
