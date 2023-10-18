import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({  //mutation since we are making post request
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({  //mutation since we are making post request
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({  //mutation since we are making post request
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}//profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        // getProductDetails: builder.query({
        //     query: (productId) => ({
        //         url: `${PRODUCTS_URL}/${productId}`,
        //     }),
        //     keepUnusedDataFor: 5,
        // })
    }),

});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice; //convention to export mutation
