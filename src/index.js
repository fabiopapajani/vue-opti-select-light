import OptiSelectLight from './components/OptiSelectLight';

function install(Vue) {
  Vue.component(OptiSelectLight.name, OptiSelectLight);
}

const OptiSelectLightPlugin = {
  install,
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(OptiSelectLightPlugin);
}

export default OptiSelectLightPlugin;
export {
  OptiSelectLight
};

