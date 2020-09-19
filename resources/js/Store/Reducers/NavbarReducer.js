import * as types from "../Actions/types";

const initialState = {
    breadcrumbPath: [],
};

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_BREADCRUMBS:
            return {
                ...state,
                breadcrumbPath: action.payload,
            };
        default:
            return state;
    }
};

export default navReducer;
