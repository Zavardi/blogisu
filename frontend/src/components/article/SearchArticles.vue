<template>
    <header-layout></header-layout>
    <div class="col-md-5">
        <h4>Поиск статьи по названию</h4>
        <div class="col-md-5">
            <form @submit="searchArticlesByTitle">
                <div class="form-group mb-3">
                    <input type="text" name="title" id="title" placeholder="Заголовок" required v-model="title"
                        class="form-control">
                </div>

                <div class="form-group mb-3">
                    <input type="submit" value="Поиск" class="btn btn-primary"
                        style="border-color: rgb(0, 87, 100); box-shadow: 0 0 5px rgba(0,0,0,0.8);">
                </div>
            </form>
        </div>

        <ul class="search-result list-group mt-3">
            <li v-for="(article, index) in articles" :key="index" class="list-group-item">
                {{ article.lastname }} {{ article.content }} 
            </li>
        </ul>

        <div v-show="noDataFound" class="text-danger">
            Данные, соответствующие параметрам поиска, не найдены
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
import HeaderLayout from '@/layouts/HeaderLayout';
export default {
name: "SearchArticles",
data() {
    return {
        title: "",
        articles: [],
        noDataFound: false
    };

},
components: {
    HeaderLayout
},
methods: {
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
}
};
</script>
<style>
.btn-primary {
--bs-btn-color: #fff;
/* --bs-btn-bg: #0d6efd; */
/* --bs-btn-border-color: #0d6efd; */
--bs-btn-hover-color: #fff;
--bs-btn-hover-bg: #0b5ed7;
--bs-btn-hover-border-color: #0a58ca;
--bs-btn-focus-shadow-rgb: 49, 132, 253;
--bs-btn-active-color: #fff;
--bs-btn-active-bg: #0a58ca;
--bs-btn-active-border-color: #0a53be;
--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
--bs-btn-disabled-color: #fff;
--bs-btn-disabled-bg: #0d6efd;
--bs-btn-disabled-border-color: #0d6efd;
}
</style>