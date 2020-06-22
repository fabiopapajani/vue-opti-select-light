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
### Props
| Name | Description |
| ------ | ------ |
| default | [Array of keys] |
| selectFirst | Boolean default => FALSE |
| options | [Array of object] |
| uniqueKey | String OR Function(option) => "String" |
| labelKey | String OR Function(option) => "String" |
| searchable | Boolean default => FALSE |
| searchFields | [Array or Function],  Default ['content'] |
| searchPlaceholder | String default "Search..." |
| groups | [Array of object] |
| groupBoundary | Boolean default => TRUE, Radio button case |
| buttonType | String default "placeholder", options => "filter" |
| buttonNoCaret | Boolean default => FALSE |
| buttonBlock | Boolean default => FALSE |
| buttonSize | String default => "sm" |
| optionType | String default "default", options => "radio", "checkbox" |
| buttonPlaceholder | String default "Select Option" |
| buttonPlaceholderAllSelected | String default "" |
| buttonPlaceholderMultiple | Function({ count, suffix })  => `${count} item${suffix} selected` |
| lazy | Boolean default => FALSE |
| emitOnClick | Boolean default => FALSE |

### Slots
| Name | Description |
| ------ | ------ |
| BUTTON_PLACEHOLDER | slot-scope="{ options }" |
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

### Events
| Name | Description |
| ------ | ------ |
| @input | Function([Array]) |
| @click | Function({Object}, Boolean) |
| @change | Function([Array]), Exec when hidden |
| @shown | Dropdown shown |
| @hidden | Dropdown hidden |

### Methods
| Name | Description |
| ------ | ------ |
| add() | Function(String or [Array of keys]) |
| remove() | Function(String or [Array of keys]) |
| clear() | |