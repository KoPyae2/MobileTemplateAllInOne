<template>
  <div :class="lightMode ? 'common-input' : 'common-input common-input-dark'">
    <slot name="left"></slot>
    <img
      v-if="type == 'password'"
      class="input_icon"
      src="../../assets/login/password.png"
    />
    <img
      class="input_icon1"
      v-if="type == 'email'"
      src="../../assets/login/mail.png"
    />

    <img
      class="input_icon1"
      v-if="type == 'text'"
      src="../../assets/login/user.png"
    />
    <van-field
      class="input"
      v-model.trim="value"
      :error="error"
      :type="state.inputType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :readonly="readonly"
      :error-message="errmsg"
    />
    <!-- error-message="手机号格式错误" -->

    <!-- <input  v-model="value" /> -->
    <!-- <slot name="right"></slot> -->
    <div class="right" @click="click" v-if="type == 'password'">
      <img
        src="../../assets/login/on.png"
        v-if="state.inputType == 'password'"
      />
      <img src="../../assets/login/off.png" v-else />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps([
  "type",
  "placeholder",
  "modelValue",
  "error",
  "maxlength",
  "readonly",
  "errmsg",
]);

const store = useStore();
const state = reactive({
  inputType: "",
});
const value = computed({
  get() {
    return props.modelValue || "";
  },
  set(v) {
    emit("update:modelValue", v);
  },
});

const lightMode = computed(() =>
  store.state.theme.mode == "light" ? true : false
);
function click() {
  state.inputType = state.inputType == "text" ? "password" : "text";
}

onMounted(() => {
  state.inputType = props.type;
});
</script>

<style lang="scss" scoped>
.common-input {
  --van-cell-horizontal-padding: 0;
  border: px2rem(2) solid rgb(227, 229, 229);
  background: #fff;
  border-radius: px2rem(16);
  display: flex;
  align-items: center;
  padding: 0 px2rem(32);
  height: px2rem(96);
  .input_icon1 {
    width: px2rem(48);
    height: px2rem(48);
    margin-right: px2rem(26);
    -webkit-filter: grayscale(1) invert(1);
    filter: grayscale(1) invert(1);
    opacity: 0.4;
  }
  .input_icon {
    width: px2rem(48);
    height: px2rem(48);
    margin-right: px2rem(26);
  }
  .input {
    flex: 1;
    display: flex;
    color: rgba(66, 66, 66, 1);
    font-family: SF Pro;
    font-size: px2rem(32);
    line-height: px2rem(40);
    input {
      width: 95%;
    }
  }
  .right {
    width: px2rem(48);
    height: px2rem(48);
    margin-left: px2rem(20);
    img {
      width: px2rem(48);
    }
  }
}

.common-input-dark {
  .input_icon1 {
    filter: none;
    opacity: 0.3;
  }
}
</style>

<style lang="scss">
.common-input .van-field__error-message {
  position: absolute;
}
.commom-input {
  input::placeholder {
    color: rgba(191, 191, 191, 1);
    font-family: SF Pro;
    font-size: px2rem(32);
  }
  .van-cell {
    position: static;
  }
}

.common-input-dark {
  --van-field-input-text-color: #fff;
  .input {
    background: transparent;
  }
  input::placeholder {
    color: rgba(102, 107, 121, 1);
    font-family: SF Pro;
    font-size: px2rem(32);
  }
  .input_icon {
    opacity: 0.6;
  }
}
</style>
