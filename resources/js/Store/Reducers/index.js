import { combineReducers } from 'redux';
import navbar from './NavbarReducer';

const monkeyDogState = combineReducers({
    navbar
});

export default monkeyDogState;
