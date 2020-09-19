import * as types from "./types";

export function updateBreadcrumbs(crumbs) {
    return {
        type: types.UPDATE_BREADCRUMBS,
        payload: crumbs
    }
}
