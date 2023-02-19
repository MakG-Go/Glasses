// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // app: {
    //     pageTransition: { name: 'page', mode: 'out-in' }
    //   },
    app: {
      baseURL: '/nuxt-github-pages/'
    },
  
    css: ["@/assets/sass/app.scss"], // add
    vite: {
      define: {
        "process.env.DEBUG": false,
      },
    },
  
    build: {
      transpile: ['gsap'],
    },
  
  })
