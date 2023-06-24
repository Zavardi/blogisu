<template>
    <header-layout></header-layout>
    <side-bar></side-bar>
    <main class="ListArticles" style="overflow: auto;">
        <div class="page-width">
            <div class="page-articles">
                <div v-if="this.article">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-0">
                            </div>
                            <div class="col-md-12">
                                <div class="card-body">
                                    <div v-for="(user, index) in users" :key="index">
                                        <div v-if="user.id === this.article.author_id">
                                            <h4 class="card-title">{{ user.firstname }} {{ user.lastname }}</h4>
                                        </div>
                                    </div>
                                    <h4 class="card-title">{{ this.article.title }}</h4>
                                    <p class="card-text" v-html="this.article.content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ArticleEdit">
                        <form v-if="currentUser.id === this.article.author_id">
                            <div class="form-group mb-3">
                                <button class="btn btn-danger" type="button" data-toggle="collapse" data-target="#footwear"
                                    aria-expanded="false" aria-controls="footwear">Редактировать <i
                                        class="fa-sharp fa-solid fa-wrench"></i>
                                </button>
                            </div>
                            <div class="collapse" id="footwear">
                                <div class="col-md-12">
                                    <form v-if="currentUser.id === this.article.author_id" @submit="updateArticle">
                                        <div class="form-group mb-3">
                                            <input type="text" name="title" placeholder="Заголовок" required
                                                v-model="this.article.title" class="form-control">
                                        </div>
                                        <editor api-key="0fk8j6kavy9si4g9d5hex9bwib18elveradbtcjius05alqm"
                                            v-model="this.article.content" :init="{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink',
                                                    'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | casechange blocks | bold italic backcolor | \
                                                                                                 alignleft aligncenter alignright alignjustify | \
                                                                                                bullist numlst checklist outdent indent | removeformat | a11ycheck code table help | media'
                                            }" initial-value="Welcome to TinyMCE Vue" />
                                        <div class="form-group mb-3">
                                            <input type="submit" value="Обновить" class="btn btn-success">
                                        </div>
                                        <button class="btn btn-danger" v-on:click="deleteArticle()">Удалить <i
                                                class="fa-solid fa-trash"></i> </button>
                                    </form>                                   
                                </div>
                            </div>
                        </form>
                    </div>
                    <comment-box></comment-box>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import './../../dist/css/articleslist.css'
import http from "../../http-common";
import HeaderLayout from '@/layouts/HeaderLayout';
import CommentBox from '@/components/comment/CommentBox.vue';
import SideBar from '@/layouts/SideBar';
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "ArticleDetails",
    props: ['id'], // входные параметры
    data() {
        return {
            article: null,
            users: [],
            author_id: "",
        };
    },
    components: {
        HeaderLayout,
        CommentBox,
        Editor,
        SideBar

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        getArticle() {
            http
                .get("/article/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                .then(response => { // запрос выполнен успешно
                    this.article = response.data;

                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
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
        updateArticle(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                title: this.article.title,
                content: this.article.content,
            };

            http
                .post("/updateArticle/" + this.article.id, data)
                .then(() => {
                    this.$router.push('/listArticles'); // переходим к списку пользователей
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteArticle() {
            http
                .post("/deleteArticle/" + this.article.id)
                .then(() => {
                    // переходим к списку пользователей (переход по ссылкам программно)
                    this.$router.push('/listArticles');
                })
                .catch(e => {
                    console.log(e);
                });
        }

    },
    mounted() { // загружаем данные пользователя
        this.getArticle();
        this.getUsers();
    }
}
</script>

<style></style>