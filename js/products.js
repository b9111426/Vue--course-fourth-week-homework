import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js'

// 匯入分頁元件
import pagination from './pagination.js'
import productModifyModal, { productModal } from './productModifyModal.js'
import productDelModal, { deleteModal } from './productDelModal.js'

let statusMessage = {}

const App = createApp({
  components: {
    pagination,
    productModifyModal,
    productDelModal
  },
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'sausage',
      products: [],
      isNew: false,
      isSuccess: true,
      infoMessage: '',
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      productErrorModal: false
    }
  },
  methods: {
    checkLogin() {
      let url = `${this.apiUrl}/api/user/check`
      axios.post(url)
        .then(res => {
          this.getProducts()
        })
        .catch(err => {
          this.infoMessage = err.data.message
          this.isSuccess = false
          statusMessage.show()
          setTimeout(() => {
            statusMessage.hide()
            window.location = './index.html'
          }, 2000)
        })
    },
    getProducts(page = 1) {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    openModal(status, product) {
      if (status === 'isNew') {
        this.tempProduct = {
          imagesUrl: []
        }
        productModal.show()
        this.isNew = true
      } else if (status === 'edit') {
        this.tempProduct = { imagesUrl: [], ...product }
        productModal.show()
        this.isNew = false
      }
      else if (status === 'delete') {
        this.tempProduct = { ...product }
        deleteModal.show()
      }
    },
    updateProduct(product, id) {
      this.tempProduct = product
      const productData = { data: this.tempProduct }
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`
      axios.put(url, productData).then((res) => { }).catch((err) => { })
    },
    openStatusMessage(info, errModal, modalClass) {
      this.infoMessage = info
      this.productErrorModal = errModal
      this.isSuccess = modalClass
      statusMessage.show()
      setTimeout(() => {
        statusMessage.hide()
      }, 1000)
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.checkLogin()

    statusMessage = new bootstrap.Modal(document.getElementById('statusMessage'), { keyboard: false })
  }
})

App.component('statusMessage', {
  props: ['infoMessage', 'isSuccess', 'productErrorModal'],
  template: /*html*/`
  <div class="modal fade" id="statusMessage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="messageModal">
  <div class="modal-dialog" :class=" [ productErrorModal ? 'modal-dialog-centered' :'null']">
    <div class="modal-content">
      <div class="modal-header" :class="[isSuccess ? 'bg-primary':'bg-danger']">
        <div class="container">
          <h5 class="modal-title text-center text-white display-7" id="staticBackdropLabel">{{infoMessage}}</h5>
        </div>
      </div>
      <div v-if="!isSuccess" class="d-flex justify-content-center">
        <div class="d-inline-flex my-4 text-warning">
          <i class="fas fa-exclamation-triangle fa-4x"></i>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <div class="d-inline-flex my-4 text-success">
          <i class="fas fa-check fa-4x"></i>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`

})
App.mount('#app')
