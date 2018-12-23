var csrftoken = Cookies.get('csrftoken')
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken

const requestUserPk = parseInt(document.getElementById('request-user-pk').value)
const requestUser = document.getElementById('request-user').value

const vm = new Vue({
  el: '#vue-container',
  delimiters: ['${','}'],
  data: {
    posts: [],
    users: [],
    active: [],
    followObject: [],
    loggedInUser: {},
    newResponse: { 'text': null, 'post': null },
    currentPost: {},
    message: null,
    newPost: { 'text': null },
    newFollow: {'following_user': requestUserPk, 'followed_user': null},
    search_term: '',
    username_search: '',
    showPostsNotUsers: true,
  },
  mounted: function() {
    this.getPosts();
    this.getLoggedInUser();
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
    getLoggedInUser: function() {
      this.$http.get(`/api/users/${requestUserPk}/`).then((response) => {
        this.loggedInUser = response.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addPost: function() {
      this.$http.post('/api/posts/', this.newPost).then((response) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deletePost: function(post) {
      this.$http.delete(`/api/posts/${post.pk}/`).then((response) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addResponse: function(post) {
      this.newResponse.post = post.pk
      this.$http.post('/api/responses/', this.newResponse).then((response) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteResponse: function(comment) {
      this.$http.delete(`/api/responses/${comment.pk}/`).then((response) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    isFollowed: function(user) {
      return this.loggedInUser.users_followed.includes(user.username)
    },
    toggleFollow: function(user) {
      // check if the request user is already following the user
      if (this.isFollowed(user)) {
        // if yes, get the follow object from the api and store it in this.followObject
        this.$http.get(`/api/follows/?followed_user=${user.pk}&amp;following_user=${this.loggedInUser.pk}`).then((response) => {
          this.followObject = response.data;
          console.log(`You are no longer following ${user.username}`)
          // then, delete the object by referencing its pk
          this.$http.delete(`/api/follows/${this.followObject[0].pk}/`).then((response) => {
          // and run getLoggedInUser again to update the list of followed users
            this.getLoggedInUser();
          })
         })
         .catch((err) => {
           console.log(err)
         })
      }
      else {
        this.newFollow.followed_user = user.pk
        this.$http.post('/api/follows/', this.newFollow).then((response) => {
          this.getLoggedInUser();
          console.log(`You are now following ${user.username}!`)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
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
