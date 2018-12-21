const posts = new Vue({
  el: '#vue-container',
  delimiters: ['${','}'],
  data: {
    users: [],
    posts: [],
    active: [],
    loading: false,
    currentPost: {},
    message: null,
    newPost: { 'text': null },
    search_term: '',
    
  },
  // beforeMount: function() {
  //   this.getPosts()
  // },
  mounted: function() {
    this.getPosts()
    this.getUsers()
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
      let api_url = '/api/posts/';
      if(this.search_term!==''||this.search_term!==null) {
        api_url = `/api/posts/?search=${this.search_term}`
      }
      this.loading = true;
      this.$http.get(api_url).then((response) => {
        this.posts = response.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      })
    },
    getPost: function(post) {
      this.loading = true
      this.$http.get(`/api/posts/${post.pk}/`).then((response) => {
        this.currentPost = response.data
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    getUsers: function() {
      this.loading = true
      this.$http.get('/api/users/').then((response) => {
        this.users = response.data
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    getUser: function(post) {
      this.loading = true
      this.$http.get(`/api/posts/${user.pk}/`).then((response) => {
        this.currentUser = response.data
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    addPost: function() {
      this.loading = true
      this.$http.post(`/api/posts/`, this.newPost).then((response) => {
        this.loading = false
        this.getPosts()
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    deletePost: function(post) {
      this.loading = true
      this.$http.delete(`/api/posts/${post.pk}/`).then((response) => {
        this.loading = false
        this.getPosts()
      })
      .catch((err) => {
        this.loading = false
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


// const posts = new Vue({
//   el: '#vue-container',
//   delimiters: ['${','}'],
//   data: {
//     posts: [],
//     isActive: false,
//     loading: false,
//     currentPost: {},
//     message: null,
//     newPost: { 'text': null },
//   },
//   mounted: function() {
//     this.getPosts()
//   },
//   methods: {
//     getPosts: function() {
//       this.loading = true
//       this.$http.get('/api/posts/').then((response) => {
//         this.posts = response.data
//         this.loading = false
//       })
//       .catch((err) => {
//         this.loading = false
//         console.log(err)
//       })
//     },
//     getPost: function() {
//       this.loading = true
//       this.$http.get('/api/posts/${pk}/').then((response) => {
//         this.currentPost = response.data
//         this.loading = false
//       })
//       .catch((err) => {
//         this.loading = false
//         console.log(err)
//       })
//     },
//     addPost: function() {
//       this.loading = true
//       this.$http.post('/api/posts/', this.newPost).then((response) => {
//         this.loading = false
//         this.getPosts()
//       })
//       .catch((err) => {
//         this.loading = false
//         console.log(err)
//       })
//     },
//     deletePost: function() {
//       this.loading = true
//       this.$http.delete('/api/posts/${pk}/').then((response) => {
//         this.loading = false
//         this.getPosts()
//       })
//       .catch((err) => {
//         this.loading = false
//         console.log(err)
//       })
//     },
//     toggle: function () {
//       this.isActive = !this.isActive
//     }
//   }
// });
