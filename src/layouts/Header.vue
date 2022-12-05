<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Soldout</a>
            <button class="navbad-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportContent" aria-controls="navbarSupportContent"
                aris-expanded="false" arar-label="toggle navgation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportContent">
                <ul class="navbar-nav me-suto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">ProductList</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/detail">ProductDettail</router-link>
                    </li>
                    <li v-if="(user.email!=undefined)" class="nav-item">
                        <router-link class="nav-link" to="/sales">ProductInsert</router-link>
                    </li>
                    <li v-if="(user.email==undefined)">
                        <button class="btn btndanger" type="button" @click="kakaoLogin">KakaoLogin</button>
                    </li>
                    <li v-else>
                        <button class="btn btn-danger" type="button" @click="kakaoLogout">KakaoLogout</button>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        mounted() {
            
        },
        name: 'header',
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            kakaoLogin() {
                window.Kakao.Auth.login({
                    scope: 'profile, account_email, gender',
                    success: this.getProfile
                });
            },
            getProfile(authObj) {
                console.log(authObj);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: res => {
                        const kako_account = res.kakao_acount;
                        console.log(kako_account);
                        this.login(kako_account);
                        alert("success Login");
                    }
                });
            },
            async login(kakao_acount) {
                await this.$api("/api/login", {
                    param: [
                        {email:kakao_account.email, nickname:kakao_account.profile.nickname},
                        {nickname:kako_account.profile.nickname}
                    ]
                });
                this.$store.commit("user", kakao_account);
            },
            kakaoLogout() {
                window.Kakao.Auth.logout((response) => {
                    console.log(response);
                    this.$store.commit("user", {});
                    alert("Logout");
                    this.$router.push({path:'/'});
                });
            }
        }
    }
</script>
