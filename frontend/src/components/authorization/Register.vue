<template>
        <div class="w-auto p-5">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div class="col-md-12">
                    <form name="form" @submit="handleRegister">
                        <h2 class="text-center" style="color: black;">Регистрация пользователя</h2>
                        <div v-if="!successful">
                            <div class="row g-3">
                                <div class="form-group">
                                    <div class="col">
                                        <input type="text" class="form-control" name="lastname" placeholder="Фамилия"
                                            required v-model="user.lastname">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col">
                                        <input type="text" class="form-control" name="firstname" placeholder="Имя" required
                                            v-model="user.firstname">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col">
                                        <input type="text" class="form-control" name="patronymic" placeholder="Отчество"
                                            v-model="user.patronymic">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col">
                                        <input type="date" class="form-control" name="birth_date"
                                            placeholder="Дата рождения" required v-model="user.birth_date">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col">
                                        <input type="text" class="form-control" name="username" placeholder="Логин" required
                                            v-model="user.username" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col">
                                        <input type="password" class="form-control" name="password" placeholder="Пароль"
                                            required v-model="user.password" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="vstack gap-2 col-md-6 mx-auto">
                                        <button class="btn btn-dark">
                                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                            <span>Зарегистрироваться</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>
                        </div>
                        <div class="form-group">
                            <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    name: 'RegisterUser',
    data() {
        return {
            user: {
                username: "",
                password: "",
                lastname: "",
                firstname: "",
                patronymic: "",
                birth_date: new Date()
            },
            successful: false,
            successMessage: '',
            errorMessage: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    mounted() {
        if (this.loggedIn) {
            // Авторизация прошла успешно, переходим к главной странице.
            // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            window.location.href = '/';
        }
    },
    methods: {
        handleRegister(e) {
            e.preventDefault();
            this.successMessage = '';
            this.errorMessage = '';
            this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                .then(data => {
                    this.successMessage = data.message;
                    this.successful = true;
                })
                .catch(e => {
                    this.errorMessage = e.response.data.message;
                });
        }
    }
};
</script>
<style>

</style>