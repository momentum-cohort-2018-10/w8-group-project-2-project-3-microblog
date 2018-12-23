var csrftoken = Cookies.get('csrftoken')
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken

const posts = new Vue({
  el: '#profile-container',
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
  mounted: function() {
    this.getPosts()
    // this.getUsers()

  },
//   methods: {
//     toggle: function(post) {
//       if (this.active.includes(post.pk)) {
//         this.active.splice(this.active.indexOf(post.pk), 1)
//       }
//       else {
//         this.active.push(post.pk)
//       }
//     },
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
    getUser: function(user) {
      this.loading = true
      this.$http.get(`/api/users/${user.pk}/`).then((response) => {
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
      this.$http.post('/api/posts/', this.newPost).then((response) => {
        this.loading = false
        console.log('hey im from inside addPost')
        this.getPosts()
      })
      .catch((err) => {
        this.loading = false
        console.log(err)
        console.log('there was a big fat error with addPost!')
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