import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js'

let errorWarnning = {}

const App = {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    login() {
      const url = 'https://vue3-course-api.hexschool.io/v2'
      axios.post(`${url}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          window.location = './products.html'
        })
        .catch(err => {
          this.message = err.data.message
          errorWarnning.show()

          setTimeout(() => {
            errorWarnning.hide()
          }, 2000)
        })
    }
  },
  mounted() {
    errorWarnning = new bootstrap.Modal(document.getElementById('errorWarnning'), { keyboard: false })
  }
}
createApp(App).mount('#app')
