import resource from '../resource';

export function retrieveBlogPostsList({ dispatch }, { next, abort }) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', []);

  resource.blog.posts.get().then((response) => {
    dispatch('SET_BLOG_POSTS_LIST', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function retrieveBlogPostsDetail({ dispatch }, { next, abort }, id) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', []);

  resource.blog.posts.get({id}).then((response) => {
    dispatch('SET_BLOG_POSTS_DETAIL', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}
