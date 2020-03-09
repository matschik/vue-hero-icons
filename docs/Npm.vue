<template>
  <div class="flex cursor-pointer" @click="copy">
    <div
      class=" flex items-center justify-center rounded-tl rounded-bl p-2 inline-block"
      :class="{
        'bg-white': theme === 'dark',
        'bg-gray-800': theme === 'light'
      }"
    >
      <img
        class="w-10"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1NDBweCIgaGVpZ2h0PSIyMTBweCIgdmlld0JveD0iMCAwIDE4IDciPgo8cGF0aCBmaWxsPSIjQ0IzODM3IiBkPSJNMCwwaDE4djZIOXYxSDVWNkgwVjB6IE0xLDVoMlYyaDF2M2gxVjFIMVY1eiBNNiwxdjVoMlY1aDJWMUg2eiBNOCwyaDF2Mkg4VjJ6IE0xMSwxdjRoMlYyaDF2M2gxVjJoMXYzaDFWMUgxMXoiLz4KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxLDUgMyw1IDMsMiA0LDIgNCw1IDUsNSA1LDEgMSwxICIvPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNiwxdjVoMlY1aDJWMUg2eiBNOSw0SDhWMmgxVjR6Ii8+Cjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTEsMSAxMSw1IDEzLDUgMTMsMiAxNCwyIDE0LDUgMTUsNSAxNSwyIDE2LDIgMTYsNSAxNyw1IDE3LDEgIi8+Cjwvc3ZnPgo="
        draggable="false"
      />
    </div>
    <p
      class="rounded-tr rounded-br text-xs flex items-center font-medium py-2 px-4 text-white"
      :class="{
        'bg-gray-200 text-gray-800': theme === 'dark',
        'bg-indigo-600': theme === 'light'
      }"
    >
      <span v-if="showCopyMessage">Copied to clipboard !</span>
      <span v-else class="code">{{ installCommand }}</span>
    </p>
  </div>
</template>

<script>
import { copyToClipboard } from "./helpers";

export default {
  props: {
    name: {},
    theme: {}
  },
  data() {
    return {
      showCopyMessage: false
    };
  },
  computed: {
    installCommand() {
      return `npm i ${this.name}`;
    }
  },
  methods: {
    copy() {
      if(this.showCopyMessage){
        return;
      }
      copyToClipboard(this.installCommand);
      this.showCopyMessage = true;
      setTimeout(() => {
        this.showCopyMessage = false;
      }, 1000)
    }
  }
};
</script>

<style scoped>
.code {
  font-family: Menlo, SFMono-Regular, Consolas, Liberation Mono, monospace;
}
</style>
