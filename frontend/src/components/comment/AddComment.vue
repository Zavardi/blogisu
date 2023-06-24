<template>
    <div>
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-0">
                </div>
                <div class="col-md-12">
                    <div class="card-body">
                        <h4 class="card-title">Добавить комментарий</h4>
                        <div v-if="!submitted">
                            <div class="col-md-10">
                                <form @submit="addComment">
                                    <editor api-key="0fk8j6kavy9si4g9d5hex9bwib18elveradbtcjius05alqm"
                                        v-model="comment.comment_text" :init="{
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
                                        <select v-model="comment.article_id" required class="form-select">
                                            <option disabled value="">Выберите статью</option>
                                            <option v-for="article in articles" :key="article.id" :value="article.id">
                                                {{ article.article_id }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="submit" value="Добавить" class="btn btn-primary">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "AddComment",
    data() {
        return {
            comment: {
                comment_text: "",
                author_id: "",
                article_id: null
            },
            submitted: false,
            articles: []
        };
    },
    components: {
        Editor
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    created() {
        // загрузка списка категорий из API
        http.get("/articles").then(response => {
            this.articles = response.data;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        addComment(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                comment_text: this.comment.comment_text,
                article_id: this.comment.article_id,
                author_id: this.currentUser.id,
            };
            http
                .post("/addComment", data)
                .then(response => { // запрос выполнился успешно
                    this.comment.id = response.data.id;
                })
                .catch(e => { // при выполнении запроса возникли ошибки
                    console.log(e);
                });

            this.submitted = true;
        },
    }
}
</script>