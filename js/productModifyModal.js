/* eslint-disable node/handle-callback-err */
export let productModal = {}

export default {
  props: ['tempProduct', 'apiUrl', 'apiPath', 'isNew'],
  template: /* html */`
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <div class="mb-3">

              <h3>多圖設置</h3>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <template v-for="(img,key) in tempProduct.imagesUrl" :key="key + '21345'">
                  <input type="text" class="form-control" v-model="tempProduct.imagesUrl[key]" placeholder="請輸入圖片連結">
                  <img class="img-fluid" :src="tempProduct.imagesUrl[key]" alt="">
                </template>


                <button v-if="!tempProduct.imagesUrl.length ||tempProduct.imagesUrl[tempProduct.imagesUrl.length-1] "
                  class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                  新增圖片
                </button>
                <button v-else class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                  刪除最後一個圖片
                </button>
              </div>
            </div>

          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" v-model="tempProduct.title" placeholder="請輸入標題">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" v-model="tempProduct.category"
                  placeholder="請輸入分類">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" v-model="tempProduct.unit" placeholder="請輸入單位">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control"
                  v-model.number="tempProduct.origin_price" placeholder="請輸入原價">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control" v-model.number="tempProduct.price"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control" v-model="tempProduct.description"
                placeholder="請輸入產品描述">
            </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control" v-model="tempProduct.content"
                placeholder="請輸入說明內容">
            </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" v-model="tempProduct.is_enabled" type="checkbox"
                  :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>
</div>
  `,
  methods: {
    // 新增 & 編輯產品
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`
      let method = 'post'
      const productData = { data: this.tempProduct }

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      axios[method](url, productData)
        .then((res) => {
          this.$emit('get-products')
          productModal.hide()
          const info = res.data.message
          const errModal = false
          const modalClass = true
          this.$emit('openStatusMessage', info, errModal, modalClass)
        })
        .catch((err) => {
          const info = '發生錯誤'
          const errModal = true
          const modalClass = false
          this.$emit('openStatusMessage', info, errModal, modalClass)
        })
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), { keyboard: false })
  }
}
