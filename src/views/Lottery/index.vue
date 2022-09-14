<template>
  <div class="center">Center</div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  ref,
  computed,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "center",
  components: {},
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

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
.center {
  text-align: center;
}
</style>
