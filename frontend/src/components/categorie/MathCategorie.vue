<template>
    <header-layout></header-layout>
    <side-bar></side-bar>
    <main class="ListArticles" style="overflow: auto;">
        <div class="page-width">
            <div class="page-articles">
                <div class="page-top">
                    <div class="card text-center">
                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Все статьи</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/InfCategorie">Информатика</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="true"  href="/MathCategorie">Математика</a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                <form>
                                    <button v-if="currentUser" class="btn btn-dark" type="submit" formaction="/addArticle">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        Добавить статью
                                    </button>
                                </form>
                                <form @submit="searchArticlesByTitle">
                                    <div class="input-group">
                                        <input required v-model="title" type="text" class="form-control"
                                            placeholder="Поиск статьи">
                                        <button class="btn btn-dark" type="submit">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(article, index) in articles" :key="index">
                    <div v-if="article.categorie_id === 1">
                        <div class="card mb-3" style="max-height: 300px; overflow: hidden;">
                            <div class="row g-0">
                                <div class="col-md-0">
                                </div>
                                <div class="col-md-12">
                                    <div class="card-body">
                                        <div class="read-more-button">
                                            <form>
                                                <button class="btn btn-dark" type="submit" @click="goToArticle(article.id)">
                                                    Читать далее
                                                    <i class="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </form>
                                        </div>
                                        <div v-for="(user, index) in users" :key="index">
                                            <div v-if="user.id === article.author_id">
                                                <h4 class="card-title">{{ user.firstname }} {{ user.lastname }}</h4>
                                            </div>
                                        </div>
                                        <h5 class="card-title">{{ article.title }}</h5>
                                        <p class="card-text" v-html="article.content"></p>
                                        <form>
                                            <button class="btn btn-dark" type="submit" @click="goToArticle(article.id)">
                                                Читать далее
                                                <i class="fa-solid fa-arrow-right"></i>                                      
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import './../../dist/css/articleslist.css'
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
import HeaderLayout from '@/layouts/HeaderLayout';
import SideBar from '@/layouts/SideBar';
export default {
    name: "ListArticles", // Имя шаблона
    data() { // данные компонента (определение переменных)
        return {
            title: "",
            noDataFound: false,
            articles: [],
            users: [],
            displayContent: true // по умолчанию скрываем контент
        };
    },
    components: {
        HeaderLayout,
        SideBar
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: { // методы компонента
        getArticles() {
            http
                .get("/articles") // обращаемся к серверу для получения списка пользователей
                .then(response => { // запрос выполнен успешно
                    this.articles = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        },
        goToArticle(articleId) {
      this.$router.push({ name: 'article-details', params: { id: articleId } })
    },
    getUsers() {
            http
                .get("/users") // обращаемся к серверу для получения списка пользователей
                .then(response => { // запрос выполнен успешно
                    this.users = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        },
        searchArticlesByTitle(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            http
                .get("/article/title/" + this.title)
                .then(response => {
                    if (response.data.length > 0) {
                        this.articles = response.data;
                        this.noDataFound = false;
                    }
                    else {
                        this.noDataFound = true;
                    }

                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
        this.getArticles();
        this.getUsers();
    }

}
</script>


<style>
.ListArticles {
    position: fixed;
    top: 56px;
    bottom: 0;
    width: 100%;
}

.read-more-button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>