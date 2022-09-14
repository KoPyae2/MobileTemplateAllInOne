<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    :left-arrow="leftArrow"
    @click-left="onClickLeft()"
    :right-text="rightText"
    @click-right="onClickRight()"
    :fixed="fixed"
    :style="{ fontFamily: 'SF Pro', zIndex: '100' }"
  >
    >
    <template #right v-if="!rightText">
      <slot></slot>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  title: {
    default: "",
    type: String,
  },
  leftText: {
    default: "",
    type: String,
  },
  back: {
    default: true,
    type: Boolean,
  },
  leftArrow: {
    default: true,
    type: Boolean,
  },
  rightText: {
    default: "",
    type: String,
  },
  fixed: {
    default: true,
    type: Boolean,
  },
  return: {
    default: "",
    type: String,
  },
  backToThat: {
    default: null,
    type: Object,
  },
});
const router = useRouter();
const emit = defineEmits(["onClickLeft", "onClickRight"]);
const onClickLeft = () => {
  // if (props.back) {
  //   window.history.go(-1);
  // }

  if (props.return !== "") {
    router.push(props.return);
  } else if (props.backToThat !== null) {
    console.log(props.backToThat);
    let orderDetail = {
      order_number: "",
      own_order: true,
    };
    store.commit("SET_ORDER_ID", orderDetail);
    router.push(props.backToThat);
  } else {
    window.history.go(-1);
  }
  emit("onClickLeft");
};
const onClickRight = () => {
  emit("onClickRight");
};
</script>

<style lang="scss" scoped></style>
