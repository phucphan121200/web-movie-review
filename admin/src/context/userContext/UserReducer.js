const UserReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS_START":
            return {
                users: [],
                isFetching: true,
                error: false,
            };
        case "GET_USERS_SUCCESS":
            return {
                users: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USERS_FAILURE":
            return {
                users: [],
                isFetching: false,
                error: true,
            };
            //find
        case "GET_USERSFIND_START":
            return {
                users: [],
                isFetching: true,
                error: false,
            };
        case "GET_USERSFIND_SUCCESS":

            return {
                users: action.payload,
                isFetching: false,
                error: false,
            }


        case "GET_USERSFIND_FAILURE":
            return {
                users: [],
                isFetching: false,
                error: true,
            };

        case "CREATE_USERS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "CREATE_USERS_SUCCESS":
            return {
                users: [...state.users, action.payload],
                isFetching: false,
                error: false,
            };
        case "CREATE_USERS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case "UPLOAD_USERS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "UPLOAD_USERS_SUCCESS":
            return {
                movies: state.Users.map(
                    (User) => User._id === action.payload._id && action.payload
                ),
                isFetching: false,
                error: false,
            }


        case "UPLOAD_USERS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

            //Delete
        case "DEL_USERS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DEL_USERS_SUCCESS":


            const temp = state.users.filter(item => item._id !== action.payload)
            console.log(temp);
            return {
                users: temp,
                isFetching: false,
                error: false,
            };

        case "DEL_USERS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
            // case "DELETE_USERS_START":
            //   return {
            //     ...state,
            //     isFetching: true,
            //     error: false,
            //   };
            // case "DELETE_USERS_SUCCESS":
            //   return {
            //     users: state.Users.filter((user) => user._id !== action.payload),
            //     isFetching: false,
            //     error: false,
            //   };
            // case "DELETE_USERS_FAILURE":
            //   return {
            //     ...state,
            //     isFetching: false,
            //     error: true,
            //   };
        default:
            return {...state };
    }
};

export default UserReducer;