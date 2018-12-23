var csrftoken = Cookies.get('csrftoken')
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken

const vm = new Vue({
  el: '#vue-container',
  delimiters: ['${','}'],
  data: {
    posts: [],
    users: [],
    active: [],
    currentPost: {},
    message: null,
    newPost: { 'text': null },
    search_term: '',
    username_search: '',
    showPostsNotUsers: true,
  },
  mounted: function() {
    this.getPosts()
  },
  methods: {
    toggle: function(post) {
      if (this.active.includes(post.pk)) {
        this.active.splice(this.active.indexOf(post.pk), 1)
      }
      else {
        this.active.push(post.pk)
      }
    },
    activated: function(post) {
      return this.active.includes(post.pk)
    },
    getPosts: function() {
      this.$http.get(`/api/posts/?search=${this.search_term}`).then((response) => {
        this.posts = response.data;
        this.showPostsNotUsers = true;
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getUsers: function() {
      this.$http.get(`/api/users/?search=${this.username_search}`).then((response) => {
        this.users = response.data;
        this.showPostsNotUsers = false;
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getUser: function(post) {
      this.$http.get(`/api/users/${user.pk}/`).then((response) => {
        this.currentUser = response.data
        this.showPostsNotUsers = false
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addPost: function() {
      this.$http.post('/api/posts/', this.newPost).then((response) => {
        this.getPosts()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deletePost: function(post) {
      this.$http.delete(`/api/posts/${post.pk}/`).then((response) => {
        this.getPosts()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addResponse: function(post) {
      this.$http.post('/api/responses/', this.newPost).then((response) => {
        this.getPosts()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteResponse: function(comment) {
      this.$http.delete(`/api/responses/${comment.pk}/`).then((response) => {
        this.getPosts()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
});


// const show = Vue.component('toggle-responses', {
//   template: `
//     <div>
//       <a @click="toggle()" class="f6 grow no-underline br-pill ba ph3 pv1 dib mid-gray" href="#0">View Comments</a>
//     </div>
//   `,
//   props: ['post'],
//   methods: {
//     toggle() {
//       this.isActive = !this.isActive
//     }
//   },
//   data() {
//     return {
//       isActive: false
//     }
//   }
// })
