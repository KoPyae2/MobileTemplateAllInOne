<template>
  <div :class="lightMode ? 'areaCode' : 'areaCode areaCode_dark'">
    <div @click="state.show = true" class="select-arae">
      <img :src="getImageUrl(state.image)" alt="service" class="flag" />
      <span>{{ modelValue }} </span>
      <van-icon name="arrow-down" />
    </div>
    <van-popup v-model:show="state.show" round position="bottom" class="main">
      <div class="content">
        <van-search
          class="search"
          v-model="search_num"
          :placeholder="state.search"
          @input="search"
          :clearable="false"
          type="number"
        />
        <van-picker
          :confirm-button-text="state.confirmText"
          :cancel-button-text="state.cancelText"
          :columns="search_num == '' ? columns : filterNum"
          value-key="dialingCode"
          @cancel="onCancle"
          @confirm="onConfirm"
        />
        <p class="noData" v-if="filterNum.length === 0">
          {{ t("common.noData") }}
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  reactive,
  defineProps,
  defineEmits,
  onMounted,
  computed,
  onUpdated,
} from "vue";
import phoneCodes from "../../json/phoneCode.json";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

defineProps({
  modelValue: {
    default: "",
    type: String,
  },
});
const { t } = useI18n();
const search_num = ref("");
const store = useStore();
const emit = defineEmits(["update:modelValue", "update:image"]);
const state = reactive({
  show: false,
  image: "GB",
  confirmText: t("common.confirmText"),
  cancelText: t("common.cancelText"),
  search: t("common.search"),
});
let areacode = computed(() => store.state.user.user.phone_area_code);

let columns = phoneCodes.sort(function (a, b) {
  return a.dialingCode - b.dialingCode;
});
let lightMode = computed(() =>
  store.state.theme.mode == "light" ? true : false
);
const onConfirm = (v) => {
  state.show = false;
  emit("update:modelValue", v.dialingCode);
  state.image = v.iso_code;
};

const onCancle = () => {
  state.show = false;
  search_num.value = "";
};

const getImageUrl = (name) => {
  return new URL(`../../assets/flags/${name}.png`, import.meta.url).href;
};

let filterNum = ref([{ columns }]);

const search = () => {
  if (search_num.value !== "") {
    let filter = columns.filter((ele) => {
      return ele.dialingCode.includes(search_num.value);
    });
    filterNum.value = filter;
  }
};

onUpdated(() => {
  search();
});

onMounted(() => {
  // axios
  //   .get(
  //     "https://api.ipdata.co/?api-key=a47d7f6b2b0396883884bbf075a6428e005589e3704f0bf25422eacb"
  //   )
  //   .then((response) => {
  //     if (!areacode.value) {
  //       if (response.data.country_code) {
  //         state.image = response.data.country_code;
  //       }
  //     } else {
  //       let code = phoneCodes.find(
  //         (cc) => cc.dialingCode == `+${areacode.value}`
  //       );
  //       state.image = code.iso_code;
  //     }
  //   });
});
</script>

<style lang="scss">
.areaCode {
  .select-arae {
    display: flex;
    align-items: flex-end;
    font-size: px2rem(32);
    // width: px2rem(160);
    margin-right: px2rem(32);
    span {
      margin-left: px2rem(6.8);
      margin-right: px2rem(16);
      line-height: px2rem(45);
    }
  }
  .van-picker__confirm {
    color: rgb(255, 153, 0);
  }

  .flag {
    height: px2rem(32);
    margin-bottom: px2rem(6);
  }

  .search {
    width: px2rem(300);
    background: red;
    left: 50%;
    transform: translate(-50%, px2rem(-4));
    position: absolute;
    z-index: 99;
    padding-left: px2rem(30);
    background: #fff;
    border-radius: px2rem(16);
    .van-cell {
      border: 1px solid rgb(227, 229, 229);
      display: flex;
      align-items: center;
    }
  }
  .van-picker__columns {
    position: relative !important;
  }
  .noData {
    color: rgb(148, 187, 190);
    z-index: 9999;
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}

.areaCode_dark {
  --van-picker-background-color: rgba(40, 42, 47, 1);
  --van-picker-option-text-color: #fff;

  .van-picker__toolbar {
    //background: rgba(40, 42, 47, 1) !important;
    color: #fff !important;
  }
  .van-picker {
    //background-color: rgba(40, 42, 47, 1) !important;
  }
  .van-picker-column {
    //background: green !important;
  }
  .van-picker__mask {
    background: none;
  }
  .van-picker-column__wrapper {
    //background: red !important;
  }
  .van-picker__frame {
    border-top: px2rem(2) solid #4f5664;
    border-bottom: px2rem(2) solid #4f5664;
  }

  .select-arae {
    span,
    i {
      color: #fff;
    }
  }

  .search {
    background: transparent;
    border-radius: px2rem(16);
    .van-cell {
      border: 1px solid #4f5664;
      display: flex;
      align-items: center;
    }
  }
  .van-picker__columns {
    position: relative !important;
  }
  .noData {
    color: rgb(148, 187, 190);
    z-index: 9999;
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
