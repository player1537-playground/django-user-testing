import resource from '../resource';

export function retrieveBlogPostsList({ dispatch }, { next, abort }, page) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', null);

  resource.blog.posts.get({page}).then((response) => {
    dispatch('SET_BLOG_POSTS_LIST', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function retrieveBlogPostsOptions({ dispatch }, { next, abort }) {
  dispatch('SET_BLOG_POSTS_OPTIONS', null);

  resource.blog.posts.options().then((response) => {
    dispatch('SET_BLOG_POSTS_OPTIONS', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function retrieveBlogPostsDetail({ dispatch }, { next, abort }, id) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', null);

  resource.blog.posts.get({id}).then((response) => {
    dispatch('SET_BLOG_POSTS_DETAIL', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function createBlogPost({ dispatch }, { next, abort }, values) {
  var toPost = {};

  for (var key in values) {
    if (values[key].config.required) {
      toPost[key] = values[key].value;
    }
  }

  console.log(JSON.stringify(toPost, true, 2));

  resource.blog.posts.save({}, toPost).then((response) => {
    if (next) next(response.json());
  }, (response) => {
    if (abort) abort(response.json());
  });
}
