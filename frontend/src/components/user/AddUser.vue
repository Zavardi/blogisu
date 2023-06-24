<template>
        <header-layout></header-layout>
        <div>
            <h4 style="color: aliceblue;">Добавление пользователя</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addUser определён в script-->
                <div class="col-md-5">
                    <form @submit="addUser">
                        <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
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
                            <input type="date" name="birth_date" placeholder="Дата рождения" required
                                v-model="user.birth_date" class="form-control">
                        </div>

                        <div class="form-group mb-3">
                            <select v-model="user.role" required class="form-select">
                                <option> Пользователь </option>
                                <option> Администратор </option>
                            </select>
                        </div>

                        <div class="form-group mb-3">
                            <input type="submit" value="Добавить" class="btn btn-primary">
                                
                        </div>
                    </form>
                </div>
            </div>
            <div v-else>
                <h4 style="color: aliceblue;">Вы успешно добавили запись</h4>
                <div>
                    <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового пользователя"
                Обработчик newUser определён в script-->
                    <button v-on:click="newUser" class="btn btn-success"
                        style="box-shadow: 0 0 5px rgba(0,0,0,0.8); color: rgb(255, 255, 255);">Добавить нового
                        пользователя</button>
                </div>
                <div>
                    <router-link to="/listUsers" class="btn">Вернуться к списку пользователей</router-link>
                </div>
            </div>
        </div>
</template>

<script>
import http from "../../http-common";
import HeaderLayout from '@/layouts/HeaderLayout';
export default {
    name: "AddUser",
    data() {
        return {
            user: {
                lastname: "",
                firstname: "",
                patronymic: "",
                birth_date: new Date(),
                role: ""
            },
            submitted: false
        };
    },
    components: {
        HeaderLayout
    },
    methods: {
        addUser(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                lastname: this.user.lastname,
                firstname: this.user.firstname,
                patronymic: this.user.patronymic,
                birth_date: this.user.birth_date,
                role: this.user.role
            };
            // Либо var data = this.user;
            http
                .post("/addUser", data)
                .then(response => { // запрос выполнился успешно
                    this.user.id = response.data.id;
                })
                .catch(e => { // при выполнении запроса возникли ошибки
                    console.log(e);
                });

            this.submitted = true;
        },
        newUser() {
            this.submitted = false;
            this.user = {
                name: "",
                username: "username",
                password: "password",
                admin: false
            };
        }
    }
}
</script>