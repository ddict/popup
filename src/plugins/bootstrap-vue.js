import Vue from 'vue';

import {
  BootstrapVue,
  BIcon,
  BIconArrowLeftRight,
  BIconXCircle,
  BIconVolumeUp,
  BIconStopCircle,
  BIconArrowsExpand,
  BIconArrowsCollapse,
} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.component('BIcon', BIcon);
Vue.component('BIconArrowLeftRight', BIconArrowLeftRight);
Vue.component('BIconXCircle', BIconXCircle);
Vue.component('BIconVolumeUp', BIconVolumeUp);
Vue.component('BIconStopCircle', BIconStopCircle);
Vue.component('BIconArrowsExpand', BIconArrowsExpand);
Vue.component('BIconArrowsCollapse', BIconArrowsCollapse);
