import jsonPlaceholder from "../apis/jsonPlaceholder";

import _ from 'lodash';

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());
        
        // create a lodash function that wil filter out the uniq 'userId' from posts

        // then push the unique id's to the fetchUser call with this way we prevent to call more than once per id
        // const userIds = _.uniq(_.map(getState().posts, 'userId'));
        // userIds.forEach(id => dispatch(fetchUser(id)))

        //optional chain version
        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value()
    }
}


export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({
            type: "FETCH_USER",
            payload: response.data
        })
    }
}

// option B (not the best one)
// export const fetchUser = (id) => {
//     return (dispatch) => {
//         return  _fetchUser(id, dispatch);
//     }
   
// }

// const _fetchUser = _.memoize(async (id, dispatch) => {
//         const response = await jsonPlaceholder.get(`/users/${id}`);

//         dispatch({
//             type: "FETCH_USER",
//             payload: response.data
//         })
// })


