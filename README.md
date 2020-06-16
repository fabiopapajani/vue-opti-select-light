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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Props
| Name | Description |
| ------ | ------ |
| default | [Array of keys] |
| options | [Array of object] |
| uniqueKey | String OR Function(option) => "String" |
| labelKey | String OR Function(option) => "String" |
| groups | [Array of object] |
| groupBoundary | Boolean default => TRUE, Radio button case |
| buttonType | String default "placeholder", options => "filter" |
| buttonNoCaret | Boolean default => FALSE |
| optionType | String default "default", options => "radio", "checkbox" |
| buttonPlaceholder | String default "Select Option" |
| lazy | Boolean default => FALSE |
| emitOnClick | Boolean default => FALSE |

### Slots
| Name | Description |
| ------ | ------ |
| BUTTON_PLACEHOLDER | slot-scope="{ options }" |
| HEADER | |
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
| @change | Function({Object}, Boolean) |
| @shown | Dropdown shown |
| @hidden | Dropdown hidden |

### Methods
| Name | Description |
| ------ | ------ |
| add() | Function(String or [Array of keys]) |
| remove() | Function(String or [Array of keys]) |
| clear() | |