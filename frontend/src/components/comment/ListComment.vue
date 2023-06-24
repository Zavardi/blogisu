<template>
  <div>
    <div v-for="(comment, commentIndex) in filteredComments" :key="commentIndex">
      <div class="card mb-3">
        <div class="card-header">
          <p> Комментарий</p>
          <form v-if="currentUser.id === comment.author_id">
            <button class="btn btn-danger" @click="deleteComment(comment)" style="position:relative; left:85% ; top:-30px;">
              Удалить <i class="fa-solid fa-trash"></i>
            </button>
          </form>
        </div>
        <div class="col-md-12">
          <div class="card-body">
            <div v-for="(user, userIndex) in users" :key="userIndex">
              <div v-if="user.id === comment.author_id">
                <h4 class="card-title">{{ user.firstname }} {{ user.lastname }}</h4>
              </div>
            </div>
            <p class="card-text" v-html="comment.comment_text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import http from "../../http-common";

export default {
  name: "ListComment",
  data() {
    return {
      users: [],
      comments: [],
      articles: [],
      articleId: null, // Изначальное значение articleId
    };
  },
  computed: {
    filteredComments() {
      if (this.articleId) {
        return this.comments.filter(
          comment => comment.article_id === this.articleId
        );
      } else {
        return this.comments;
      }
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getComments() {
      http
        .get("/comments")
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUsers() {
      http
        .get("/users")
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getArticles() {
      http
        .get("/articles")
        .then(response => {
          this.articles = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateComment(e) {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      var data = {
        comment_text: this.comment.comment_text,
        article_id: this.comment.article_id,
        author_id: this.currentUser.id,
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
    deleteComment(comment) {
      http
        .post("/deleteComment/" + comment.id)
        .then(() => {
          this.$router.go();
        })
        .catch(error => {
          console.log(error);
        });
    },
    setArticleIdFromRoute() {
      const articleId = this.$route.params.id; // Получение articleId из параметров маршрута
      this.articleId = parseInt(articleId); // Преобразование в число, если необходимо
    },
  },
  mounted() {
    this.getComments();
    this.getUsers();
    this.getArticles();
    this.setArticleIdFromRoute(); // Вызов метода для установки articleId из маршрута
  },


};
</script>
  





