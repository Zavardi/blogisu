import { createApp } from 'vue' // Импорт метода для создания приложения
import App from './App.vue' // Импорт главного компонента
import router from './router' // Маршрутизация
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App); // Создание экземпляра приложения
app.use(router); // Подключение маршрутизации

import store from './store'
app.use(store); 

import moment from 'moment'
moment.locale('ru');
app.config.globalProperties.$moment = moment;

app.mount('#app'); // Привязка экземпляра приложения к странице HTML (находится в public)



