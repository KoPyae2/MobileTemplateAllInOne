<template>
  <div class="recharge">Recharge</div>
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
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "recharge",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const { t } = useI18n();
    const state = reactive({});

    onMounted(() => {});

    return {
      ...toRefs(state),
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.recharge {
  text-align: center;
}
</style>
