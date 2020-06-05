<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-3">
        <h4>Simple single select</h4>
        <vue-opti-select-light 
          v-model="models.simpleSelect"
          :options="options.items">
          <template #ITEM="{ content }">
            {{content}}
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
          { value: 'c', content: 'C', optionalData: { fn: () => 'testC' } },
          { value: 'd', content: 'D', optionalData: { fn: () => 'testD' } }
        ]
      }
    }
  }
}
</script>