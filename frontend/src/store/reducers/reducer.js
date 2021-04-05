import * as actionTypes from '../actions/action'

const initialState= {
    date: new Date().getFullYear()+"-"+(Math.floor((new Date().getMonth()+1)/10)===0?("0"+(new Date().getMonth()+1)):(new Date().getMonth()+1))+"-"+(Math.floor((new Date().getDate())/10)===0?("0"+(new Date().getDate())):(new Date().getDate())),
    time: null,
    selectedSlot: null
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
        default:
            return state
    }
}

export default reducer;