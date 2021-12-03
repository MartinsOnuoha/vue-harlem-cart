import { createApp } from 'vue'
import Harlem from '@harlem/core';
import App from './App.vue'
import devtoolsPlugin from '@harlem/plugin-devtools';

createApp(App)
  .use(Harlem, {
    plugins: [
      devtoolsPlugin({
        label: 'Harlem Store'
      })
    ]
  })
  .mount('#app')
