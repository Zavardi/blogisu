<template>
    <header-layout></header-layout>
    <side-bar></side-bar>
    <div class="addArticle" style="overflow: auto;">
        <h4 style="color: aliceblue;">Добавление статьи</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
        Обработчик addUser определён в script-->
            <div class="col-md-10">
                <form @submit="addArticle">
                    <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                    <div class="form-group mb-3">
                        <select v-model="article.categorie_id" required class="form-select">
                            <option disabled value="">Выберите категорию</option>
                            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
                                {{ categorie.categorie_name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <input type="text" name="title" placeholder="Заголовок" required v-model="article.title"
                            class="form-control">
                    </div>
                    <div class="mb-3">
                        <editor api-key="0fk8j6kavy9si4g9d5hex9bwib18elveradbtcjius05alqm" v-model="article.content"
                         :init="{
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
                                   bullist numlst checklist outdent indent | removeformat | a11ycheck code table help | media | image charmap preview anchor searchreplace '
                        }" initial-value="Welcome to TinyMCE Vue" />

                    </div>
                    <div class="form-group mb-3">
                        <input type="submit" value="Добавить" class="btn btn-success">
                    </div>
                </form>
            </div>
        </div>
        <div v-else>
            <h4 style="color: aliceblue;">Вы успешно добавили запись</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового пользователя"
            Обработчик newUser определён в script-->
                <button v-on:click="newArticle" class="btn btn-success"
                    style="box-shadow: 0 0 5px rgba(0,0,0,0.8); color: rgb(255, 255, 255);">Добавить новую
                    статью</button>
            </div>
            <div>
                <router-link to="/" class="btn">Вернуться к списку статей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
import HeaderLayout from '@/layouts/HeaderLayout';
import SideBar from '@/layouts/SideBar';
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "AddArticle",
    data() {
        return {
            article: {
                title: "",
                content: "",
                categorie_id: null,
                author_id: "",
                categorie_name: ""
            },
            categories: [], // список категорий
            submitted: false
        };
    },
    components: {
        HeaderLayout,
        SideBar,
        'editor': Editor
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    created() {
        // загрузка списка категорий из API
        http.get("/categories").then(response => {
            this.categories = response.data;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        addArticle(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                title: this.article.title,
                content: this.article.content,
                categorie_name: this.article.categorie_name,
                categorie_id: this.article.categorie_id,
                author_id: this.currentUser.id
            };
            // Либо var data = this.user;
            http.post("/addArticle", data).then(response => { // запрос выполнился успешно
                this.article.id = response.data.id;
            })
                .catch(e => { // при выполнении запроса возникли ошибки
                    console.log(e);
                });

            this.submitted = true;
        },
        newArticle() {
            this.submitted = false;
            this.article = {
                title: "",
                content: "",
            };
        }
    }
}
</script>

<style>
.addArticle {
    position: fixed;
    top: 56px;
    left: 310px;
    bottom: 0;
    width: 100%;
}
</style>




