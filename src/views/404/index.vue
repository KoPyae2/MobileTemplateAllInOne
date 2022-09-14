<template>
  <div :class="theme == 'dark' ? 'not-found dark' : 'not-found'">
    <Nav class="nav" title="" />
    <h1>404</h1>
  </div>
</template>
<script>
import { computed, onMounted, onUpdated } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
import shareLinks from "@/utils/shareLinks";
import Nav from "../../components/CommonNav/index.vue";

export default {
  name: "RechargeSubmit",
  components: {
    Nav,
  },
  setup() {
    const store = useStore();
    const theme = computed(() => store.state.theme.mode);
    onMounted(() => {});

    return {
      theme,
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  height: 100vh;
  color: #111;
  background: rgba(255, 255, 255, 1);
  .nav {
    background: rgba(255, 255, 255, 1);
  }
  h1 {
    margin: 0 auto;
  }
}
.dark {
  color: rgba(255, 255, 255, 1);
  background: rgba(31, 33, 37, 1);

  .nav {
    background: rgba(31, 33, 37, 1);
  }
  h1 {
    margin: 0 auto;
  }
}
</style>
