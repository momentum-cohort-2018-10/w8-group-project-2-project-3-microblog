var csrftoken = Cookies.get('csrftoken')
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken

const requestUserPk = parseInt(document.getElementById('request-user-pk').value) || -1
const requestUser = document.getElementById('request-user').value
let displayedItems = 0

// const thisUserPk = parseInt(document.getElementById('user-pk').value) || -2
// const thisUser = document.getElementById('user').value

const vm = new Vue({
  el: '#vue-container',
  delimiters: ['${', '}'],
  data: {
    //bio: '',
   // bios: [],
    posts: [],
    users: [],
    active: [],
    followObject: [],
    newBio: {'text': null },
    loggedInUser: { 'followers': [], 'pk': -1, 'url': null, 'username': requestUser, 'bio': { 'text':null }, 'users_followed': [] },
    // currentUser: { 'followers': [], 'pk': -1, 'url': null, 'username': thisUser, 'bio': { 'text':null }, 'users_followed': [] },
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
    updateBio: true,
    showProfileNotAll: false,
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
    // clearBio() {
    //   this.bio = ''
    // },
    // handleOK (evt) {
    //   evt.preventDefault()
    //   if (!this.bio) {
    //     alert('Please enter your bio')
    //   } else {
    //     this.handleSubmit()
    //   }
    // },
    // handleSubmit () {
    //   this.bios.push(this.bio)
    //   this.clearBio()
    //   this.$refs.modal.hide()
    //   },
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
    getCurrentUser: function () {
      this.$http.get(`/api/users/${thisUserPk}/`).then((response) => {
        this.currentUser = response.data
      })
        .catch((err) => {
          console.log(err)
        })
    },
    getBio: function () {
      this.$http.get(`/api/users/?bio=${this.user.bio}/`).then((response) => {
        this.bios = response.data;
        this.updateBio = true;
      })
        .catch((err) => {
          console.log(err);
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
    addBio: function (user) {
      this.$http.patch(`/api/users/${user.bio.pk}`, this.newBio).then((response) => {
        this.getBio();
        this.getUsers();
        this.newBio.text = ''
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
    deleteBio: function (user) {
      this.$http.delete(`/api/users/${user.bio.pk}/`).then((response) => {
        this.getBio();
        this.getUsers();
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

    isUserPost: function(post) {
        return this.loggedInUser.username.includes(post.user.username)
    },
    isUser: function (user) {
      if (this.user.username === user.username) {
        return user
      }
    },
    getUserPosts: function(post) {
     this.$http.get(`/api/posts/?post.user=${this.post.user.pk}`).then((response) => {
        this.posts = response.data;
      })
    },
     getFollowedUsers: function() {
       if (this.isFollowed(user)) { 
      this.$http.get(`/api/follows/?followed_user=${user.pk}&amp;following_user=${this.loggedInUser.pk}`).then((response) => {
         this.users = response.data;
       })
       }
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