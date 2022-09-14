<template>
  <div class="no-data">
    <img v-if="lightMode" src="../../assets/images/nodata.png" />
    <img v-else src="../../assets/images/nodata_dark.png" />
    <p :style="lightMode ? 'color:' : 'color:rgba(102, 107, 121, 1);'">
      {{ t("common.noData") }}
    </p>
  </div>
</template>

<script>
import { computed, reactive, onMounted, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  name: "NoData",
  components: {},
  setup() {
    const store = useStore();
    const { t } = useI18n();
    onMounted(() => {});
    return {
      t,
      lightMode: computed(() =>
        store.state.theme.mode == "light" ? true : false
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //padding-top: calc(var(--van-nav-bar-height) + px2rem(492));
  img {
    width: px2rem(520);
    height: px2rem(350);
    margin-bottom: px2rem(44);
  }
  p {
    color: rgba(66, 66, 66, 1);
    font-family: SF Pro;
    font-size: px2rem(32);
  }
}
</style>
