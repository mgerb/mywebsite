import * as types from "../constants/app";
import marked from 'marked';
import 'whatwg-fetch';

export function increasePostLimit() {
    return {
        type: types.INCREASE_POST_LIMIT
    }
}

function initPreview(posts) {
    return {
        type: types.INIT_PREVIEW,
        posts
    }
}

function loadPost(post) {
    return {
        type: types.LOAD_POST,
        post
    }
}

function fetching() {
    return {
        type: types.FETCHING
    }
}

//using redux-thunk we can modify actions before they get called
//in this case we can send the http request here rather in the react component
export function fetchPreview() {
    return (dispatch) => {
        dispatch(fetching());
        return fetch('/public/metadata.json')
            .then(response => response.json())
            .then(json => {
                dispatch(initPreview(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

//adjust url according to parameters
//mainly used to load md files in the parent directory within /posts
export function fetchPost(post, category = null) {
    let url;
    return (dispatch) => {
        dispatch(fetching());
        url = category !== null || typeof category === 'undefined' ? `/public/posts/${category}/${post}.md` : `/public/posts/${post}.md`;
        return fetch(url)
            .then(response => response.text())
            .then(response => {
                dispatch(loadPost(response));
            })
            .catch(error => {
                console.log(error);
            });
    }
}
