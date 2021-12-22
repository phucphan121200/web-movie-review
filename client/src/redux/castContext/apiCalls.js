import axios from "axios";
import {
    createCastsFailure,
    createCastsStart,
    createCastsSuccess,
    deleteCastsFailure,
    deleteCastStart,
    deleteCastsSuccess,

    getCastsFailure,
    getCastsStart,
    getCastsSuccess,

    getCastsFindFailure,
    getCastsFindStart,
    getCastsFindSuccess,

    getCastsDelFailure,
    getCastsDelStart,
    getCastsDelSuccess,

    delCastsStart,
    delCastsSuccess,
    delCastsFailure,

    delRestoreStart,
    delRestoreSuccess,
    delRestoreFailure,


    updateCastsSuccess,
    updateCastsStart,
    updateCastsFailure


} from "./CastAction";


export const getCasts = async(dispatch,  setNotify) => {

    dispatch(getCastsStart());
    try {

        const res = await axios.get("/casts", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        
        setNotify({
            isOpen: true,
            message: "Loading Successfully",
            type: "success",
          });
        dispatch(getCastsSuccess(res.data));

    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Loading Failed: "+err,
            type: "error",
          });
        dispatch(getCastsFailure());
    }
};
//find
export const getCastsFind = async(id, dispatch) => {
    dispatch(getCastsFindStart());
    try {
        const res = await axios.get("/casts/find/" + id);
        // setNotify({
        //     isOpen: true,
        //     message: "Loading Successfully",
        //     type: "success",
        //   });
        dispatch(getCastsFindSuccess(res.data));

    } catch (err) {
        // setNotify({
        //     isOpen: true,
        //     message: "Loading Failed: "+err,
        //     type: "error",
        //   });
        dispatch(getCastsFindFailure());
    }
};

//find del
export const getCastsDelFindObject = async(object, dispatch,setNotify) => {
    dispatch(getCastsDelStart());
    try {

        const res = await axios.get("/" + object + "/deleted/", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        setNotify({
            isOpen: true,
            message: "Loading Successfully",
            type: "success",
          });
        dispatch(getCastsDelSuccess(res.data));


    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Loading Failed: "+err,
            type: "error",
          });
        dispatch(getCastsDelFailure());
    }
};

//create
export const createCasts = async(cast, dispatch,setNotify) => {
    dispatch(createCastsStart());
    try {
        const res = await axios.post("/casts/add/", cast, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        setNotify({
            isOpen: true,
            message: "Add New Cast Successfully",
            type: "success",
          });

        dispatch(createCastsSuccess(res.data));
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Add New Cast Failed: "+err,
            type: "error",
          });
        dispatch(createCastsFailure());
    }
};

//update
export const updateCasts = async(cast, dispatch,setNotify) => {
    dispatch(updateCastsStart());
    try {

        const res = await axios.put("/casts/update/" + cast._id, cast, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        setNotify({
            isOpen: true,
            message: "Update Information Successfully",
            type: "success",
          });
        dispatch(updateCastsSuccess());

    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Update Information Failed",
            type: "error",
          });
        dispatch(updateCastsFailure());
    }
};
//Del
export const DelCasts = async(id, dispatch,setNotify) => {
    dispatch(delCastsStart());
    dispatch(delCastsSuccess(id));
    try {

        const res = await axios.put("/casts/delete/" + id, id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        dispatch(delCastsSuccess(res.data));

    } catch (err) {
        setNotify({
            isOpen: true,
            message: 'Deleted Failed: ' +err,
            type: 'warning'
        })
        dispatch(delCastsFailure());
    }
};
//recover
export const RestoreCasts = async(object, id, dispatch,setNotify) => {
    dispatch(delRestoreStart());
    dispatch(delCastsSuccess(id));
    try {

        const res = await axios.put("/" + object + "/recover/" + id, id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        setNotify({
            isOpen: true,
            message: 'Recovered Successfully',
            type: 'success'
        })

        dispatch(delRestoreSuccess(res.data));

    } catch (err) {
        setNotify({
            isOpen: true,
            message: 'Recovered Failed:'+err,
            type: 'error'
        })
        dispatch(delRestoreFailure());
    }
};
//delete
export const deleteCasts = async(object, id, dispatch,setNotify) => {
    dispatch(deleteCastStart());

    try {
        
        await axios.delete("/" + object + "/remove/" + id, id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,

            },

        });
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        dispatch(deleteCastsSuccess(id));
    } catch (err) {
        setNotify({
            isOpen: true,
            message: 'Deleted Failed: '+err,
            type: 'warning'
        })
        dispatch(deleteCastsFailure());
    }

};