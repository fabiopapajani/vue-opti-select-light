<template>
  <div class="opti-select-light">
    <b-dd :lazy="lazy">
      <template v-slot:button-content>
        Custom <strong>Content</strong> with <em>HTML</em> via Slot
      </template>
      <b-dd-item href="#">An item</b-dd-item>
      <b-dd-item href="#">Another item</b-dd-item>
    </b-dd>
  </div>
</template>

<script>
export default {
  name: 'vue-opti-select-light',
  props: {
    value: null,
    options: { type: Array, default: () => [] },
    uniqueKey: { type: [String, Function], default: 'value' },
    contentKey: { type: [String, Function], default: 'content' },
    error: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    searchField: { type: String, default: 'content' },
    searchPlaceholder: { type: String, default: 'Search...' },
    lazy: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.opti-select-light {

}
</style>