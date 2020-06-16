<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-3">
        <h4>Simple single select</h4>
        <vue-opti-select-light 
          ref="select"
          v-model="models.simpleSelect"
          :options="options.items"
          :groups="groups"
          button-placeholder="Select"
          button-type="filter"
          :default="['a', 'd', 'c', 'xx']">
          <!-- <template #BUTTON_PLACEHOLDER="{ options }">
            ☆ <b>Select Options Options Options {{options.length}}</b>
          </template> -->
          <!-- <template #ITEM="{ option }">
            <a target="_blank" href="https://google.com">{{option.content}}</a>
          </template> -->
          <template #GROUP="{ group }">
            • {{ group.content }}
          </template>
          <template #GROUP_tr="{ group }">
            ⎔ {{ group.content }}
          </template>
          <template #ITEM_h="{ option }">
            {{ option.content }}
          </template>
          <template #ITEM_AFTER_h>
            <b-dd-divider />
          </template>
          <template #HEADER>
            <b-dd-header>:)</b-dd-header>
          </template>
          <template #FOOTER>
            <b-dd-header>Footer</b-dd-header>
          </template>
        </vue-opti-select-light>
        <pre v-if="models.simpleSelect">{{models.simpleSelect}}</pre>
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueOptiSelectLight from '../src/index';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueOptiSelectLight);

export default {
  name: 'test',
  data () {
    return {
      models: {
        simpleSelect: null
      },
      options: {
        items: [
          { value: 'a', content: 'A', optionalData: { fn: () => 'testA' } },
          { value: 'b', content: 'B', optionalData: { fn: () => 'testB' }, disabled: true },
          { value: 'c', content: 'C', optionalData: { fn: () => 'testC' }, type: 'radio', name: 'ac' },
          { value: 'd', content: 'D', optionalData: { fn: () => 'testD' }, type: 'radio', name: 'ac' },
          { value: 'e', content: 'E', optionalData: { fn: () => 'testE' }, type: 'checkbox' },
          { value: 'f', content: 'F', optionalData: { fn: () => 'testF' }, type: 'checkbox' },
          { value: 'g', content: 'G', optionalData: { fn: () => 'testG' }, group: 'ts' },
          { value: 'h', content: 'H', optionalData: { fn: () => 'testH' }, group: 'ts' },
          { value: 'i', content: 'I', optionalData: { fn: () => 'testI' }, group: 'ts' },
          { value: 'j', content: 'J', optionalData: { fn: () => 'testJ' }, group: 'tr' },
          { value: 'xx', content: 'XX', optionalData: { fn: () => 'testXX' }, type: 'checkbox' },
          { value: 'k', content: 'K', optionalData: { fn: () => 'testK' }, group: 'tr' },
          { value: 'l', content: 'L', optionalData: { fn: () => 'testL' }, group: 'tr' },
          { value: 'm', content: 'M', optionalData: { fn: () => 'testM' }, group: 'ga' },
          { value: 'n', content: 'N', optionalData: { fn: () => 'testN' }, group: 'ga' },
          { value: 'o', content: 'O', optionalData: { fn: () => 'testO' }, group: 'ga' }
        ]
      },
      groups: [
        { value: 'ts', content: 'Traffic Sources', type: 'checkbox' },
        { value: 'tr', content: 'Trackers', type: 'radio' },
        { value: 'ga', content: 'Google Analytics' },
        { value: 'other', content: 'Other' }
      ]
    }
  },
  created () {
    // setTimeout(() => {
    //   this.$refs.select.remove('a')
    // }, 3000)
  }
}
</script>