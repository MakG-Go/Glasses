import store from "~~/store";


export default function(context) {
    // go tell the store to update the page
   store.commit('updatePage', context.name)
  }

// export default defineNuxtRouteMiddleware((to, from) => {
//     console.log('to',to,'from', from)
//   })
