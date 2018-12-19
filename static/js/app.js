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
  },
  mounted: function() {
    this.getPosts()
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