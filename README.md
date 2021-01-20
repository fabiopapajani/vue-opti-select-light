# vue-opti-select-light

## Project setup
```sh
npm install
```

### Compiles and hot-reloads for development
```sh
npm run serve
```

### Compiles and minifies for production
```sh
npm run build-bundle
```

### Lints and fixes files
```sh
npm run lint
```
### Description
Hight performance dropdown.
Tested with 1,000,000 items with lazyRender.

### Props
| Name | Description |
| ------ | ------ |
| value | Key or [Array of keys] |
| selectFirst | Boolean default => FALSE |
| options | [Array of object or Function (Server Side)] |
| uniqueKey | String OR Function(option) => "String", Default "value" |
| labelKey | String OR Function(option) => "String", Default "content" |
| searchable | Boolean default => FALSE |
| searchFields | [Array or Function],  Default [labelKey] |
| searchPlaceholder | String default "Search..." |
| searchNoResultsPlaceholder | String default "No results found..." |
| debounce | Boolean default => FALSE (Search debounce) |
| debounceValue | Number default 250ms |
| groups | [Array of object] |
| groupBoundary | Boolean default => TRUE, Radio button case |
| buttonType | String default "placeholder", options => "filter", "static", "tag" |
| tagLimit | Number default => 50 ( Used when buttonType is "tag" )|
| buttonNoCaret | Boolean default => FALSE |
| buttonBlock | Boolean default => FALSE |
| buttonSize | String default => "sm" |
| optionType | String default "text", options => "radio", "checkbox" |
| buttonPlaceholder | String default "Select Option" |
| buttonPlaceholderAllSelected | String default "" |
| buttonPlaceholderMultiple | Function({ count, suffix })  => `${count} item${suffix} selected` |
| single | Boolean default => FALSE |
| lazy | Boolean default => FALSE |
| lazyRender | Boolean default => FALSE |
| emitOnClick | Boolean default => FALSE |
| disabled | Boolean default => FALSE |
| prevent | Boolean default => FALSE (Prevent from selecting) |

### Slots
| Name | Description |
| ------ | ------ |
| BUTTON_PLACEHOLDER | slot-scope="{ options, option }" |
| TAG | slot-scope="{ option, remove }" |
| TAG_LABEL | slot-scope="{ option }" |
| HEADER | |
| HEADER_2 | Slot after search |
| FOOTER | |
| GROUP | slot-scope="{ group }" |
| GROUP_[name] | slot-scope="{ group }" |
| GROUP_BEFORE_[name] | slot-scope="{ group }" |
| GROUP_AFTER_[name] | slot-scope="{ group }" |
| ITEM | slot-scope="{ option }" |
| ITEM_[name] | slot-scope="{ option }" |
| ITEM_BEFORE_[name] | slot-scope="{ option }" |
| ITEM_AFTER_[name] | slot-scope="{ option }" |
| SEARCH_NO_RESULTS | |

### Events
| Name | Description |
| ------ | ------ |
| @input | Function([Array]) |
| @update | Function([Array]), Exec when updated from v-model |
| @click | Function({Object}, Boolean) |
| @change | Function([Array]), Exec when hidden |
| @shown | Dropdown shown |
| @hidden | Dropdown hidden |

### Methods
| Name | Description |
| ------ | ------ |
| add() | Function(String or [Array of keys]) |
| remove() | Function(String or [Array of keys]) |
| selectAll() | Select All |
| clear() | UnSelect All |
| show() | Open dropdown |
| hide() | Hide dropdown |
| resetOptions() | Reset Server-Side options |

### vee-validate 2.*
| Prop | Description |
| ------ | ------ |
| data-vv-value-path | "$c_model" (optional)|
| data-vv-validate-on | "input\|update"|

```javascript
// Example vee-validate 2.*
<vue-opti-select-light
  :class="[{ 'has-error': $_hasError('field3') === false }, 'w-100']"
  data-vv-as="Campaign Type"
  v-validate="'required'"
  data-vv-validate-on="input|update"
  data-vv-value-path="$c_model"
  name="field3"
  :value="row.field3 && row.field3.to && row.field3.to.value ? row.field3.to.value.key : null"
  @change="(option) => { row.field3.to = option; $_changeFieldTo(row, item); }"
  :options="$c_fieldsToOptions"
  :groups="optionsData.fieldsGroup"
  :unique-key="option => option.value.key"
  label-key="text"
  single
  searchable
  button-block
/>
 ```
#### Todo!
* Lazy Render groups support