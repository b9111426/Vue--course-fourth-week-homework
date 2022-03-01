export default {
  props: ['pages'],
  template: /* html */` 
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled: !pages.has_pre}">
      <a class="page-link" href="#" @click="$emit('previous',pages.current_page-1)" aria-label="Previous"><span
          aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active:page === pages.current_page }" v-for="page in pages.total_pages"
      :key="page+'452'">
      <a class="page-link" href="#" @click="$emit('get-product',page)">{{page}}</a>
    </li>
    <li class="page-item" :class="{disabled: !pages.has_next}">
      <a class="page-link" href="#" @click.prevent="$emit('next_page',pages.current_page+1)" aria-label="Next"><span
          aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
`
}
