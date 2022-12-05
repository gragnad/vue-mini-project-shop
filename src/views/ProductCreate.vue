<template>
    <main class="mt-3">
      <div class="container">
        <h2 class="text-center">제품 등록</h2>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">제품명</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="product.product_name">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">제품가격</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="product.product_price">
              <span class="input-group-text">원</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">배송비</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="product.delivery_price">
              <span class="input-group-text">원</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="product.add_delivery_price">
              <span class="input-group-text">원</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">제품카테고리</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-auto">
                <select class="form-select" v-model="cate1" @change="changeCategory1">
                  <option :value="cate" :key=i v-for="(cate,i) in category1">{{cate}}</option>
                </select>
              </div>
              <div class="col-auto">
                <select class="form-select" v-model="cate2" @change="changeCategory2">
                  <option :value="cate" :key=i v-for="(cate,i) in category2">{{cate}}</option>
                </select>
              </div>
              <div class="col-auto">
                <select class="form-select" v-model="cate3">
                  <option :value="cate" :key=i v-for="(cate,i) in category3">{{cate}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">태그</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="product.tags">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">출고일</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="product.outbound_days">
              <span class="input-group-text">일 이내 출고</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
          </div>
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-danger" @click="productInsert">저장하기</button>
          </div>
        </div>
      </div>
    </main>
</template>
<script>
    export default {
        data() {
            return {
                product: {
                    product_name: "",
                    product_price: 0,
                    delivery_price: 0,
                    add_deliveey_price: 0,
                    tags: "",
                    outbound_days: 0,
                    category_id: 1,
                    saller_id: 1
                },
                categoryList: [],
                category1: [],
                category2: [],
                category3: [],
                cate1: "",
                cate2: "",
                cate3: ""
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.getCategoryList();
        },
        mounted() {
            if(this.user.email == undefined) {
                alert("로그인을 해야 이용할 수 있습니다.");
                this.$router.push({path:'/'});
            }
        },
        method: {
            goToList() {
                this.$router.push({path:'/slaes'});
            },
            async getCategoryList() {
                let categoryList = await this.$api("/api/categoryList", {});
                this.categoryList = categoryList;

                let oCategory = {};
                categoryList.forEach(item => {
                    oCategory[item.category1] = item.id;
                });

                let category1 = [];
                for(let key in oCategory) {
                    category1.push(key);
                }

                this.category1 = category1;
            }
        }
    }
</script>