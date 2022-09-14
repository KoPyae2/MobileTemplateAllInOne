<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default {
  name: "Home",

  setup() {
    const { t } = useI18n();
    const store = useStore();

    onMounted(() => {
      let bodyElement = document.body;

      bodyElement.classList.add("app-background");

      let htmlElement = document.documentElement;

      let theme = localStorage.getItem("theme");

      if (theme === "dark") {
        htmlElement.setAttribute("theme", "dark");
      } else {
        htmlElement.setAttribute("theme", "light");
      }
    });

    return {};
  },
};
</script>

<style lang="scss">
@import "./styles/index";
button {
  overflow: hidden;
}
body {
  --van-popover-dark-background-color: linear-gradient(
    104.11deg,
    rgba(72, 76, 87, 1) -39.79%,
    rgba(29, 31, 35, 1) 132.69%
  );
  .van-popover__action-text:after {
    border-bottom-width: 0px;
  }
}
</style>
