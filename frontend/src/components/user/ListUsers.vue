<template>
        <header-layout></header-layout>
        <div>
            <h4 style="color: aliceblue;">Список пользователей</h4>
            <!-- Определение ссылок -->
            <div v-if="displayContent">
                <router-link class="item" to="/addUser"
                    style="border-color: rgb(0, 87, 100); box-shadow: 0 0 5px rgba(0,0,0,0.8); ">Добавить
                    пользователя</router-link>
                <router-link class="item" to="/searchUsers"
                    style="border-color: rgb(0, 87, 100); box-shadow: 0 0 5px rgba(0,0,0,0.8); ">Поиск
                    пользователя</router-link>
            </div>
            <div v-else style="color: aliceblue;">
                Добавление и поиск доступны только авторизованным пользователям
            </div>
            <ul>
                <!-- Вывод списка пользователей -->
                <li v-for="(user, index) in users" :key="index">
                    <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                    <!-- Ссылка на user определена в файле router.js -->
                    <!-- По маршруту user подгружается компонент User.vue -->
                    <!-- в params указываются параметры, которые передаютс компоненту-->
                    <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                    <router-link :to="{
                        name: 'user-details',
                        params: { id: user.id }
                    }">
                        {{ user.lastname }} {{ user.firstname }} {{ user.patronymic }} (дата рождения:
                        {{ $moment(user.birth_date).format("DD.MM.YYYY") }})
                    </router-link>
                </li>
            </ul>
        </div>
</template>

<script>
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
import UserService from '../../services/user.service';
import HeaderLayout from '@/layouts/HeaderLayout';

export default {
    name: "ListUsers", // Имя шаблона
    data() { // данные компонента (определение переменных)
        return {
            users: [],
            displayContent: false // по умолчанию скрываем контент
        };
    },
    components: {
        HeaderLayout
    },
    methods: { // методы компонента
        getUsers() {
            http
                .get("/users") // обращаемся к серверу для получения списка пользователей
                .then(response => { // запрос выполнен успешно
                    this.users = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        }
    },
    mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
        UserService.getUserBoard()
            .then(() => {
                this.displayContent = true;
            })
            .catch(e => {
                this.content =
                    (e.response && e.response.data) ||
                    e.message ||
                    e.toString();
            }
            );
        this.getUsers();
    }
}
</script>


<style>
.item {
    margin-left: 5px;
}

.colorBt {
    color: brown;
}</style>