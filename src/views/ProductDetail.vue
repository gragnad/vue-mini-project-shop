<template>
    <main class="mt-3">
        <div class="container">

            <div class="row">
                <div class="col-md-5">
                    <div id="carousel-indicators" class="carousel carousel-dark slide"
                        data-bs-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div :class="`carousel-item ${ i==0 ?'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                                <img :src="`/download/${productId}/${pimg.path}`" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                            <span class="carousel-control=prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">{{productDetail.product_name}}</h5>
                            <h5 class="card-title pt-3 pb-3 border-top">{{getCurrencyFormat(productDetail.product_Price)}}won</h5>
                            <p class="card-text border-top pt-3">
                                <span class="badge bg-dark me-1">{{productDetail.category1}}</span>
                                <span class="badge bg-dark me-1">{{productDetail.category2}}</span>
                                <span class="badge bg-dark">{{productDetail.category3}}</span>
                            </p>
                            <p class="card-text pb-3">
                                shippingFee{{getCurrencyFormat(productDetail.delivery_price)}}won | ????????????(?????????) ????????? ?????? {{getCurrencyFormat(productDetail.add_delivery_price)}}??? | ???????????? | {{productDetail.outbound_days}}??? ?????? ?????? (??????,????????? ??????)
                            </p>
                            <div class="card-text border-top pb-3">
                                <div class="row">
                                    <div class="col-auto">
                                        <label class="col-form-label">????????????</label>
                                    </div>
                                    <div class="col-auto">
                                        <div class="input-group">
                                            <span class="input-group-text" style="cursor:pointer;" @click="calcuatePrice(-1);">-</span>
                                            <input type="text" class="form-control" style="width:40px" v-model="total">
                                            <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(1);"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-3 pb-3 border-top">
                                <div class="col-6">
                                    <h3>??? ?????? ??????</h3>
                                </div>
                                <div class="col-6" style="text-align: right;">
                                    <h3>{{getCurrencyFormat(totalPrice)}}won</h3>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="col-6 d-grid p-1">
                                    <button type="button" class="btn btn-lg btn-dark">add cart</button>
                                </div>
                                <div class="col-6 d-frid p-1">
                                    <button type="button" class="btn btn-lg btn-danger">orderder</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <img :src="`/download/${productId}/${productDetail.path}`" class="imf-fluid">
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                productId: 0 ,
                productDetail: {},
                productImage: [],
                total: 1,
                totalPrice: 0
            }
        },
        created() {
            this.productId = this.$route.query.product_id;
            this.getProductDetail();
            this.getProductImage();
        },
        methods: {
            calculatePrice(cnt) {
                let total = this.total + cnt;
                if(total < 1) total = 1;
                this.total = total;
                this.totalPridce = this.productDetail.product_price * this.total;
            },
            getCurrencyFromat(value) {
                return this.$currencyFormat(value);
            },
            async getProductDetail() {
                let productDetail = await this.$api("/api/productDetail", {param:[this.productId]});
                if(productDetail.length > 0) {
                    this.productDetail = productDetail[0];
                    this.totalPrice = this.totalPrice = this.productDetail.product_price * this.total;
                }
                console.log(this.productDetail);
            },
            async getProductImage() {
                this.productImage = await this.$api("/api/productMainImages", {param:[this.productId]});
                conmsole.log('this.productImage', this.productImage)
            }
        }
    }
</script>
