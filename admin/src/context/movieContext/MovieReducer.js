const MovieReducer = (state, action) => {
    switch (action.type) {
        case "GET_MOVIES_START":
            return {
                movies: [],
                isFetching: true,
                error: false,
            };
        case "GET_MOVIES_SUCCESS":
            return {
                movies: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_MOVIES_FAILURE":
            return {
                movies: [],
                isFetching: false,
                error: true,
            };
            //find
        case "GET_MoviesFIND_START":
            return {
                movies: [],
                isFetching: true,
                error: false,
            };
        case "GET_MoviesFIND_SUCCESS":
            return {
                movies: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_MoviesFIND_FAILURE":
            return {
                movies: [],
                isFetching: false,
                error: true,
            };
            //     //get
            // case "GET_DEL_START":
            //     return {
            //         movies: [],
            //         isFetching: true,
            //         error: false,
            //     };
            // case "GET_DEL_SUCCESS":
            //     return {
            //         movies: action.payload,
            //         isFetching: false,
            //         error: false,
            //     };
            // case "GET_DEL_FAILURE":
            //     return {
            //         movies: [],
            //         isFetching: false,
            //         error: true,
            //     };

        case "CREATE_MOVIES_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "CREATE_MOVIES_SUCCESS":
            return {
                movies: [...state.movies, action.payload],
                isFetching: false,
                error: false,
            };
        case "CREATE_MOVIES_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
            //Update
        case "UPLOAD_MOVIES_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "UPLOAD_MOVIES_SUCCESS":

            return {
                movies: state.movies.map(
                    (cast) => cast._id === action.payload._id && action.payload
                ),

                isFetching: false,
                error: false,
            };

        case "UPLOAD_MOVIES_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

            //Delete
        case "DEL_MOVIES_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DEL_MOVIES_SUCCESS":

            const temp = state.movies.filter(item => item._id !== action.payload)

            return {
                movies: temp,
                isFetching: false,
                error: false,
            };

        case "DEL_MOVIES_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

            //   case "DELETE_MOVIES_START":
            //     return {
            //       ...state,
            //       isFetching: true,
            //       error: false,
            //     };
            //   case "DELETE_MOVIES_SUCCESS":
            //     return {
            //       movies: state.movies.filter((cast) => cast._id !== action.payload),
            //       isFetching: false,
            //       error: false,
            //     };
            //   case "DELETE_MOVIES_FAILURE":
            //     return {
            //       ...state,
            //       isFetching: false,
            //       error: true,
            //     };
        default:
            return {...state };
    }
};

export default MovieReducer;