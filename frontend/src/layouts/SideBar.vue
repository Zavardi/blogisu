<template>
  <div class="sidebar" style="overflow: auto;">
    <div class="sidebar-header">
      <form action="/">
        <button class="btn btn-dark"><i class="fas fa-home"></i>
          <span>
            <a> Главная</a>
          </span>
        </button>
      </form>
      <!-- <form action="/profile">
        <button class="btn btn-dark"> <i class="fas fa-paper-plane"></i>
          <span>
            <a> Тренды</a>
          </span>
        </button>
      </form>
      <form action="/profile">
        <button class="btn btn-dark"><i class="fas fa-user"></i>
          <span>
            <a> Подписки</a>
          </span>
        </button>
      </form>
      <form action="/profile">
        <button class="btn btn-dark"><i class="fas fa-table"></i>
          <span>
            <a> Категории</a>
          </span>
        </button>
      </form> -->
    </div>
    <hr style="color:aliceblue">
    <div class="sidebar-content">
      <div class="acor-container">
        <input type="checkbox" name="chacor" id="chacor1" />
        <label for="chacor1"><i class="fas fa-laptop"></i> Информатика</label>
        <div class="acor-body">
          <span v-for="(article, index) in articles" :key="index">
            <button class="btn btn-dark" v-if="article.categorie_id === 2" @click="goToArticle(article.id)">
              <p>
                {{ article.title }}
              </p>
            </button>
          </span>
        </div>
        <input type="checkbox" name="chacor" id="chacor2" />
        <label for="chacor2"><i class="fas fa-ruler"></i> Математика</label>
        <div class="acor-body">
          <span v-for="(article, index) in articles" :key="index">
            <button class="btn btn-dark" v-if="article.categorie_id === 1" @click="goToArticle(article.id)">
              <p>
                {{ article.title }}
              </p>
            </button>
          </span>
        </div>
      </div>
    </div>
    <hr style="color:aliceblue">
    <div class="sidebar-footer">
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
      <h3>Footer</h3>
    </div>
  </div>
</template>

<script>
import '../dist/css/sidebars.css'
import '../dist/js/sidebars.js'
import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

export default {
  name: "SideBar", // Имя шаблона
  data() { // данные компонента (определение переменных)
    return {
      articles: [],
      displayContent: true // по умолчанию скрываем контент
    };
  },
  components: {

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
    }
  },
  mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
    this.getArticles();
  }
}
</script>
<style>
.btn{
  white-space: normal;
}
</style>




