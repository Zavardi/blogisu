<template>
      <header-layout></header-layout>
      <side-bar>
        </side-bar>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{currentUser.name}}</strong>
            </h3>
        </header>
        <p>
            <strong>Id:</strong>
            {{currentUser.id}}
        </p>
        <p>
            <strong>Логин:</strong>
            {{currentUser.username}}
        </p>
        <p>
            <strong>ФИО:</strong>
            {{currentUser.lastname}} {{currentUser.firstname}} {{currentUser.patronymic}}
        </p>
        <p>
            <strong>Дата рождения:</strong>
            {{$moment(currentUser.birth_date).format("DD.MM.YYYY")}}
        </p>
        <p>
            <strong>Роль:</strong>
            {{currentUser.role}}
        </p>
        <div class="mb-3">
  <label for="formFile" class="form-label">Пример ввода файла по умолчанию</label>
  <input class="form-control" type="file" id="formFile">
</div>
    </div>



</template>
<script>
import HeaderLayout from '@/layouts/HeaderLayout';
import SideBar from '@/layouts/SideBar';
    export default {
        name: 'ProfileUser',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        components:{
            HeaderLayout,
            SideBar
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        }
    };
</script>

<style>
.container{
    color: aliceblue;
    position: fixed;
    top: 56px;
    left: 310px;
    bottom: 0;
    width: auto;

}
</style>