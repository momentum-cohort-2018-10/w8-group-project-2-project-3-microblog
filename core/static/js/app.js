const posts = new Vue({
  el: '#vue-container',
  delimiters: ['${','}'],
  data: {
    posts: [],
    isActive: false,
    loading: false,
    currentPost: {},
    message: null,
    newPost: { 'text': null },
    users: []
  },

  beforeMount: function() {
    this.getPosts()
  },
  mounted: function(){
    this.getUsers()
  },
  methods: {
    getPosts: function() {
      this.loading = true
      this.$http.get('/api/posts/').then((response) => {
        this.posts = response.data
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    // scroll (post){
    //   window.onscroll = () => {
    //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

    //     if (bottomOfWindow) {
    //       this.$http.get('api/posts').then(response => {
    //         post.push(response.data.results[0]);
    //       });
    //     }
    //   };
    // },
    getPost: function() {
      this.loading = true
      this.$http.get('/api/posts/${pk}/').then((response) => {
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
    addPost: function() {
      this.loading = true
      this.$http.post('/api/posts/', this.newPost).then((response) => {
        this.loading = false
        this.getPosts()
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    deletePost: function() {
      this.loading = true
      this.$http.delete('/api/posts/${pk}/').then((response) => {
        this.loading = false
        this.getPosts()
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    toggle: function () {
      this.isActive = !this.isActive
    }
  }
});





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