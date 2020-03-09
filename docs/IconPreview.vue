<template>
  <div
    v-if="iconComponent && close === false"
    class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5"
  >
    <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-indigo-800 text-white">
              <component :is="iconComponent" />
            </span>
            <p class="ml-3 font-medium text-white code truncate">
              <span class="md:hidden text-xs">
                {{ importCode }}
              </span>
              <span class="hidden md:inline "> {{ importCode }} </span>
            </p>
          </div>
          <div
            class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
          >
            <div class="flex rounded-md shadow-sm">
              <button
                class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                @click="copyToClipboard"
              >
                <span>Copy</span>
              </button>
              <!-- <button
                class="ml-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
              >
                See example
              </button> -->
            </div>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button
              type="button"
              class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 transition ease-in-out duration-150"
              @click="onCloseClick"
            >
              <svg
                class="h-6 w-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "./helpers";
import * as outlineIcons from "../packages/outline";
import * as solidIcons from "../packages/solid";

const allIcons = {
  outline: outlineIcons,
  solid: solidIcons
};

export default {
  components: {},
  props: {
    categorySelected: {},
    iconSelected: {}
  },
  data() {
    return {
      close: false
    };
  },
  computed: {
    iconComponent() {
      return (
        allIcons[this.categorySelected] &&
        allIcons[this.categorySelected][this.iconSelected]
      );
    },
    importCode() {
      return `import { ${this.iconSelected} } from "@vue-hero-icons/${this.categorySelected}"`;
    }
  },
  watch: {
    iconComponent() {
      this.close = false;
    }
  },
  methods: {
    copyToClipboard() {
      copyToClipboard(this.iconSelected);
    },onCloseClick(){
      this.close = true
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.code {
  font-family: Menlo, SFMono-Regular, Consolas, Liberation Mono, monospace;
}
</style>
