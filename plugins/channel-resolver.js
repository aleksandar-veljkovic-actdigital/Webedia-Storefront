export default ({ app, redirect }, inject) => {
  
  app.router.beforeEach((to, from, next) => {

    // if (process.env.NODE_ENV === "development") {
    //   console.log("app.router.beforeEach", process.env.API_URL_SYLIUS_EN)
    //   process.env.API_URL_SYLIUS = process.env.API_URL_SYLIUS_EN
    // }

    next();
  });

};