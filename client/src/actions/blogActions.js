import axios from "axios";
import {GET_ERRORS, ADD_NEW_BLOG, GET_BLOGS, OTHER_USER, OTHER_USER_FORCE} from "./types";

export const postBlog = (data, history) => dispatch => {
    axios
        .post("/blog", data)
        .then(res => dispatch({
            type: ADD_NEW_BLOG,
            payload:res.data
        }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getUserBlog = (data, history) => dispatch => {
    axios
        .get("/blog/home")
        .then(res => {
            dispatch({
                type: GET_BLOGS,
                payload:res.data
            });
    })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
export const getOtherBlog= (data, history) => dispatch => {
        dispatch({
            type: OTHER_USER_FORCE,
        });
        axios
        .get("/blog/other/" + data._id)
        .then(res => {
            dispatch({
                type: OTHER_USER,
                payload:res.data
            });
            history.push('/user/' + data._id);
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

}