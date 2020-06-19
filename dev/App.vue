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
      <div class="col-md-3">
        <h4>Types single select</h4>
        <vue-opti-select-light 
          ref="selectTypes"
          unique-key="id"
          label-key="name"
          v-model="models.typesSelect"
          :options="options.types"
          button-block>
          <!-- <template #BUTTON_PLACEHOLDER="{ options }">
            ☆ <b>Select Options Options Options {{options.length}}</b>
          </template> -->
          <template #ITEM="{ option }">
            #{{option.name}}
          </template>
          <template #ITEM_7="{ option }">
            #-test{{option.name}}
          </template>
        </vue-opti-select-light>
        <pre v-if="models.typesSelect">{{models.typesSelect}}</pre>
      </div>
      <div class="col-md-3">
        <h4>Types multi select</h4>
        <vue-opti-select-light 
          ref="selectTypes"
          unique-key="id"
          label-key="name"
          v-model="models.typesMultiSelect"
          :options="options.types"
          option-type="checkbox"
          button-placeholder="Select accounts"
          button-placeholder-all-selected="All accounts"
          :button-placeholder-multiple="({ count, suffix }) => `${count} account${suffix} selected`"
          @change="$_onChange"
          @click="$_onClick"
          select-first
          button-block>
          <!-- <template #BUTTON_PLACEHOLDER="{ options }">
            ☆ <b>Select Options Options Options {{options.length}}</b>
          </template> -->
          <template #ITEM="{ option }">
            #{{option.name}}
          </template>
          <template #ITEM_7="{ option }">
            #-test{{option.name}}
          </template>
        </vue-opti-select-light>
        <pre v-if="models.typesMultiSelect">{{models.typesMultiSelect}}</pre>
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
        simpleSelect: null,
        typesSelect: [],
        typesMultiSelect: []
      },
      options: {
        items: [
          { value: 'a', content: 'A', optionalData: { fn: () => 'testA' } },
          { value: 'b', content: 'B', optionalData: { fn: () => 'testB' }, disabled: true },
          { value: 'c', content: 'C', optionalData: { fn: () => 'testC' }, inputType: 'radio', inputName: 'ac' },
          { value: 'd', content: 'D', optionalData: { fn: () => 'testD' }, inputType: 'radio', inputName: 'ac' },
          { value: 'e', content: 'E', optionalData: { fn: () => 'testE' }, inputType: 'checkbox' },
          { value: 'f', content: 'F', optionalData: { fn: () => 'testF' }, inputType: 'checkbox' },
          { value: 'g', content: 'G', optionalData: { fn: () => 'testG' }, group: 'ts' },
          { value: 'h', content: 'H', optionalData: { fn: () => 'testH' }, group: 'ts' },
          { value: 'i', content: 'I', optionalData: { fn: () => 'testI' }, group: 'ts' },
          { value: 'j', content: 'J', optionalData: { fn: () => 'testJ' }, group: 'tr' },
          { value: 'xx', content: 'XX', optionalData: { fn: () => 'testXX' }, inputType: 'checkbox' },
          { value: 'k', content: 'K', optionalData: { fn: () => 'testK' }, group: 'tr' },
          { value: 'l', content: 'L', optionalData: { fn: () => 'testL' }, group: 'tr' },
          { value: 'm', content: 'M', optionalData: { fn: () => 'testM' }, group: 'ga' },
          { value: 'n', content: 'N', optionalData: { fn: () => 'testN' }, group: 'ga' },
          { value: 'o', content: 'O', optionalData: { fn: () => 'testO' }, group: 'ga' }
        ],
        types: [
          {
              "id":6,
              "name":"RevContent",
              "timezone":"America/New_York",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"RevContent"
          },
          {
              "id":7,
              "name":"Taboola",
              "timezone":"America/New_York",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Taboola"
          },
          {
              "id":8,
              "name":"ContentAd",
              "timezone":"America/Los_Angeles",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"ContentAd"
          },
          {
              "id":9,
              "name":"Mgid",
              "timezone":"America/Los_Angeles",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Mgid"
          },
          {
              "id":13,
              "name":"Outbrain",
              "timezone":"America/New_York",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Outbrain"
          },
          {
              "id":14,
              "name":"Adskeeper",
              "timezone":"America/Los_Angeles",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Adskeeper"
          },
          {
              "id":15,
              "name":"Yahoo Gemini",
              "timezone":"UTC",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Gemini"
          },
          {
              "id":21,
              "name":"VoluumDSP",
              "timezone":"America/New_York",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"VoluumDSP"
          },
          {
              "id":23,
              "name":"Runative",
              "timezone":"UTC",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"Runative"
          },
          {
              "id":24,
              "name":"ActiveRevenue (beta)",
              "timezone":"UTC",
              "platform":"native",
              "created_at":"2020-01-23T10:18:24.610Z",
              "updated_at":"2020-01-23T10:18:24.610Z",
              "uniqueName":"ActiveRevenue"
          }
        ]
      },
      groups: [
        { value: 'ts', content: 'Traffic Sources', inputType: 'checkbox' },
        { value: 'tr', content: 'Trackers', inputType: 'radio' },
        { value: 'ga', content: 'Google Analytics' },
        { value: 'other', content: 'Other' }
      ]
    }
  },
  created () {
    setTimeout(() => {
      this.$refs.selectTypes.add(14)
    }, 3000)
  },
  methods: {
    $_onChange(values) {
      console.log('@change', values)
    },
    $_onClick(value) {
      console.log('@click', value)
    },
  }
}
</script>