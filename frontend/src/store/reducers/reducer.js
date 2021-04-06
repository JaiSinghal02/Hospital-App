import * as actionTypes from '../actions/action'

const initialState= {
    date: new Date().getFullYear()+"-"+(Math.floor((new Date().getMonth()+1)/10)===0?("0"+(new Date().getMonth()+1)):(new Date().getMonth()+1))+"-"+(Math.floor((new Date().getDate())/10)===0?("0"+(new Date().getDate())):(new Date().getDate())),
    time: null,
    selectedSlot: null,
    currentUserBookings: "",
    currentDateAppointments: null,
    loggedIn:false,
    isStaff:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_DATE:
            return{
                ...state,
                date:action.date
            }
        case actionTypes.SET_TIME:
            return{
                ...state,
                time:action.time
            }
        case actionTypes.SET_TIME_SLOT:
            return{
                ...state,
                selectedSlot: action.slot
            }
        case actionTypes.SET_CURRENT_USER_BOOKINGS:
            return{
                ...state,
                currentUserBookings: action.bookings
            }
        case actionTypes.SET_CURRENT_DATE_APPOINTMENTS:
            return{
                ...state,
                currentDateAppointments: action.appointments
            }
        case actionTypes.SET_USER_LOG_IN:
            return{
                ...state,
                loggedIn: true
            }
        case actionTypes.SET_USER_LOG_OUT:
            return{
                ...state,
                loggedIn: false,
                isStaff: false
            }
        case actionTypes.SET_STAFF_STATUS:
            return{
                ...state,
                isStaff: action.isStaff
            }
        default:
            return state
    }
}

export default reducer;