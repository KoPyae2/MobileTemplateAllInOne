<template>
  <header>
    <span class="name">{{ realTime }}</span>
    <img class="logo" src="@/assets/logo.png" alt="logo" />

    <LanguagePop :pageName="classShow"></LanguagePop>
  </header>
</template>

<script>
import { computed, reactive, onMounted, toRefs, ref } from "vue";
import { getTimeZone } from "@/api/home";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import LanguagePop from "@/components/LanguagePopup/index.vue";

export default {
  name: "Header",
  components: {
    LanguagePop,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const tZone = ref("");
    const realTime = ref("");
    const langPop = ref(false);
    const classShow = ref(true);
    const lang = computed(() => store.state.user.lang);

    const loadRealTime = (zone) => {
      let mine = JSON.parse(localStorage.getItem("vuex-user"));
      if (mine !== null) {
        let monthLang = "";
        if (mine.user.lang == "cn") {
          monthLang = "zh-cn";
        } else if (mine.user.lang == "en") {
          monthLang = "en-US";
        } else {
          monthLang = "es-ES";
        }

        const options = {
            timeZone: import.meta.env.VITE_TIME_ZONE,

            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          },
          formatter = new Intl.DateTimeFormat(monthLang, options);

        realTime.value = formatter.format(new Date());
      } else {
        let monthLang = "es-Es";
        const options = {
            timeZone: import.meta.env.VITE_TIME_ZONE,

            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          },
          formatter = new Intl.DateTimeFormat(monthLang, options);
        realTime.value = formatter.format(new Date());
      }
    };

    onMounted(() => {
      setInterval(() => loadRealTime(tZone.value), 1000);
    });
    return {
      lang,
      langPop,
      t,
      realTime,
      classShow,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: px2rem(96);
  position: fixed;
  background: var(--app-background-color);
  z-index: 3;
  left: 0;
  top: 0;
  display: flex;
  img {
    width: px2rem(204);
    height: px2rem(66);
    margin-top: px2rem(15);
  }
  span {
    flex: 1;
    line-height: px2rem(96);
    color: var(--theme-text);

    font-weight: 500;
    padding: 0 0 0 px2rem(24);
    font-size: px2rem(34);
  }
}
.logo {
  width: px2rem(70);
  height: px2rem(70);
}
</style>
