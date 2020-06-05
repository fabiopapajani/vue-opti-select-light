<template>
  <div class="opti-select-light">
    <b-dd :lazy="lazy">
      <template v-slot:button-content>
        Custom <strong>Content</strong> with <em>HTML</em> via Slot
      </template>
      <template v-for="(option, i) in $c_options.array">
        <b-dd-item :key="`option-${i}`" :disabled="!!option.disabled">
          <!-- <div v-html="!$slots[`ITEM_${$_optionKey(option)}`] && !$slots['ITEM'] ? $_optionLabel(option) : undefined">
            <slot v-if="$slots[`ITEM_${$_optionKey(option)}`]" :name="`ITEM_${$_optionKey(option)}`" :option="option"></slot>
            <slot v-else-if="$slots['ITEM']" name="ITEM" :option="option"></slot>
          </div> -->
          <div class="option-content">
            <slot v-if="$slots[`ITEM_${$_optionKey(option)}`]" :name="`ITEM_${$_optionKey(option)}`" :option="option"></slot>
            <slot v-else-if="$slots['ITEM']" name="ITEM" :option="option"></slot>
            <span v-else v-html="$_optionLabel(option)"></span>
          </div>
        </b-dd-item>
      </template>
    </b-dd>
  </div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'vue-opti-select-light',
  props: {
    value: { type: Array, default: () => [] },
    default: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    uniqueKey: { type: [String, Function], default: 'value' },
    labelKey: { type: [String, Function], default: 'content' },
    error: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    searchFields: { type: Array, default: () => ['content'] },
    searchPlaceholder: { type: String, default: 'Search...' },
    groups: { type: Array, default: () => [] }, // Groups options
    groupBoundary: { type: Boolean, default: false }, // Boundary when radio buttons
    mode: { type: Object, default: () => ({ button: 'placeholder', item: 'text' }) },
    placeholder: { type: String, default: 'Select Option' },
    lazy: { type: Boolean, default: false }
  },
  data () {
    return {
      localModel: {},
      // localOptions: []
    }
  },
  created () {
    // this.$watch('options', (options) => {
    //   const localOptions = _.cloneDeep(options)
    //   this.localOptions = localOptions
    // }, { deep: true, immediate: true })
    // TODO watch search
  },
  computed: {
    $c_options () {
      const computedOptions = { array: [], map: {} }
      this.options.forEach(option => {
        const key = this.$_optionKey(option)
        const label = this.$_optionLabel(option)
        const newOption = Object.assign({}, option, { private: { key, label } })
        computedOptions.array.push(newOption)
        computedOptions[key] = newOption
      })
      return computedOptions
    }
  },
  methods: {
    $_optionKey (option) {
      const key = typeof this.uniqueKey === 'function' ? this.uniqueKey(option) : this.uniqueKey
      return option[key]
    },
    $_optionLabel (option) {
      const key = typeof this.labelKey === 'function' ? this.labelKey(option) : this.labelKey
      return option[key]
    }
  }
}
</script>

<style lang="scss">
.opti-select-light {

}
</style>