<template>
  <div :class="lightMode ? 'login' : 'login login_dark'">
    <Nav :left-arrow="false" />
    <p class="title">{{ t("login.loginPls") }}</p>

    <div class="input_con" v-if="register_type == 1">
      <CommonInput
        type="text"
        :placeholder="t('login.username')"
        v-model.trim="username"
      />
    </div>

    <div class="input_con" v-if="register_type == 2">
      <CommonInput
        type="email"
        :placeholder="t('login.email')"
        v-model.trim="email"
      />
    </div>

    <div class="input_con" v-if="register_type == 3">
      <CommonInput
        v-model.trim="phone"
        :placeholder="t('login.mobileNumber')"
        type="digit"
      >
        <template #left>
          <AreaSelectAction v-model="phone_area_code"></AreaSelectAction>
        </template>
      </CommonInput>
    </div>

    <div class="input_con">
      <CommonInput
        :placeholder="t('login.password')"
        type="password"
        v-model.trim="password"
      />
    </div>

    <div class="footer">
      <p class="sologram">
        {{ t("login.t1") }}
        <span class="gold" @click="goRoute('/agreements/service')">
          {{ t("login.t1_1") }}</span
        >
        {{ t("login.and") }}
        <span class="gold" @click="goRoute('/agreements/privacy')">
          {{ t("login.t1_2") }}</span
        >
      </p>
      <button class="btn" @click="login" :disabled="password.length < 6">
        {{ t("login.login") }}
      </button>
      <p class="link">
        {{ t("login.welcome1") }}
        <span class="register" @click="goLink('register')">{{
          t("login.register")
        }}</span>
      </p>
    </div>

    <van-divider
      class="divider"
      :style="
        lightMode
          ? {
              borderColor: 'rgba(238, 238, 238, 1)',
              padding: '0 60px',
            }
          : {
              borderColor: '#4F5664',
              padding: '0 60px',
            }
      "
    >
      <span class="divider_text">{{ t("login.orContinue") }}</span>
    </van-divider>

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
      </div>

      <div class="thirdParty" @click="LoginWithGoogle">
        <img
          v-if="lightMode"
          src="../../../public/share/google.png"
          alt="google"
        />
        <img v-else src="../../../public/share/google_dark.png" alt="google" />
      </div>

      <!-- <div class="thirdParty" @click="LoginWithTwitter">
        <img
          v-if="lightMode"
          src="../../../public/share/twitter.png"
          alt="facebook"
        />
        <img
          v-else
          src="../../../public/share/twitter_dark.png"
          alt="twitter"
        />
      </div> -->
    </div>

    <p class="link1" v-if="register_method.length != 1">
      {{ t("login.moreLoginMethos") }},
      <span class="register" @click="goLink('chooseLoginMethod')">{{
        t("login.toSwitch")
      }}</span>
    </p>

    <div id="root"></div>
  </div>
</template>

<script>
import {
  defineProps,
  reactive,
  onMounted,
  defineComponent,
  toRefs,
  watch,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Nav from "../../components/CommonNav/index.vue";
import { Toast, Notify } from "vant";
import CommonInput from "../../components/CommonInput/index.vue";
import AreaSelectAction from "../../components/AreaSelection/index.vue";
import {
  userLogin,
  loginwithGoogleApi,
  loginwithFacebookApi,
  userConfig,
} from "../../api/user.js";
import md5 from "blueimp-md5";
import { useStore } from "vuex";
import languageList from "@/json/countryName.json";
import { changeLang } from "@/locales/i18n";

import {
  googleAuthCodeLogin,
  googleTokenLogin,
  googleSdkLoaded,
} from "vue3-google-login";
export default defineComponent({
  name: "login",
  components: {
    Nav,
    CommonInput,
    AreaSelectAction,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { t } = useI18n();
    const state = reactive({
      username: "",
      email: "",
      phone: "",
      phone_area_code: "+66",
      password: "",
      register_type: 2,
      showPop: true,
      loading: false,
      callbackData: {},
      register_method: [],
    });

    const goLink = (link) => {
      router.push(`/${link}`);
    };

    const login = () => {
      let param = {};
      if (state.register_type == 1) {
        param = {
          username: state.username,
          password: md5(state.password),
        };
      } else if (state.register_type == 2) {
        param = {
          username: state.email,
          password: md5(state.password),
        };
      } else if (state.register_type == 3) {
        param = {
          username: `${state.phone_area_code}-${state.phone}`,
          password: md5(state.password),
        };
      }

      userLogin(param).then((res) => {
        if (res.code === 0) {
          Notify({ type: "success", message: t("login.loginSuccess") });
          store.commit("SET_TOKEN", res.data.accessToken);
          store.dispatch("getUserInfo");
          setTimeout(() => {
            router.push("/");
          }, 400);
        }
      });
    };

    const LoginWithFacebook = () => {
      FB.login(function (response) {
        let param = {
          access_token: response.authResponse.accessToken,
          expires_in: response.authResponse.expiresIn,
          singed_request: response.authResponse.signedRequest,
          user_id: response.authResponse.userID,
        };
        callbackFacebook(param);
      });
    };
    const callbackGoogle = (param) => {
      loginwithGoogleApi(param)
        .then((res) => {
          if (res.code == 0) {
            state.loading = false;
            Notify({ type: "success", message: t("login.loginSuccess") });
            store.commit("SET_TOKEN", res.data.accessToken);
            store.dispatch("getUserInfo");
            setTimeout(() => {
              router.push("/");
            }, 400);
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };
    const callbackFacebook = (param) => {
      loginwithFacebookApi(param)
        .then((res) => {
          if (res.code == 0) {
            state.loading = false;
            Notify({ type: "success", message: t("login.loginSuccess") });
            store.commit("SET_TOKEN", res.data.accessToken);
            store.dispatch("getUserInfo");
            setTimeout(() => {
              router.push("/");
            }, 400);
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };
    const LoginWithGoogle = () => {
      googleTokenLogin().then((response) => {
        console.log(response);
        state.loading = true;
        state.callbackData = response;
        callbackGoogle(response);
      });
    };
    const LoginWithTwitter = () => {};

    const popup = () => {
      return false;
    };

    const facebookSDK = () => {
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      window.fbAsyncInit = function () {
        FB.init({
          appId: import.meta.env.VITE_FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: "v14.0",
        });
      };
    };

    const storeLoginType = () => {
      state.register_type = store.state.user.login_type;
      let ownLanguage = store.state.user.ownLanguage;
      userConfig().then((res) => {
        if (res.code == 0) {
          let data = {
            username: res.data.register_username,
            email: res.data.register_email,
            phone: res.data.register_phone,
          };
          let iso_name = languageList.filter((ele) => {
            return ele.id == res.data.default_language;
          });
          store.commit("SET_LOGIN_METHOD", data);

          if (ownLanguage == null) {
            store.commit("SET_LANGID", res.data.default_language);
            changeLang(iso_name[0].iso_code);
          }

          if (state.register_type == 1) {
            if (data.username != 1) {
              state.register_type = 2;
              store.commit("SET_LOGIN_TYPE", state.register_type);
            }
          }

          if (state.register_type == 2) {
            if (data.email != 1) {
              state.register_type = 3;
              store.commit("SET_LOGIN_TYPE", state.register_type);
            }
          }

          if (state.register_type == 3) {
            if (data.phone != 1) {
              state.register_type = 1;
              store.commit("SET_LOGIN_TYPE", state.register_type);
            }
          }

          if (data.username == 1) {
            state.register_method.push({
              id: 1,
              title: t("login.loginWithUsername"),
            });
          }

          if (data.email == 1) {
            state.register_method.push({
              id: 2,
              title: t("login.loginWithEmail"),
            });
          }

          if (data.phone == 1) {
            state.register_method.push({
              id: 3,
              title: t("login.loginWithPhone"),
            });
          }
        }
      });
    };

    const goRoute = (data) => {
      router.push(data);
    };

    onMounted(() => {
      facebookSDK();
      storeLoginType();
    });
    return {
      ...toRefs(state),
      popup,
      t,
      goLink,
      login,
      LoginWithFacebook,
      LoginWithGoogle,
      LoginWithTwitter,
      goRoute,
      lightMode: computed(() =>
        store.state.theme.mode == "light" ? true : false
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: calc(100vh - var(--van-nav-bar-height));
  background: #fff;
  padding-top: var(--van-nav-bar-height);
  overflow-y: scroll;
  .title {
    margin-bottom: px2rem(64);
    padding-left: px2rem(48);
    padding-top: px2rem(32);
    color: rgba(66, 66, 66, 1);
    font-family: SF Pro;
    font-weight: bold;
    font-size: px2rem(64);
  }
  .input_con {
    width: px2rem(732);
    margin: 0 auto;
    margin-bottom: px2rem(48);
  }
  .footer {
    text-align: center;
    margin: px2rem(96) 0px px2rem(30) 0px;
    //position: absolute;
    //left: 50%;
    //bottom: px2rem(48);
    //transform: translatex(-50%);
    .sologram {
      color: rgba(66, 66, 66, 1);
      font-family: SF Pro;
      font-size: px2rem(24);
      margin-bottom: px2rem(36);
    }
    .btn {
      width: px2rem(636);
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
      margin-bottom: px2rem(53);
      margin-top: px2rem(13);
      position: relative;

      color: #fff;
      font-family: SF Pro;
      font-weight: 500;
      font-size: px2rem(32);
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
    .btn:disabled {
      opacity: 0.5;
      &:active {
        transform: scale(1);
      }
    }
  }
  .gold,
  .register {
    color: rgba(255, 153, 0, 1);
  }
  .divider {
    margin-top: px2rem(320);
    .divider_text {
      color: rgba(191, 191, 191, 1);
      font-family: SF Pro;
      font-weight: bold;
      font-size: px2rem(32);
    }
  }

  .thirdParty_con {
    width: px2rem(636);
    height: px2rem(96);

    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    .thirdParty {
      width: px2rem(144);
      height: px2rem(96);
      border-radius: px2rem(16);
      border: px2rem(2) solid rgba(239, 239, 239, 1);
      display: flex;
      justify-content: center;
      img {
        width: px2rem(48);
        height: px2rem(48);
        align-self: center;
      }
    }
  }
  .link1 {
    text-align: center;
    padding: px2rem(53);
  }
  --van-popup-background-color: transparent;
}

.login_dark :deep(.van-nav-bar__title),
.login_dark :deep(.van-nav-bar .van-icon) {
  color: rgba(255, 255, 255, 1) !important;
}

.login_dark {
  :deep(.van-nav-bar) {
    border-bottom-width: 0px !important;
    height: 0px;
  }
  background: linear-gradient(
    104.11deg,
    rgba(72, 76, 87, 1) -39.79%,
    rgba(29, 31, 35, 1) 132.69%
  );
  .van-nav-bar {
    background: linear-gradient(
      94.1deg,
      rgba(60, 63, 72, 1) 6.6%,
      rgba(58, 61, 70, 1) 21.56%,
      rgba(56, 59, 67, 1) 36.15%,
      rgba(55, 58, 66, 1) 47.38%,
      rgba(53, 57, 65, 1) 52.84%,
      rgba(53, 56, 64, 1) 58.17%,
      rgba(52, 55, 62, 1) 64.26%,
      rgba(50, 53, 60, 1) 70.44%,
      rgba(51, 54, 61, 1) 76.4%,
      rgba(49, 52, 59, 1) 85.02%,
      rgba(48, 51, 58, 1) 91.29%,
      rgba(47, 50, 57, 1) 97.8%,
      rgba(46, 49, 56, 1) 103%,
      rgba(45, 48, 55, 1) 110.55%,
      rgba(45, 48, 54, 1) 118.26%,
      rgba(43, 46, 52, 1) 125.53%,
      rgba(42, 45, 51, 1) 132.74%,
      rgba(41, 44, 50, 1) 140.58%,
      rgba(40, 43, 49, 1) 147.41%
    );
  }
  .title {
    color: #fff;
  }
  .input_con {
    .common-input,
    .van-field {
      background: transparent !important;
      border: px2rem(3) solid #4f5664;
    }
  }
  .footer {
    .sologram {
      color: #fff;
    }
    .btn {
      background: linear-gradient(
        101.18deg,
        rgba(50, 52, 59, 1) 23.52%,
        rgba(114, 117, 129, 0) 239.04%
      );
      box-shadow: 0px px2rem(32) px2rem(64) rgba(0, 0, 0, 0.25);
      color: #fff;
      overflow: hidden;
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
  }
  .link {
    color: #fff;
  }
  .gold,
  .register {
    color: rgba(102, 107, 121, 1);
  }
  .divider {
    .divider_text {
      color: #fff;
    }
  }

  .thirdParty_con {
    .thirdParty {
      border-color: #4f5664;
      img {
        width: px2rem(48);
        height: px2rem(48);
        align-self: center;
      }
    }
  }
  .link1 {
    color: #fff;
    span {
      color: rgba(79, 86, 100, 1);
    }
  }
}
</style>
