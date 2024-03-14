import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const signInSelector = (state: rootState) => state.signIn;
export const isSignedInSelector = createSelector(
    signInSelector,
    (signin) => signin.isSignedIn
);
