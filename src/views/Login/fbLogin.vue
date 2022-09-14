<template>
  <div class="fbloigin">
    <!-- <button @click="login()">Login with twitter</button> -->
    <button @click="popup">test</button>

    <van-popup
      v-model:show="chooseTimePopup"
      :round="true"
      position="bottom"
      class="order-popup"
    >
      <div class="date_picker">
        <div class="header">
          <div
            class="select_box active"
            id="one"
            @click="chooseForStartAndEnd(true, $event)"
          >
            aaaaaa
          </div>
          <div
            class="select_box"
            id="two"
            @click="chooseForStartAndEnd(false, $event)"
          >
            bbbbbb
          </div>
          <button class="btn" @click="confimeDate">ok</button>
        </div>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="Choose Date"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import OAuth from "oauthio-web";
import {
  toRefs,
  reactive,
  onMounted,
  ref,
  computed,
  watch,
  watchEffect,
} from "vue";
export default {
  name: "fbLogin",
  components: {},
  setup() {
    const router = useRouter();
    const currentDate = ref(new Date());

    // const OAuth = OAuth();
    const chooseTimePopup = ref(false);
    const popup = () => {
      chooseTimePopup.value = true;
    };

    const login = () => {
      OAuth.OAuth.popup("twitter")
        .done(function (result) {
          result
            .get("/me")
            .done(function (response) {
              //this will display "John Doe" in the console
              console.log(response.name);
            })
            .fail(function (err) {
              //handle error with err
              console.log(err);
            });
        })
        .fail(function (err) {
          //handle error with err
          console.log(err);
        });
    };
    onMounted(() => {
      OAuth.OAuth.initialize("REm8aKjWsthmKXZoVIYXdNn1quy");
    });
    return {
      login,
      popup,
      currentDate,
      chooseTimePopup,
    };
  },
};
</script>

<style lang="scss" scoped>
.date_picker {
  position: relative;
  :deep(.van-picker__toolbar) {
    display: none;
  }
  .header {
    width: px2rem(732);
    margin: 0 auto;
    margin-top: px2rem(64);
    margin-bottom: px2rem(50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select_box {
      width: px2rem(270);
      height: px2rem(64);
      border-radius: px2rem(8);
      background: rgba(239, 239, 239, 1);
      text-align: center;
      line-height: px2rem(64);

      color: rgba(66, 66, 66, 1);
      font-family: SF Pro;
      font-weight: 500;
      font-size: px2rem(24);
    }
    .active {
      border: px2rem(4) solid gold;
    }
    .btn {
      padding: 0 px2rem(30);
      height: px2rem(48);
      border-radius: px2rem(32);
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

      color: #fff;
      color: rgba(255, 255, 255, 1);
      line-height: px2rem(48);
      font-family: SF Pro;
      font-weight: 600;
      font-size: px2rem(28);
      position: relative;
      &::before {
        content: "";
        width: 20%;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        filter: blur(px2rem(28));
      }
      &:active {
        transform: scale(0.98);
      }
      &:disabled {
        opacity: 0.4;
        &:active {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
