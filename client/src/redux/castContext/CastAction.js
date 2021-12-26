export const getCastsStart = () => ({
    type: "GET_CASTS_START",
});

export const getCastsSuccess = (Casts) => ({
    type: "GET_CASTS_SUCCESS",
    payload: Casts,

});


export const getCastsFailure = () => ({
    type: "GET_CASTS_FAILURE",
});
//find
export const getCastsFindStart = () => ({
    type: "GET_CASTSFIND_START",
});

export const getCastsFindSuccess = (Casts) => ({
    type: "GET_CASTSFIND_SUCCESS",
    payload: Casts,
});

export const getCastsFindFailure = () => ({
    type: "GET_CASTSFIND_FAILURE",
});
//get delete
export const getCastsDelStart = () => ({
    type: "GET_DEL_START",
});

export const getCastsDelSuccess = (Casts) => ({
    type: "GET_DEL_SUCCESS",
    payload: Casts,
});

export const getCastsDelFailure = () => ({
    type: "GET_DEL_FAILURE",
});


export const createCastsStart = () => ({
    type: "CREATE_Casts_START",
});

export const createCastsSuccess = (Casts) => ({
    type: "CREATE_CastsS_SUCCESS",
    payload: Casts,
});

export const createCastsFailure = () => ({
    type: "CREATE_CastsS_FAILURE",
});

export const updateCastsStart = () => ({
    type: "UPLOAD_CASTS_START",
});

export const updateCastsSuccess = (Casts) => ({
    type: "UPLOAD_CASTS_SUCCESS",
    payload: Casts,
});

export const updateCastsFailure = () => ({
    type: "UPLOAD_CASTS_FAILURE",
});

//Delete 
export const delCastsStart = () => ({
    type: "DEL_CASTS_START",
});

export const delCastsSuccess = (Casts) => ({
    type: "DEL_CASTS_SUCCESS",
    payload: Casts,
});

export const delCastsFailure = () => ({
    type: "DEL_CASTS_FAILURE",
});
//Restore 
export const delRestoreStart = () => ({
    type: "RESTORE_START",
});

export const delRestoreSuccess = (Casts) => ({
    type: "RESTORE_SUCCESS",
    payload: Casts,
});

export const delRestoreFailure = () => ({
    type: "RESTORE_FAILURE",
});
//Remove
export const deleteCastStart = () => ({
  type: "DELETE_CASTS_START",
});

export const deleteCastsSuccess = (id) => ({
  type: "DELETE_CASTS_SUCCESS",
  payload: id,
});

export const deleteCastsFailure = () => ({
  type: "DELETE_CASTS_FAILURE",
});