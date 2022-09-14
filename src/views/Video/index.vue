<template>
  <div class="video">Video</div>
</template>
<script>
import { toRefs, reactive, onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import formatDate from "@/utils/formatDate.js";
import { getRooms, getRoomCategories, getOrders } from "@/api/home.js";
import { Notify } from "vant";
import NoData from "../../components/NoData/index.vue";
import { useRoute, useRouter } from "vue-router";

import { calculateProgress } from "../../utils/calculateProgress.js";

export default {
  name: "video",
  components: { NoData },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();

    const state = reactive({});

    onMounted(() => {});

    return {
      ...toRefs(state),
      t,
    };
  },
};
</script>
<style lang="scss" scoped>
.video {
  text-align: center;
}
</style>
