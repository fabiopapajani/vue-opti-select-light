<template>
  <div :class="[{ 'empty': $c_model.length === 0 }, 'vue-opti-select-light']">
    <b-dd :lazy="lazy" ref="dd-light" :no-caret="$c_buttonNoCaret" @shown="$_shown" @hidden="$_hidden">
      <template #button-content>
        <slot v-if="$_slot('BUTTON_PLACEHOLDER')" name="BUTTON_PLACEHOLDER" :options="$c_model"></slot>
        <span class="button-placehoder-filter" v-else-if="buttonType === 'filter'">
          <i class="fa fa-filter"></i><b-badge pill variant="info">{{$c_model.length}}</b-badge>
        </span>
        <span class="button-placehoder-default" v-else v-html="buttonPlaceholder"></span>
      </template>
      <slot v-if="$_slot('HEADER')" name="HEADER"></slot>
      <template v-for="(groupedOptions, i) in $c_localOptions.array">
        <component :is="groupedOptions.group ? 'b-dd-group' : 'div'" :header="groupedOptions.group.content || ''" :key="`component-${i}`">
          <slot v-if="groupedOptions.group && $_slot(`GROUP_BEFORE_${groupedOptions.group.value}`)" :name="`GROUP_BEFORE_${groupedOptions.group.value}`" :group="groupedOptions.group"></slot>
          <template #header v-if="groupedOptions.group && $_slot(`GROUP_${groupedOptions.group.value}`)" >
            <slot :name="`GROUP_${groupedOptions.group.value}`" :group="groupedOptions.group"></slot>
          </template>
          <template #header v-else-if="groupedOptions.group && $_slot('GROUP')" >
            <slot name="GROUP" :group="groupedOptions.group"></slot>
          </template>
          
          <template v-for="(option, j) in groupedOptions.options">
            <slot v-if="$_slot(`ITEM_BEFORE_${option.private.key}`)" :name="`ITEM_BEFORE_${option.private.key}`" :option="$_originalOption(option.private.key)"></slot>
            <label role="menuitem" :class="[{ 'disabled': !!option.disabled, 'selected': (selected[option.private.key] || selected[option.name] === option.private.key) }, 'dropdown-item m-0']" :key="`option-${i}-${j}`" @click="$_selectItem(option)">
              <div class="option-select pull-left mr-2" v-if="option.type">
                <input v-if="option.type === 'checkbox'" type="checkbox" :true-value="true" :false-value="false" v-model="selected[option.private.key]" @click="$_clickInput" />
                <input v-else-if="option.type === 'radio'" type="radio" :value="option.private.key" :name="option.name" v-model="selected[option.name]" @click="$_clickInput">
              </div>
              <div class="option-content">
                <slot v-if="$_slot(`ITEM_${option.private.key}`)" :name="`ITEM_${option.private.key}`" :option="$_originalOption(option.private.key)"></slot>
                <slot v-else-if="$_slot('ITEM')" name="ITEM" :option="$_originalOption(option.private.key)"></slot>
                <span v-else v-html="option.private.label"></span>
              </div>
            </label>
            <slot v-if="$_slot(`ITEM_AFTER_${option.private.key}`)" :name="`ITEM_AFTER_${option.private.key}`" :option="$_originalOption(option.private.key)"></slot>
          </template>

          <slot v-if="groupedOptions.group && $_slot(`GROUP_AFTER_${groupedOptions.group.value}`)" :name="`GROUP_AFTER_${groupedOptions.group.value}`" :group="groupedOptions.group"></slot>
        </component>
      </template>
      <slot v-if="$_slot('FOOTER')" name="FOOTER"></slot>
    </b-dd>
  </div>
</template>

<script>

export default {
  name: 'vue-opti-select-light',
  props: {
    value: { type: Array, default: () => [] },
    default: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    uniqueKey: { type: [String, Function], default: 'value' },
    labelKey: { type: [String, Function], default: 'content' },
    searchable: { type: Boolean, default: false },
    searchFields: { type: Array, default: () => ['content'] },
    searchPlaceholder: { type: String, default: 'Search...' },
    groups: { type: Array, default: () => [] }, // Groups options
    groupBoundary: { type: Boolean, default: true }, // Boundary when radio buttons
    buttonType: { type: String, default: 'placeholder' },
    buttonNoCaret: { type: Boolean, default: false },
    optionType: { type: String, default: 'default' },
    buttonPlaceholder: { type: String, default: 'Select Option' },
    lazy: { type: Boolean, default: false },
    emitOnClick: { type: Boolean, default: false },
  },
  data () {
    return {
      selected: {}, // Internal usage
      selectedMap: {}, // Mapped Internal model
      touched: false // True when has touched (has changes)
    }
  },
  created () {
    if (this.default.length) {
      // Set Default Values
      this.add(this.default)
    } else if (this.value.length) {
      // Set Default from v-model
      this.value.forEach(option => {
        const key = this.$_optionKey(option)
        if (this.$c_localOptions.map[key]) this.$_setItem(this.$c_localOptions.map[key])
      })
    }
  },
  computed: {
    $c_options () {
      const options = { array: this.options, map: {}, groupsMap: {} }
      this.groups.forEach(group => { options.groupsMap[group.value] = group })
      this.options.forEach(_option => {
        const key = this.$_optionKey(_option)
        options.map[key] = _option
      })
      return options
    },
    $c_localOptions () {
      const computedOptions = { array: [], map: {}, groupsMap: this.$c_options.groupsMap }

      // Register Grouped options
      const groupedOptions = {}

      // Generate options (grouped)
      this.$c_options.array.forEach(_option => {
        const key = this.$_optionKey(_option)
        const label = this.$_optionLabel(_option)
        const option = Object.assign({}, _option, { private: { key, label } })
        // Option Type Priorities: 1-> Option, 2-> Group, 3-> Prop
        if (option.type) {
          // Option
          if (option.type === 'radio') {
            option.name = this.$_radioName(option.name || 'global')
          }
        } else if (computedOptions.groupsMap[option.group] && computedOptions.groupsMap[option.group].type) {
          // Group
          const group = computedOptions.groupsMap[option.group]
          option.type = group.type
          if (option.type === 'radio') {
            option.name = this.groupBoundary ? this.$_radioName(group.value) : this.$_radioName('global')
          }
        } else if (this.optionType !== 'default') {
          // Prop
          if (this.optionType === 'checkbox') {
            option.type = 'checkbox'
          } else if (this.optionType === 'radio') {
            option.type = 'radio'
            option.name = this.$_radioName('global')
          }
        }

        if (option.group && computedOptions.groupsMap[option.group]) {
          // Grouped
          if (!groupedOptions[option.group]) {
            groupedOptions[option.group] = { group: computedOptions.groupsMap[option.group], options: [option] }
            computedOptions.array.push(groupedOptions[option.group])
          } else {
            groupedOptions[option.group].options.push(option)
          }
        } else {
          // Ungrouped
          computedOptions.array.push({ group: false, options: [option] })
        }

        computedOptions.map[key] = option
      })
      return computedOptions
    },
    $c_model () {
      return Object.values(this.selectedMap)
    },
    $c_buttonNoCaret () {
      return this.buttonNoCaret || this.buttonType === 'filter'
    }
  },
  methods: {
    add (value) {
      if (value) {
        const keys = Array.isArray(value) ? value : [value]
        keys.forEach(key => {
          if (this.$c_localOptions.map[key]) this.$_setItem(this.$c_localOptions.map[key])
        })
        this.$_emit()
      }
    },
    remove (value) {
      if (value) {
        const keys = Array.isArray(value) ? value : [value]
        keys.forEach(key => {
          const option = this.$c_localOptions.map[key]
          if (this.selected[option.private.key]) {
            this.$delete(this.selected, option.private.key)
            this.$delete(this.selectedMap, option.private.key)
          } else if (this.selected[option.name] === option.private.key) {
            this.$delete(this.selected, option.name)
            this.$delete(this.selectedMap, option.name)
          }
        })
        this.$_emit()
      }
    },
    clear () {
      this.selected = {}
      this.selectedMap = {}
      this.$_emit()
    },
    $_optionKey (option) {
      const key = typeof this.uniqueKey === 'function' ? this.uniqueKey(option) : this.uniqueKey
      return option[key]
    },
    $_optionLabel (option) {
      const key = typeof this.labelKey === 'function' ? this.labelKey(option) : this.labelKey
      return option[key]
    },
    $_slot (key) {
      return !!this.$slots[key] || !!this.$scopedSlots[key]
    },
    $_radioName (key) {
      return `radio_${key}`
    },
    $_originalOption (key) {
      return this.$c_options.map[key]
    },
    $_selectItem (option) {
      this.$_setItem(option)
      if (!option.type) this.$refs['dd-light'].hide() // Close Dropdown on select
      if (!this.touched) this.touched = true
      if (this.emitOnClick) this.$_emit()
    },
    $_setItem (option, trigger = false) {
      if (!option.type) {
        this.selected = {}
        this.$set(this.selected, option.private.key, true)
        this.selectedMap = {}
        this.$set(this.selectedMap, option.private.key, this.$_originalOption(option.private.key))
        if (trigger) this.$emit('change', this.$_originalOption(option.private.key), true)
      } else if (option.type === 'checkbox') {
        if (!this.selected[option.private.key]) {
          this.$set(this.selected, option.private.key, true)
          this.$set(this.selectedMap, option.private.key, this.$_originalOption(option.private.key))
          if (trigger) this.$emit('change', this.$_originalOption(option.private.key), true)
        } else {
          this.$delete(this.selected, option.private.key)
          this.$delete(this.selectedMap, option.private.key)
          if (trigger) this.$emit('change', this.$_originalOption(option.private.key), false)
        }
      } else if (option.type === 'radio') {
        this.$set(this.selected, option.name, option.private.key)
        this.$set(this.selectedMap, option.name, this.$_originalOption(option.private.key))
        if (trigger) this.$emit('change', this.$_originalOption(option.private.key), true)
      }
    },
    $_clickInput () {
      event.stopPropagation()
      event.preventDefault()
      event.stopImmediatePropagation()
      return false
    },
    $_emit () {
      this.$emit('input', this.$c_model)
    },
    $_shown () {
      this.touched = false
      this.$emit('shown')
    },
    $_hidden () {
      if (!this.emitOnClick && this.touched) {
        this.$_emit()
      }
      this.$emit('hidden')
    }
  }
}
</script>

<style lang="scss">
.vue-opti-select-light {
  .dropdown {
    .dropdown-toggle {
      .button-placehoder-filter {
        width: 13px;
        display: inline-block;
        .badge {
          top: -17px;
          right: -4px;
        }
      }
    }
    .dropdown-menu {
      .dropdown-item {
        &.selected, &:active {
          color: #16181b;
          background-color: #eee;
        }
        .option-select {
          pointer-events: none;
        }
      }
    }
  }
}
</style>