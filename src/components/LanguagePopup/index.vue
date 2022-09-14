<template>
  <span
    :class="pageName ? 'home-language' : ''"
    class="language"
    @click="state.langPop = true"
    >{{ t("home.language") }}</span
  >
  <van-popup
    class="language-popup"
    v-model:show="state.langPop"
    round
    position="bottom"
  >
    <van-picker
      :confirm-button-text="t('common.confirmText')"
      :cancel-button-text="t('common.cancelText')"
      :columns="state.columns"
      :columns-field-names="showName"
      @cancel="state.langPop = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { changeLang } from "@/locales/i18n";
import languageList from "@/json/countryName.json";

defineProps({
  pageName: {
    default: false,
    type: Boolean,
  },
});
const { t } = useI18n();
const store = useStore();
let lang = computed(() => store.state.user.lang);

const state = reactive({
  langPop: false,
  columns: languageList || [],
  languageCurrent: "",
});

const onConfirm = (value, index) => {
  store.commit("SET_LANGID", value.id);
  changeLang(value.iso_code);
  state.langPop = false;
};
const onCancel = () => {
  state.langPop = false;
};

const showName = {
  text: "showName",
};
</script>

<style lang="scss" scoped>
.language {
  flex: 1;
  line-height: px2rem(96);
  color: var(--theme-text);

  font-weight: 500;
  padding: 0 0 0 px2rem(24);
  font-size: px2rem(34);
  text-align: center;
  &.home-language {
    padding-right: px2rem(24);
  }
}
.language-popup {
  z-index: 100;
}
</style>
