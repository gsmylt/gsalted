module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styling/1-settings/_variables.scss";
          @import "@/assets/styling/1-settings/_keyframes.scss";
          @import "@/assets/styling/2-tools/_functions.scss";
          @import "@/assets/styling/2-tools/_mixins.scss";`
      }
    }
  },
}
