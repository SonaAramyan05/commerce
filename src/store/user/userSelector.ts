import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const userSelector = (state: rootState) => state.currentUser;
export const currentUserSelector = createSelector(
    userSelector,
    (user) => user.currentUser
);
