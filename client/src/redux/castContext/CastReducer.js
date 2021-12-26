const CastReducer = (state, action) => {
    switch (action.type) {
        case "GET_CASTS_START":
            return {
                casts: [],
                isFetching: true,
                error: false,
            };
        case "GET_CASTS_SUCCESS":
            return {
                casts: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_CASTS_FAILURE":
            return {
                casts: [],
                isFetching: false,
                error: true,
            };
            //find
        case "GET_CASTSFIND_START":
            return {
                casts: [],
                isFetching: true,
                error: false,
            };
        case "GET_CASTSFIND_SUCCESS":
            return {
                casts: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_CASTSFIND_FAILURE":
            return {
                casts: [],
                isFetching: false,
                error: true,
            };
            //get
        case "GET_DEL_START":
            return {
                casts: [],
                isFetching: true,
                error: false,
            };
        case "GET_DEL_SUCCESS":
            return {
                casts: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_DEL_FAILURE":
            return {
                casts: [],
                isFetching: false,
                error: true,
            };

        case "CREATE_CASTS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "CREATE_CASTS_SUCCESS":
            return {
                casts: [...state.casts, action.payload],
                isFetching: false,
                error: false,
            };
        case "CREATE_CASTS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
            //Update
        case "UPLOAD_CASTS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "UPLOAD_CASTS_SUCCESS":
  
            return {
                ...state,
                isFetching: false,
                error: false,
            };

        case "UPLOAD_CASTS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

            //Delete
        case "DEL_CASTS_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DEL_CASTS_SUCCESS":

            const temp = state.casts.filter(item => item._id !== action.payload)

            return {
                casts: temp,
                isFetching: false,
                error: false,
            };

        case "DEL_CASTS_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

             //Restore
        case "RESTORE_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "RESTORE_SUCCESS":

            const tempp = state.casts.filter(item => item._id !== action.payload)

            return {
                casts: tempp,
                isFetching: false,
                error: false,
            };

        case "RESTORE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
            //remove
              case "DELETE_CASTS_START":
                return {
                  ...state,
                  isFetching: true,
                  error: false,
                };
              case "DELETE_CASTS_SUCCESS":
                return {
                  casts: state.casts.filter((cast) => cast._id !== action.payload),
                  isFetching: false,
                  error: false,
                };
              case "DELETE_CASTS_FAILURE":
                return {
                  ...state,
                  isFetching: false,
                  error: true,
                };
        default:
            return {...state };
    }
};

export default CastReducer;