<template>
  <div class="account">Account</div>
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

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Toast } from "vant";

export default defineComponent({
  name: "account",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
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
.account {
  text-align: center;
}
</style>
