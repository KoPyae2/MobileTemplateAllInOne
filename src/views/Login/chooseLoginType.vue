<template>
  <div
    :class="lightMode ? 'chooeLoginType' : 'chooeLoginType chooeLoginType_dark'"
  >
    <Nav :title="title" :return="login" />

    <div class="box_con">
      <div
        class="box"
        v-for="(item, index) in data"
        :key="index"
        @click="goLogin(item)"
      >
        <img class="left" :src="item.img" />
        <p class="label">{{ item.title }}</p>
        <img class="end" src="../../assets/account/arrow.png" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  onMounted,
  defineComponent,
  toRefs,
  ref,
  watch,
} from "vue";

import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import LanguagePopup from "@/components/LanguagePopup/index.vue";
import { useRouter, useRoute } from "vue-router";
import Nav from "../../components/CommonNav/index.vue";
export default {
  name: "chooeLoginType",
  components: { Nav },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      data: [
        // {
        //   id: 3,
        //   img: new URL(`../../assets/login/phone.png`, import.meta.url).href,
        //   title: t("login.loginWithPhone"),
        // },
        // {
        //   id: 2,
        //   img: new URL(`../../assets/login/mail.png`, import.meta.url).href,
        //   title: t("login.loginWithEmail"),
        // },
        // {
        //   id: 1,
        //   img: new URL(`../../assets/login/user.png`, import.meta.url).href,
        //   title: t("login.loginWithUsername"),
        // },
      ],
      check: "",
      title: t("login.moreLoginMethos"),
      return: "/login",
    });

    const goLogin = (data) => {
      store.commit("SET_LOGIN_TYPE", data.id);
      if (state.check == "register") {
        router.push("/register");
      } else {
        router.push("/login");
      }
    };

    const createData = () => {
      let loginMethod = store.state.user.login_method;
      if (state.check == "register") {
        if (loginMethod.username == 1) {
          state.data.push({
            id: 1,
            img: new URL(`../../assets/login/user.png`, import.meta.url).href,
            title: t("login.registerWithUsername"),
          });
        }
        if (loginMethod.email == 1) {
          state.data.push({
            id: 2,
            img: new URL(`../../assets/login/mail.png`, import.meta.url).href,
            title: t("login.registerWithEmail"),
          });
        }
        if (loginMethod.phone == 1) {
          state.data.push({
            id: 3,
            img: new URL(`../../assets/login/phone.png`, import.meta.url).href,
            title: t("login.registerWithPhone"),
          });
        }
      } else {
        if (loginMethod.username == 1) {
          state.data.push({
            id: 1,
            img: new URL(`../../assets/login/user.png`, import.meta.url).href,
            title: t("login.loginWithUsername"),
          });
        }
        if (loginMethod.email == 1) {
          state.data.push({
            id: 2,
            img: new URL(`../../assets/login/mail.png`, import.meta.url).href,
            title: t("login.loginWithEmail"),
          });
        }
        if (loginMethod.phone == 1) {
          state.data.push({
            id: 3,
            img: new URL(`../../assets/login/phone.png`, import.meta.url).href,
            title: t("login.loginWithPhone"),
          });
        }
      }
    };

    onMounted(() => {
      let lg_type = store.state.user.login_type;

      state.check = route.query.method;
      if (state.check == "register") {
        state.title = t("login.moreRegisterMethos");
        state.return = "/register";
      }
      createData();
      state.data = state.data.filter((ele) => {
        return ele.id != lg_type;
      });
    });

    return {
      ...toRefs(state),
      t,
      goLogin,
      lightMode: computed(() =>
        store.state.theme.mode == "light" ? true : false
      ),
    };
  },
};
</script>
<style lang="scss" scoped>
.chooeLoginType {
  padding-top: var(--van-nav-bar-height);
  height: calc(100vh - var(--van-nav-bar-height));
  overflow-y: scroll;
  background: #fff;
  .box_con {
    padding-top: px2rem(48);
    .box {
      width: px2rem(732);
      height: px2rem(96);
      border-radius: px2rem(16);
      border: px2rem(2) solid rgba(239, 239, 239, 1);
      background: rgba(255, 255, 255, 1);
      margin: 0 auto;
      margin-bottom: px2rem(48);
      display: flex;
      align-items: center;

      img {
        width: px2rem(48);
        height: px2rem(48);
        -webkit-filter: grayscale(1) invert(1);
        filter: grayscale(1) invert(1);
      }
      .left {
        margin-left: px2rem(24);
      }
      p {
        width: px2rem(560);
        padding-left: px2rem(24);
        color: rgb(66, 66, 66);
        font-family: SF Pro;
        font-size: px2rem(32);
      }
    }
  }
}

.chooeLoginType_dark {
  background: linear-gradient(
    104.11deg,
    rgba(72, 76, 87, 1) -39.79%,
    rgba(29, 31, 35, 1) 132.69%
  );
  .van-nav-bar {
    background: transparent;
    transform: scale(1);
  }
  .box_con {
    padding-top: px2rem(48);
    .box {
      background: transparent;
      border: px2rem(2) solid #4f5664;
      img {
        filter: none;
        opacity: 0.4;
      }
      .left {
        margin-left: px2rem(24);
      }
      p {
        color: #fff;
      }
    }
  }
}
</style>
