<template>
  <div :class="[{ 'empty': $c_model.length === 0, 'allSelected': $c_allSelected, 'disabled': disabled }, 'vue-opti-select-light']">
    <b-dd :lazy="lazy" :disabled="disabled" ref="dd-light" :block="buttonBlock"  :size="buttonSize" :no-caret="$c_buttonNoCaret" @shown="$_shown" @hidden="$_hidden" :class="`btn-type-${buttonType}`">
      <template #button-content>
        <slot v-if="$_slot('BUTTON_PLACEHOLDER')" name="BUTTON_PLACEHOLDER" :options="$c_model" :option="single ? $c_model[0] || null : null" :allSelected="$c_allSelected"></slot>
        <span v-else-if="buttonType === 'filter'" class="button-placehoder-filter">
          <i class="fa fa-filter"></i><b-badge v-show="$c_model.length" pill variant="info">{{$c_model.length}}</b-badge>
        </span>
        <span v-else-if="buttonType === 'tag' && $c_modelTag.length" class="button-placehoder-tag">
          <template v-for="(option) in $c_modelTag">
            <slot v-if="$_slot('TAG')" name="TAG" :option="option" :remove="() => $_removeTag($_optionKey(option))"></slot>
            <span v-else :key="`tag-${$_optionKey(option)}`" class="tag-item">
              <span class="tag-name p-2" v-if="$_slot('TAG_LABEL')">
                <slot name="TAG_LABEL" :option="option"></slot>
              </span>
              <span v-else class="tag-name p-2" v-html="$_optionLabel(option)"></span>
              <span class="tag-remove p-1" @click.stop="$_removeTag($_optionKey(option))" title="Remove">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 9" stroke="#546582" stroke-width="2" stroke-linecap="round"/><path d="M9 1L1 9" stroke="#546582" stroke-width="2" stroke-linecap="round"/></svg>
              </span>
            </span>
          </template>
          <template v-if="$c_model.length > tagLimit">
            <span class="tag-toggle show-all" v-if="$c_model.length > $c_modelTag.length" @click.stop="showAllTags = true">Show all ({{ $c_model.length - tagLimit }} more)</span>
            <span class="tag-toggle show-less" v-else  @click.stop="showAllTags = false">Show less</span>
          </template>
        </span>
        <span v-else-if="buttonType === 'static' || !$c_model.length" class="button-placehoder-static" v-html="buttonPlaceholder"></span>
        <span v-else-if="buttonPlaceholderAllSelected && $c_allSelected && $c_model.length > 1" v-html="buttonPlaceholderAllSelected"></span>
        <span v-else class="button-placehoder-selected">
          <template v-if="$c_oneOptionSelectedLocal">
            <slot v-if="$_slot(`ITEM_${$c_oneOptionSelectedLocal.private.key}`)" :name="`ITEM_${$c_oneOptionSelectedLocal.private.key}`" :option="$_originalOption($c_oneOptionSelectedLocal.private.key)"></slot>
            <slot v-else-if="$_slot('ITEM')" name="ITEM" :option="$_originalOption($c_oneOptionSelectedLocal.private.key)"></slot>
            <span v-else v-html="$c_oneOptionSelectedLocal.private.label"></span>
          </template>
          <template v-else>
            {{buttonPlaceholderMultiple({ count: $c_model.length, suffix: $c_model.length > 1 ? 's' : '' })}}
          </template>
        </span>
      </template>
      <slot v-if="$_slot('HEADER')" name="HEADER"></slot>
      <b-dd-header v-if="searchable" class="search-container">
        <input ref="dd-light-search" type="text" v-model="$c_searchModel" :placeholder="searchPlaceholder" />
        <span v-show="$c_searchModel.length" @click="$_clearSearch" class="btn-clear-search">x</span>
      </b-dd-header>
      <slot v-if="$_slot('HEADER_2')" name="HEADER_2"></slot>
      <div class="options-list">
        <template v-for="(groupedOptions, i) in $c_localSearchableOptions">
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
              <label role="menuitem" :class="[{ 'disabled': !!option.disabled, 'selected': (selected[option.private.key] || selected[option.inputName] === option.private.key) }, `dropdown-item dropdown-item-${option.inputType || 'text'} m-0`]" :key="`option-${i}-${j}`" @click="$_selectItem(option)">
                <div class="option-select pull-left mr-2" v-if="option.inputType">
                  <input v-if="option.inputType === 'checkbox'" type="checkbox" :true-value="true" :false-value="false" v-model="selected[option.private.key]" @click="$_clickInput" />
                  <input v-else-if="option.inputType === 'radio'" type="radio" :value="option.private.key" :name="option.inputName" v-model="selected[option.inputName]" @click="$_clickInput">
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
      </div>
      <template v-if="$c_searchModel.length && $c_localSearchableOptions.length === 0">
        <slot v-if="$_slot('SEARCH_NO_RESULTS')" name="SEARCH_NO_RESULTS"></slot>
        <div v-else class="search-no-results" v-html="searchNoResultsPlaceholder"></div>
      </template>
      <slot v-if="$_slot('FOOTER')" name="FOOTER"></slot>
    </b-dd>
  </div>
</template>

<script>
import hash from 'object-hash';
import _ from 'lodash';

export default {
  name: 'vue-opti-select-light',
  props: {
    valueModel: { type: [Array, Object, null], default: () => [] },
    value: { default: () => [] },
    selectFirst: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    uniqueKey: { type: [String, Function], default: 'value' },
    labelKey: { type: [String, Function], default: 'content' },
    searchable: { type: Boolean, default: false },
    searchFields: { type: [Array, Function, null], default: () => null },
    searchPlaceholder: { type: String, default: 'Search...' },
    searchNoResultsPlaceholder: { type: String, default: 'No results found...' },
    debounce: { type: Boolean, default: false },
    debounceValue: { type: Number, default: 250 },
    groups: { type: Array, default: () => [] }, // Groups options
    groupBoundary: { type: Boolean, default: true }, // Boundary when radio buttons
    buttonType: { type: String, default: 'placeholder' },
    tagLimit: { type: Number, default: 50 },
    buttonNoCaret: { type: Boolean, default: false },
    buttonBlock: { type: Boolean, default: false },
    buttonSize: { type: String, default: 'sm' },
    optionType: { type: String, default: 'text' },
    buttonPlaceholder: { type: String, default: 'Select Option' },
    buttonPlaceholderAllSelected: { type: String, default: '' },
    buttonPlaceholderMultiple: { type: Function, default: ({ count, suffix }) => `${count} item${suffix} selected` },
    single: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    emitOnClick: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    prevent: { type: Boolean, default: false },
    
  },
  model: {
    prop: 'valueModel',
    event: 'input',
  },
  data () {
    return {
      selected: {}, // Internal usage
      selectedMap: {}, // Mapped Internal model
      searchModel: '',
      touched: false, // True when has touched (has changes)
      modelHash: null,
      valueHash: null,
      showAllTags: false, // Used only in tag mode
    }
  },
  created () {
    /*********** Set Default Hash ***********/
    this.modelHash = this.$_hashModel()
    this.valueHash = hash.MD5(this.value);
    /****************************************/

    /********** Set Default Values **********/
    // Single select support v-model
    const model = this.$_getValueModelPayload(this.valueModel)
    if (typeof this.value !== 'undefined' && !(Array.isArray(this.value) && this.value.length === 0)) {
      // Set Default From Values
      this.add(this.value)
    } else if (model.length) {
      // Set Default From v-model
      this.$_setFromModel(this.valueModel)
    } else if (this.selectFirst) {
      // Set Default First Option
      const key = this.$_optionKey(this.$c_options.array[0])
      this.add(key)
    }
    /****************************************/

    /************ Value Watchers ************/
    // Smart Watch v-model change
    this.$watch('valueModel', (val) => {
      this.$_setFromModel(val)
    })
    // Smart Watch value change
    this.$watch('value', (val) => {
      const valueHash = hash.MD5(val);
      if (valueHash !== this.valueHash) {
        this.valueHash = valueHash;
        this.$_clear()
        this.add(val)
      }
    })
    /****************************************/

    /*********** Debounced Search ***********/
    if (this.debounce) {
      this.$options.debounceSetSearchFunction = _.debounce((value) => {
        this.searchModel = value
      }, this.debounceValue)
    }
    /****************************************/

    /********** Tag mode visibility *********/
    if (this.buttonType === 'tag') {
      // Reset "Show less" => "Show all"
      this.$watch('$c_modelTag', (items) => {
        if (this.showAllTags && items.length <= this.tagLimit) {
          this.showAllTags = false;
        }
      })
    }
    /****************************************/
  },
  mounted () {
    /**** Observe Dropdown Menu Height ******/
    const dd = this.$refs['dd-light'];
    const ddMenuEl = dd.$el.getElementsByClassName('dropdown-menu')[0];
    const ddMenuObservator = new ResizeObserver(entries => {
      const [ddMenu] = entries;
      if (ddMenu && ddMenu.target) {
        const isHidden = ddMenu.target.offsetParent === null;
        if (!isHidden) {
          // Update b-dd Popper.js
          dd.updatePopper();
          // console.log('Update Popper.js');
        }
      }
    });
    ddMenuObservator.observe(ddMenuEl);
    /****************************************/
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
        if (option.inputType) {
          // Option
          if (option.inputType === 'radio') {
            option.inputName = this.$_radioName(option.inputName || 'global')
          }
        } else if (computedOptions.groupsMap[option.group] && computedOptions.groupsMap[option.group].inputType) {
          // Group
          const group = computedOptions.groupsMap[option.group]
          option.inputType = group.inputType
          if (option.inputType === 'radio') {
            option.inputName = this.groupBoundary ? this.$_radioName(group.value) : this.$_radioName('global')
          }
        } else if (this.optionType !== 'text') {
          // Prop
          if (this.optionType === 'checkbox') {
            option.inputType = 'checkbox'
          } else if (this.optionType === 'radio') {
            option.inputType = 'radio'
            option.inputName = this.$_radioName('global')
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

        // Add Search Pattern
        if (this.searchable) option.private.searchPattern = this.$_getSearchPattern(option, computedOptions.groupsMap[option.group])

        computedOptions.map[key] = option
      })
      return computedOptions
    },
    $c_localSearchableOptions () {
      const searchValue = this.$c_searchModel.trim().toLowerCase()
      if (this.searchable && searchValue) {
        const options = []
        this.$c_localOptions.array.forEach(item => {
          const filteredOptions = item.options.filter(option => option.private.searchPattern.includes(searchValue))
          if (filteredOptions.length) {
            options.push(Object.assign({}, item, { options: filteredOptions }))
          }
        })
        return options
      } else {
        return this.$c_localOptions.array
      }
    },
    $c_model () {
      return Object.values(this.selectedMap)
    },
    $c_buttonNoCaret () {
      return this.buttonNoCaret || this.buttonType === 'filter'
    },
    $c_oneOptionSelectedLocal () {
      if (this.$c_model.length === 1) {
        const key = this.$_optionKey(this.$c_model[0])
        return this.$c_localOptions.map[key]
      }
      return null;
    },
    $c_allSelected () {
      return this.$c_model.length === this.$c_options.array.length
    },
    $c_searchModel: {
      get () {
        return this.searchModel
      },
      set (value) {
        if (this.$options.debounceSetSearchFunction) {
          // Debounce set value
          this.$options.debounceSetSearchFunction(value)
        } else {
          this.searchModel = value
        }
      }
    },
    // Used only in tag mode !
    $c_modelTag() {
      if (this.buttonType === 'tag') {
        return !this.showAllTags && this.$c_model.length > this.tagLimit ? this.$c_model.slice(0, this.tagLimit) : this.$c_model
      } else {
        return this.$c_model
      }
    },
  },
  methods: {
    add (value) {
      if (typeof value !== 'undefined') {
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
          } else if (this.selected[option.inputName] === option.private.key) {
            this.$delete(this.selected, option.inputName)
            this.$delete(this.selectedMap, option.inputName)
          }
        })
        this.$_emit()
      }
    },
    selectAll () {
      if (!this.$c_allSelected) {
        const allOptions = Object.values(this.$c_localOptions.map)
        if (allOptions.length) {
          allOptions.forEach(option => {
            this.$_setItem(option)
          })
          this.$_emit()
        }
      }
    },
    clear () {
      this.$_clear()
      this.$_emit()
    },
    show () {
      this.$refs['dd-light'].show()
    },
    hide () {
      this.$refs['dd-light'].hide()
    },
    $_clear () {
      this.selected = {}
      this.selectedMap = {}
    },
    $_optionKey (option) {
      return typeof this.uniqueKey === 'function' ? this.uniqueKey(option) : option[this.uniqueKey]
    },
    $_optionLabel (option) {
      return typeof this.labelKey === 'function' ? this.labelKey(option) : option[this.labelKey]
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
      if (!this.prevent) this.$_setItem(option, true, true)
      if (!option.inputType && this.$refs['dd-light']) this.$refs['dd-light'].hide() // Close Dropdown on select
      if (!this.prevent) {
        if (!this.touched) this.touched = true
        if (this.emitOnClick) this.$_emit()
      } else {
        this.$emit('click', this.$_originalOption(option.private.key), true)
      }
    },
    $_setItem (option, trigger = false, toggle = false) {
      if (this.single || !option.inputType) {
        // If not define type or single select
        this.selected = {}
        this.$set(this.selected, option.private.key, true)
        this.selectedMap = {}
        this.$set(this.selectedMap, option.private.key, this.$_originalOption(option.private.key))
        if (trigger) this.$emit('click', this.$_originalOption(option.private.key), true)
      } else if (option.inputType === 'checkbox') {
        if (!this.selected[option.private.key]) {
          this.$set(this.selected, option.private.key, true)
          this.$set(this.selectedMap, option.private.key, this.$_originalOption(option.private.key))
          if (trigger) this.$emit('click', this.$_originalOption(option.private.key), true)
        } else if (toggle) {
          this.$delete(this.selected, option.private.key)
          this.$delete(this.selectedMap, option.private.key)
          if (trigger) this.$emit('click', this.$_originalOption(option.private.key), false)
        }
      } else if (option.inputType === 'radio') {
        this.$set(this.selected, option.inputName, option.private.key)
        this.$set(this.selectedMap, option.inputName, this.$_originalOption(option.private.key))
        if (trigger) this.$emit('click', this.$_originalOption(option.private.key), true)
      }
    },
    $_clickInput () {
      event.stopPropagation()
      event.preventDefault()
      event.stopImmediatePropagation()
      return false
    },
    $_removeTag (value) {
      this.remove(value)
      const data = this.$_getModelPayload();
      this.$emit('change', data);
    },
    $_emit () {
      const data = this.$_getModelPayload()
      this.modelHash = this.$_hashModel(data);
      this.$emit('input', data);
    },
    $_shown () {
      this.touched = false
      if (this.searchable) this.$refs['dd-light-search'].focus()
      this.$emit('shown')
    },
    $_hidden () {
      if (!this.emitOnClick && this.touched) this.$_emit()
      const data = this.$_getModelPayload()
      if (this.touched) this.$emit('change', data)
      if (this.searchModel) this.searchModel = ''
      this.$emit('hidden')
    },
    $_getSearchPattern (option, group) {
      if (this.searchable) {
        // Set default LabelKey if not defined
        const searchFields = this.searchFields ||  (typeof this.labelKey === 'function' ? this.labelKey: [this.labelKey] )
        let values = []
        if (Array.isArray(searchFields)) {
          searchFields.forEach(_key => {
            try {
              values.push(option[_key])
            } catch (err) { /** DO NOTHING */ }
          })
        } else {
          values = searchFields(option)
        }
        // Make group searchable
        if (group && group.content) values.push(group.content)

        return values.join('§§').toLowerCase()
      }
      return null
    },
    $_clearSearch () {
      this.searchModel = ''
    },
    $_setFromModel (val) {
      const valueMd5 = this.$_hashModel(val);
      // v-model change from outside
      if (valueMd5 !== this.modelHash) {
        // Clear
        this.$_clear()
        // Set from v-model
        const value = this.$_getValueModelPayload(val)
        value.forEach(option => {
          const key = this.$_optionKey(option)
          if (this.$c_localOptions.map[key]) this.$_setItem(this.$c_localOptions.map[key])
        })
        // Update Model Hash
        const data = this.$_getModelPayload();
        this.modelHash = this.$_hashModel(data);
        this.$emit('update', data);
      }
    },
    $_hashModel (val) {
      // Map null or undefined value as [] hash
      return hash.MD5(val || [])
    },
    $_getModelPayload () {
      return this.single ? this.$c_model[0] || null : this.$c_model
    },
    $_getValueModelPayload (val) {
      // Map null or {} as [] or [{}]
      let value = val || []
      if (!Array.isArray(value)) value = [value]
      return value
    }
  }
}
</script>

<style lang="scss">
.vue-opti-select-light {
  .dropdown {
    &.btn-type-tag {
      .tag-item {
        margin: 0px 5px 5px 0px;
        border: 1px solid;
        display: block;
        float: left;
      }
      .tag-toggle {
        margin: 0px 5px 5px 0px;
        float: left;
        cursor: pointer;
      }
    }
    .dropdown-toggle {
      .button-placehoder-filter {
        width: 13px;
        display: inline-block;
        position: relative;
        .badge {
          top: -14px;
          right: -20px;
          line-height: 13px;
          position: absolute;
        }
      }
      &.btn-block {
        &+ .dropdown-menu {
          width: 100%;
        }
      }
    }
    .dropdown-menu {
      .search-container {
        header {
          position: relative;
          .btn-clear-search {
            position: absolute;
            right: 29px;
            top: 9px;
            font-size: 15px;
            font-weight: bold;
            color: #6c757d;
            cursor: pointer;
          }
        }
      }
      .options-list {
        max-height: 400px;
        overflow-y: auto;
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
}
</style>