<template>
    <div id="Header">
        <nav class="navbar navbar-expand-lg navbar-light mb-3">
            <a class="navbar-brand" href="/">ISU</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">

                    </li>
                </ul>
            </div>
            <form v-if="currentUser" action="/addArticle">
                <button class="btn btn-dark"> <i class="fa-solid fa-pen-to-square"></i>
                    <span>
                        <a> Добавить статью</a>
                    </span>
                </button>
            </form>
            <div>
                <div v-if="currentUser" class="logInOut">
                    <form action="/profile">
                        <button class="btn btn-dark"> <i class="fas fa-user"></i>
                            {{ currentUser.username }}
                        </button>
                        <button class="btn btn-dark"> <i class="fa-solid fa-right-from-bracket"></i>
                            <a @click.prevent="logOut">Выйти</a>
                        </button>
                    </form>
                </div>
                <div v-else class="logInOut">
                    <form action="/login">
                        <button class="btn btn-dark"> <i class="fa-solid fa-right-from-bracket"></i>
                            <a> Войти</a>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>




<script>
export default {
    name: "MainPage",
    data() {
        return {};

    },
    components: {

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>

<style>

.item {
    margin-right: 5px;
}

nav {
    background-color: #212529;

}

.navbar-brand {
    color: rgb(255, 255, 255);
    width: 170px;
    margin-left: 100px;
}

.navbar-light .navbar-brand {
    color: rgb(255, 255, 255);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
    /* Параметры тени */
}

.navbar-nav {

    color: rgb(255, 255, 255);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
    /* Параметры тени */
}

.logInOut {
    margin-right: 10px;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
    /* Параметры тени */
}

A {
    color: rgb(255, 255, 255);
    /* Цвет ссылок */
    text-decoration: none;
}

A:visited {
    color: rgb(0, 0, 0);
    /* Цвет посещенных ссылок */
    text-decoration: none;
}

A:active {
    color: rgb(255, 255, 255);
    /* Цвет активных ссылок */
    text-decoration: none;
}

A:hover {
    color: rgb(255, 0, 0);
    /* Цвет при наведении*/
    text-decoration: none;
}

</style>