<template>
    <div class="login-menu">
        <div class="rounded">
            <div class="card-body">
                <form name="form" @submit="handleLogin">
                    <h2 class="text-center" style="color: black;">Войти в систему</h2>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username" required />
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required />
                    </div>
                    <div class="">
                        <router-link to="/">
                          Вернуться на главную
                        </router-link>
                    </div>
                    <div class="row row-cols-2">
                        <button class="btn btn-dark">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <div class="col">Войти</div>
                        </button>
                        <form action="/register">
                            <button class="btn btn-dark">
                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                <div class="col">Зарегистрироваться</div>
                            </button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'LoginUser',
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
            loading: false,
            message: ''
        };
    },
    computed: { // вычисляемые свойства
        loggedIn() {
            return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
        }
    },
    created() {
        if (this.loggedIn) {
            // Авторизация прошла успешно, переходим к главной странице.
            // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            window.location.href = '/';
        }
    },
    methods: {
        handleLogin(e) {
            e.preventDefault();
            this.loading = true;
            this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                .then(() => {
                    window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                })
                .catch(e => {
                    this.loading = false;
                    this.message = e.response.data.message;
                }
                );
        }
    }
};
</script>

<style>
.login-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
}

.rounded {
    background: white;
    position: fixed;
    padding: 50px;
    top: 25%;
    left: 35%;
    width: 25%;
    text-align: left;
}
</style>
