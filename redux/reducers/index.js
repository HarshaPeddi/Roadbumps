import {combineReducers} from 'redux';
import chartReducer from "./chartReducer";
import dateReducer from "./dateReducer";
import mapReducer from './mapReducer';


export default combineReducers({
    chartData: chartReducer,
    selectedDate: dateReducer,
    latLongGeo: mapReducer
});