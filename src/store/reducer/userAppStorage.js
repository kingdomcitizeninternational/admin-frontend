import {
    LOG_ADMIN_IN, LOGIN_ADMIN, UPDATE_ADMIN, FETCH_COSSIGNMENTS, UPDATE_COSSIGNMENT, DELETE_COSSIGNMENT, CREATE_COSSIGNMENT, FETCH_HISTORIES, UPDATE_HISTORY, DELETE_HISTORY, CREATE_HISTORY
} from "../action/userAppStorage";



const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    },
    historiesList: [],
    cossignmentsList: []
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }

        case LOGIN_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }


        /*history section*/
        case FETCH_HISTORIES:
            return {
                ...state,
                historiesList: action.payload
            }
        case UPDATE_HISTORY:
            if (true) {
                let updatedHistory = action.payload

                let newHistoryList = []
                for (let data of state.historiesList) {
                    if (data._id.toString() === updatedHistory._id.toString()) {
                        newHistoryList.push(updatedHistory)
                    } else {
                        newHistoryList.push(data)
                    }
                }
                return {
                    ...state,
                    historiesList: newHistoryList
                }
            }
        case DELETE_HISTORY:
            if (true) {
                let historyId = action.payload
                let newHistory = state.historiesList.filter(data => data._id !== historyId)
                return {
                    ...state,
                    historiesList: newHistory
                }
            }
        case CREATE_HISTORY:
            if (true) {
                let newHistory = action.payload
                let newHistoryList = state.historiesList.push(newHistory)
                return {
                    ...state,
                    historiesList: newHistoryList
                }
            }


        /*cossignment section*/
        case FETCH_COSSIGNMENTS:
            return {
                ...state,
                cossignmentsList: action.payload
            }
        case UPDATE_COSSIGNMENT:
            if (true) {
                let updatedCossignment = action.payload

                let newCossignmentList = []
                for (let data of state.cossignmentsList) {
                    if (data._id.toString() === updatedCossignment._id.toString()) {
                        newCossignmentList.push(updatedCossignment)
                    } else {
                        newCossignmentList.push(data)
                    }
                }
                return {
                    ...state,
                    cossignmentsList: newCossignmentList
                }
            }
        case DELETE_COSSIGNMENT:
            if (true) {
                let cossignmentId = action.payload
                let newCossignment = state.cossignmentsList.filter(data => data._id !== cossignmentId)
                return {
                    ...state,
                    cossignmentsList: newCossignment
                }
            }
        case CREATE_COSSIGNMENT:
            if (true) {
                let newCossignment = action.payload
                let newCossignmentList = state.cossignmentsList.push(newCossignment)
                return {
                    ...state,
                    cossignmentsList: newCossignmentList
                }
            }


        case UPDATE_ADMIN:
            if (true) {
                let updatedAdmin = action.payload
                return {
                    ...state,
                    admin: updatedAdmin
                }
            }

        default:
            return state
    }
}





