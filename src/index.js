import VueOptiSelectLight from './components/OptiSelectLight';

function install(Vue) {
  Vue.component(VueOptiSelectLight.name, VueOptiSelectLight);
}

const VueOptiSelectLightPlugin = {
  install,
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueOptiSelectLightPlugin);
}

export default VueOptiSelectLightPlugin;
export {
  VueOptiSelectLight
};

