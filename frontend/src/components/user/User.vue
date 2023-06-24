<template>
        <header-layout></header-layout>
        <div v-if="this.user">
            <h4>Пользователь</h4>
            <div class="col-md-5">
                <form @submit="updateUser">

                    <div class="form-group mb-3">
                        <input type="text" name="lastname" placeholder="Фамилия" required v-model="user.lastname"
                            class="form-control">
                    </div>

                    <div class="form-group mb-3">
                        <input type="text" name="firstname" placeholder="Имя" required v-model="user.firstname"
                            class="form-control">
                    </div>

                    <div class="form-group mb-3">
                        <input type="text" name="patronymic" placeholder="Отчество" v-model="user.patronymic"
                            class="form-control">
                    </div>

                    <div class="form-group mb-3">
                        <input type="date" name="birth_date" placeholder="Дата рождения" v-model="user.birth_date"
                            class="form-control">
                    </div>

                    <div class="form-group mb-3">
                        <select v-model="user.role" class="form-select">
                            <option> Пользователь </option>
                            <option> Администратор </option>
                        </select>
                    </div>

                    <div class="form-group mb-3">
                        <input type="submit" value="Обновить" class="btn btn-success">
                    </div>
                </form>
            </div>
            <button class="btn btn-danger" v-on:click="deleteUser()">Удалить</button>
        </div>
        <div v-else>
            <p>Выберите пользователя</p>
        </div>
</template>

<script>
import http from "../../http-common";
import HeaderLayout from '@/layouts/HeaderLayout';
export default {
    name: "UserDetails",
    props: ['id'], // входные параметры
    data() {
        return {
            user: null
        };
    },
    components: {
        HeaderLayout
    },
    methods: {
        getUser() {
            http
                .get("/user/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                .then(response => { // запрос выполнен успешно
                    this.user = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        },
        updateUser(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                lastname: this.user.lastname,
                firstname: this.user.firstname,
                patronymic: this.user.patronymic,
                birth_date: this.user.birth_date,
                role: this.user.role
            };

            http
                .post("/updateUser/" + this.user.id, data)
                .then(() => {
                    this.$router.push('/listUsers'); // переходим к списку пользователей
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteUser() {
            http
                .post("/deleteUser/" + this.user.id)
                .then(() => {
                    // переходим к списку пользователей (переход по ссылкам программно)
                    this.$router.push('/listUsers');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() { // загружаем данные пользователя
        this.getUser();
    }
}
</script>