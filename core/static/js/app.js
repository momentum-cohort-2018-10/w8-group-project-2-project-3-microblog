var csrftoken = Cookies.get('csrftoken')
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken

const requestUserPk = parseInt(document.getElementById('request-user-pk').value) || -1
const requestUser = document.getElementById('request-user').value
let displayedItems = 0

const vm = new Vue({
  el: '#vue-container',
  delimiters: ['${', '}'],
  data: {
    posts: [],
    users: [],
    active: [],
    followObject: [],
    loggedInUser: { 'followers': [], 'pk': -1, 'url': null, 'username': requestUser, 'users_followed': [] },
    newResponse: { 'text': null, 'post': null, 'user': requestUser },
    currentPost: {},
    message: null,
    newPost: { 'text': null },
    newFollow: { 'following_user': requestUserPk, 'followed_user': null },
    search_term: '',
    username_search: '',
    showPostsNotUsers: true,
    showFeedNotAll: true,
    showFollowersNotAll: false,
    showFollowingNotAll: false,
  },
  mounted: function () {
    if (requestUserPk !== -1) {
      this.getLoggedInUser();
    } else {
      this.showFeedNotAll = false;
    }
    this.getPosts();
  },
  updated: function () {
    console.log(displayedItems)
  },
  methods: {
    count: function () {
      displayedItems++
      return true;
    },
    resetCount: function () {
      displayedItems = 0
    },
    toggleResponses: function (post) {
      if (this.active.includes(post.pk)) {
        this.active.splice(this.active.indexOf(post.pk), 1)
      }
      else {
        this.active.push(post.pk)
      }
    },
    showResponses: function (post) {
      return this.active.includes(post.pk)
    },
    getPosts: function () {
      displayedItems = 0
      this.$http.get(`/api/posts/?search=${this.search_term}`).then((response) => {
        this.search_term = ''
        displayedItems = 0
        this.posts = response.data;
        this.showPostsNotUsers = true;
      })
        .catch((err) => {
          console.log(err);
        })
    },
    getUsers: function () {
      displayedItems = 0
      this.$http.get(`/api/users/?search=${this.username_search}`).then((response) => {
        this.username_search = ''
        this.showPostsNotUsers = false;
        this.users = response.data;
      })
        .catch((err) => {
          console.log(err);
        })
    },
    getLoggedInUser: function () {
      this.$http.get(`/api/users/${requestUserPk}/`).then((response) => {
        this.loggedInUser = response.data
        this.showFeedNotAll = true
      })
        .catch((err) => {
          console.log(err)
        })
    },
    addPost: function () {
      this.$http.post('/api/posts/', this.newPost).then((response) => {
        this.getPosts();
        this.newPost.text = ''
      })
        .catch((err) => {
          console.log(err)
        })
    },
    deletePost: function (post) {
      this.$http.delete(`/api/posts/${post.pk}/`).then((response) => {
        this.getPosts();
      })
        .catch((err) => {
          console.log(err)
        })
    },
    addResponse: function (post) {
      this.newResponse.post = post.pk
      this.$http.post('/api/responses/', this.newResponse).then((response) => {
        this.getPosts();
        this.newResponse.text = ''
      })
        .catch((err) => {
          console.log(err)
          console.log(this.newResponse)
        })
    },
    deleteResponse: function (response_to_post) {
      this.$http.delete(`/api/responses/${response_to_post.pk}/`).then((response) => {
        this.getPosts();
      })
        .catch((err) => {
          console.log(err)
        })
    },
    isFollowed: function (user) {
      return this.loggedInUser.users_followed.includes(user.username)
    },
    isFollowing: function (user) {
      return this.loggedInUser.followers.includes(user.username)
    },
    isUserPost: function (post) {
      return this.loggedInUser.posts.includes(post)
    },
    getFollowedUsers: function () {
      if (this.isFollowed(user)) {
        this.$http.get(`/api/follows/?followed_user=${user.pk}&amp;following_user=${this.loggedInUser.pk}`).then((response) => {
          this.users = response.data;
        })
      }
    },
    toggleFollow: function (user) {
      // check if the request user is already following the user
      if (this.isFollowed(user)) {
        // if yes, get the follow object from the api and store it in this.followObject
        this.$http.get(`/api/follows/?followed_user=${user.pk}&amp;following_user=${this.loggedInUser.pk}`).then((response) => {
          this.followObject = response.data;
          console.log(`You are no longer following ${user.username}`)
          // then, delete the object by referencing its pk
          this.$http.delete(`/api/follows/${this.followObject[0].pk}/`).then((response) => {
            // and run getLoggedInUser and getPosts again to update the list of followed users
            this.getLoggedInUser();
            if (this.showPostsNotUsers) {
              this.getPosts();
            }
            else {
              this.getUsers();
            }
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
          if (this.showPostsNotUsers) {
            this.getPosts();
          }
          else {
            this.getUsers();
          }
          console.log(`You are now following ${user.username}!`)
        })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  }
});

var filter = function (text, length, clamp) {
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);