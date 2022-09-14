<template>
  <div class="home">Home</div>
</template>

<script>
import {
  toRefs,
  reactive,
  onMounted,
  ref,
  computed,
  watch,
  watchEffect,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},
  setup() {
    const { t } = useI18n();

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
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
.home {
  text-align: center;
}
</style>
