<template>
  <label class="switch">
    <input type="checkbox" v-model="mode" />
    <span class="slider round"></span>
  </label>
</template>

<script>
import { onMounted, ref, watch } from "vue";

import { useStore } from "vuex";

export default {
  name: "SwitchMode",

  setup() {
    const store = useStore();

    const mode = ref(false);

    watch(
      () => mode.value,
      (newValue, oldValue) => {
        let htmlElement = document.documentElement;

        if (mode.value) {
          store.dispatch("setMode", "dark");
          localStorage.setItem("theme", "dark");
          htmlElement.setAttribute("theme", "dark");
        } else {
          store.dispatch("setMode", "light");
          localStorage.setItem("theme", "light");
          htmlElement.setAttribute("theme", "light");
        }
      }
    );

    onMounted(() => {
      let bodyElement = document.body;

      bodyElement.classList.add("app-background");

      let htmlElement = document.documentElement;

      let theme = localStorage.getItem("theme");

      if (theme === "dark") {
        htmlElement.setAttribute("theme", "dark");
        mode.value = true;
      } else {
        htmlElement.setAttribute("theme", "light");
        mode.value = false;
      }
    });

    return {
      mode,
    };
  },
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: px2rem(96);
  height: px2rem(48);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--switch-color);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: px2rem(24);
  width: px2rem(24);
  left: px2rem(16);
  bottom: px2rem(12);
  background: rgba(255, 255, 255, 1);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--switch-color);
}

input:focus + .slider {
  box-shadow: 0 0 px2rem(2) var(--switch-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(px2rem(42));
  -ms-transform: translateX(px2rem(42));
  transform: translateX(px2rem(42));
}

/* Rounded sliders */
.slider.round {
  border-radius: px2rem(64);
}

.slider.round:before {
  border-radius: 50%;
}
</style>
