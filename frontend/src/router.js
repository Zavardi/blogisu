import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListUsers from "./components/user/ListUsers";
import AddUser from "./components/user/AddUser";
import User from "./components/user/User";
import SearchUsers from "./components/user/SearchUsers";

import ListArticles from "./components/article/ListArticles";
import AddArticle from "./components/article/AddArticle";
import Article from "./components/article/Article";
import SearchArticles from "./components/article/SearchArticles";

import MathCategorie from "./components/categorie/MathCategorie"
import InfCategorie from "./components/categorie/InfCategorie"


import MainPage from "./pages/MainPage";


import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import store from "./store/index";

// определяем маршруты
const routes = [
    {
        path: "/", // указание маршрута, по которому будем переходить к списку пользователей
        name: "Home", // имя маршрута
        component: MainPage, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Главная страница"
        }
    },
    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя"
        }
    },
    {
        path: "/searchUsers",
        name: "search-users",
        component: SearchUsers,
        meta: {
            title: "Поиск пользователей"
        }
    },
    {
        path: "/ListArticles", // указание маршрута, по которому будем переходить к списку пользователей
        name: "articles", // имя маршрута
        alias: "/articles", // указание дополнительного маршрута
        component: ListArticles, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список статей"
        }
    },
    {
        path: "/article/:id",
        name: "article-details",
        component: Article,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные статьи"
        }
    },
    {
        path: "/addArticle",
        name: "add-article",
        component: AddArticle,
        meta: {
            title: "Добавление статьи"
        }
    },
    {
        path: "/searchArticles",
        name: "search-articles",
        component: SearchArticles,
        meta: {
            title: "Поиск статьи"
        }
    },
    {
        path: "/MathCategorie",
        name: "math-categorie",
        component: MathCategorie,
        meta: {
            title: "Категории математики"
        }
    },
    {
        path: "/InfCategorie",
        name: "inf-categorie",
        component: InfCategorie,
        meta: {
            title: "Категории информатики"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({ path: "/login" });
            });
        return next({ path: "/login" });
    }
    return next();
});
export default router;