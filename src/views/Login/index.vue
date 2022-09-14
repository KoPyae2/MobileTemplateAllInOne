<template>
  <div :class="lightMode ? 'login' : 'login login_dark'">
    <div class="header">
      <img class="logo" src="@/assets/home/logo.png" />
      <div class="language" @click="goLanguage">{{ t("home.language") }}</div>
    </div>

    <div class="intro">
      <p class="label">{{ t("login.welcome") }}</p>
      <van-swipe class="swipe" :autoplay="3000">
        <van-swipe-item>
          <img src="/home/camera.png" alt="" />
        </van-swipe-item>
        <van-swipe-item><img src="/home/camera.png" alt="" /></van-swipe-item>
        <van-swipe-item><img src="/home/camera.png" alt="" /></van-swipe-item>
        <van-swipe-item><img src="/home/camera.png" alt="" /></van-swipe-item>
      </van-swipe>
    </div>

    <div class="thirdParty_con">
      <div class="thirdParty" @click="LoginWithFacebook">
        <img
          v-if="lightMode"
          src="../../../public/share/facebook.png"
          alt="facebook"
        />
        <img
          v-else
          src="../../../public/share/facebook-dark.png"
          alt="facebook"
        />
        <span class="label">使用Facebook登录</span>
      </div>
      <div class="thirdParty" @click="LoginWithGoogle">
        <img
          v-if="lightMode"
          src="../../../public/share/google.png"
          alt="google"
        />
        <img v-else src="../../../public/share/google_dark.png" alt="google" />
        <span class="label">使用Google登录</span>
      </div>
      <div class="thirdParty" @click="LoginWithTwitter">
        <img
          v-if="lightMode"
          src="../../../public/share/twitter.png"
          alt="twitter"
        />
        <img
          v-else
          src="../../../public/share/twitter_dark.png"
          alt="twitter"
        />
        <span class="label">使用Twitter登录</span>
      </div>
    </div>

    <van-divider
      class="divider"
      :style="{
        borderColor: 'rgba(238, 238, 238, 1)',
        padding: '0 50px',
      }"
    >
      <span class="divider_text">或</span>
    </van-divider>

    <button class="btn" @click="goLink('login')">{{ t("login.login") }}</button>

    <p class="link">
      {{ t("login.welcome1") }}
      <span @click="goLink('register')" class="register">
        {{ t("login.welcome2") }}</span
      >
    </p>
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
import { useRouter } from "vue-router";
import {
  googleAuthCodeLogin,
  googleTokenLogin,
  googleSdkLoaded,
} from "vue3-google-login";
export default {
  name: "login",
  components: { LanguagePopup },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const router = useRouter();

    const state = reactive({
      loading: false,
    });

    const goLink = (link) => {
      router.push(`/${link}`);
    };

    const LoginWithFacebook = () => {
      console.log("facebook");
    };
    const LoginWithGoogle = () => {
      googleTokenLogin().then((response) => {
        state.loading = true;
        console.log("Handle the response", response);
      });
    };
    const LoginWithTwitter = () => {
      console.log("twitter");
    };
    const popup = () => {
      return false;
    };
    const goLanguage = () => {
      router.push("/languages");
    };

    return {
      ...toRefs(state),
      t,
      goLanguage,
      popup,
      goLink,
      LoginWithFacebook,
      LoginWithGoogle,
      LoginWithTwitter,
      lightMode: computed(() =>
        store.state.theme.mode == "light" ? true : false
      ),
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  height: 100vh;
  overflow-y: scroll;
  .header {
    width: px2rem(828);
    height: px2rem(96);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 100;
    img {
      width: px2rem(282);
      height: px2rem(48);
      margin-left: px2rem(272);
    }
    .language {
      color: rgba(66, 66, 66, 1);
      font-family: SF Pro;
      font-size: px2rem(32);
      line-height: 40px;
      margin-right: px2rem(48);
    }
  }
  .intro {
    position: relative;
    .swipe {
      --van-swipe-indicator-active-background-color: rgba(255, 120, 2, 1);
      --van-swipe-indicator-inactive-background-color: rgba(239, 239, 239, 1);
      --van-swipe-indicator-size: 8px;
      --van-swipe-indicator-margin: 8px;
      --van-swipe-indicator-inactive-opacity: 1;
      height: px2rem(772);
      position: relative;
      img {
        width: px2rem(636);
        height: px2rem(636);
        margin-top: px2rem(72);
        margin-left: px2rem(96);
      }
    }
    .label {
      width: 100%;
      position: absolute;
      bottom: px2rem(68);
      text-align: center;

      color: rgba(66, 66, 66, 1);
      font-family: SF Pro;
      font-weight: bold;
      font-size: px2rem(48);
    }
  }

  .thirdParty_con {
    width: px2rem(636);
    height: px2rem(384);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: px2rem(48);
    .thirdParty {
      width: px2rem(636);
      height: px2rem(96);
      border-radius: px2rem(16);
      border: px2rem(2) solid rgba(239, 239, 239, 1);
      background: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      img {
        width: px2rem(48);
        height: px2rem(48);
        margin-left: px2rem(188);
        margin-right: px2rem(33);
      }
      span {
        color: rgba(191, 191, 191, 1);
        font-family: SF Pro;
        font-size: px2rem(32);
      }
    }
  }
  .divider {
    --van-divider-line-height: 40px;
    .divider_text {
      color: rgba(191, 191, 191, 1);
      font-family: SF Pro;
      font-weight: bold;
      font-size: px2rem(32);
    }
  }
  .btn {
    display: block;
    width: px2rem(638);
    height: px2rem(80);
    border-radius: px2rem(48);
    background: linear-gradient(
        149.21deg,
        rgba(255, 203, 82, 1) 2.42%,
        rgba(255, 120, 2, 1) 100.5%
      ),
      linear-gradient(
        101.18deg,
        rgba(249, 249, 249, 1) 23.52%,
        rgba(200, 200, 200, 1) 239.04%
      );
    box-shadow: 0px px2rem(20) px2rem(40) rgba(255, 130, 12, 0.2);
    margin: 0 auto;
    margin-top: px2rem(32);
    position: relative;

    color: #fff;
    font-family: SF Pro;
    font-weight: 500;
    font-size: px2rem(32);
    overflow: hidden;
    &:active {
      transform: scale(0.98);
    }
  }
  .btn::before {
    content: "";
    width: px2rem(35.7);
    height: px2rem(64);
    background: rgba(255, 255, 255, 1);
    filter: blur(px2rem(28));
    position: absolute;
    left: 0;
    top: px2rem(7.7);
  }

  .link {
    display: block;
    width: 100%;
    text-align: center;
    color: rgba(66, 66, 66, 1);
    font-family: SF Pro;
    font-weight: 600;
    font-size: px2rem(32);
    margin: px2rem(53) 0;
    .register {
      color: rgba(255, 153, 0, 1);
    }
  }
  --van-popup-background-color: transparent;
}

.login_dark {
  background: linear-gradient(
    104.11deg,
    rgba(72, 76, 87, 1) -39.79%,
    rgba(29, 31, 35, 1) 132.69%
  );
  .header {
    .language {
      color: #fff;
    }
    img {
      -webkit-filter: brightness(0) invert(1); /* Safari/Chrome */
      filter: brightness(0) invert(1);
    }
  }
  .intro {
    .swipe {
      --van-swipe-indicator-active-background-color: #fff;
      --van-swipe-indicator-inactive-background-color: rgba(85, 85, 85, 1);
    }
    .label {
      color: #fff;
    }
  }

  .thirdParty_con {
    .thirdParty {
      background: transparent;
      border-color: #4f5664;
      span {
        color: #fff;
      }
    }
  }
  .divider {
    .divider_text {
      color: rgba(191, 191, 191, 1);
    }
  }
  .btn {
    background: linear-gradient(
      101.18deg,
      rgba(50, 52, 59, 1) 23.52%,
      rgba(114, 117, 129, 0) 239.04%
    );
    box-shadow: 0px px2rem(32) px2rem(64) rgba(0, 0, 0, 0.25);
  }
  .btn::before {
    content: "";
    width: px2rem(254);
    height: px2rem(57);
    background: rgba(107, 113, 129, 1);
    filter: blur(px2rem(28));
    left: 0;
    top: 0;
  }

  .link {
    color: #fff;
    .register {
      color: rgba(102, 107, 121, 1);
    }
  }
}
</style>
