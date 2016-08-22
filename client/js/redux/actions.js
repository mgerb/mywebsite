import * as types from "./constants";

function initPreview(posts){
    return{
        type: types.INIT_PREVIEW,
        posts
    }
}

//using redux-thunk we can modify actions before they get called
//in this case we can send the http request here rather in the react component
export function fetchPreview(){
    return (dispatch) => {
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
