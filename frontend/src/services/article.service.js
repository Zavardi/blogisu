import http from "../http-common";

function getArticleBoard() {
    // Обращаемся к серверу для проверки, авторизован ли пользователь.
    // Не обрабатываем результат, так как ответ полностью возвращаем в метод, из которого вызывается getUserBoard().
    return http.get("/articleBoard");
}

export default {
    getArticleBoard: getArticleBoard
};