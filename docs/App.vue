<template>
  <div
  class="pb-32"
    :class="{
      'text-gray-900 bg-white': theme === 'light',
      'text-white bg-gray-800': theme === 'dark'
    }"
  >
    <div class="flex flex-end"><button @click="toggleTheme">Switch theme</button></div>
    <div class="flex justify-center font-medium py-10">
      <div class="flex flex-col text-center">
        <div class="text-3xl font-semibold">Hero icons for Vue.js</div>
        <p class="mt-3 text-gray-600">
          A set of free MIT-licensed high-quality SVG icons as Vue functional
          components.
        </p>
        <div class="mt-4 flex justify-center">
          <nav class="">
            <button
              v-for="tab in tabs"
              :key="tab"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-indigo-600 focus:bg-indigo-50"
              :class="{
                'text-indigo-700 bg-indigo-100': tabSelected === tab
              }"
              @click="changeTab(tab)"
            >
              {{ tab }}
            </button>
          </nav>
        </div>
      </div>
    </div>
    <div class="website-width">
      <form class="relative rounded-md shadow-sm" autocomplete="off">
        <label for="search" class="sr-only">Search</label>
        <input
          id="search"
          v-model="search"
          class="form-input block w-full sm:text-sm sm:leading-5"
          :placeholder="`Search ${countIconsByTab} icons...`"
        />
      </form>
      <div class="mt-4 flex justify-center">
        <Npm
          v-if="tabSelected === 'Outline'"
          name="@vue-hero-icons/outline"
          :theme="theme"
        />
        <Npm
          v-if="tabSelected === 'Solid'"
          name="@vue-hero-icons/solid"
          :theme="theme"
        />
        <Npm
          v-if="tabSelected === 'All'"
          name="@vue-hero-icons/outline @vue-hero-icons/solid"
          :theme="theme"
        />
      </div>
      <div class="mt-4">
      <div v-for="(iconSet, index) in iconSets" :key="index" >
        <div v-if="tabSelected === iconSet.tab || tabSelected === 'All'">
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(iconComponent, index) in filterBySearch(
                iconSet.components
              )"
              :key="index"
            >
              <div
                class="px-4 py-6 shadow cursor-pointer rounded border-2 border-transparent"
                :class="{
                  'bg-gray-700': theme === 'dark',
                  'text-gray-700': theme === 'light',
                  'border-2 border-blue-500':
                    iconSelected === iconComponent.name
                }"
                @click="selectIcon(iconComponent.name, iconSet.tab.toLowerCase())"
              >
                <div class="flex justify-center">
                  <component :is="iconComponent" size="2.3x" />
                </div>
                <p class="flex justify-center mt-3" :class="{
                  'text-gray-400': theme === 'dark',
                  'text-gray-600': theme === 'light',
                }">{{ iconComponent.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </div>
    <IconPreview :iconSelected="iconSelected" :categorySelected="categorySelected" />
  </div>
</template>

<script>
import Npm from "./Npm.vue";
import IconPreview from "./IconPreview.vue";
import * as outlineIcons from "../packages/outline";
import * as solidIcons from "../packages/solid";

const { SearchIcon } = outlineIcons;

export default {
  components: { Npm, IconPreview, SearchIcon },
  data() {
    return {
      theme: "light",
      search: "",
      tabs: ["Outline", "Solid", "All"],
      tabSelected: "Outline",
      iconSelected: "",
      categorySelected: "",
      iconSets: [
        {
          tab: "Outline",
          components: outlineIcons,
          count: Object.keys(outlineIcons).length
        },
        {
          tab: "Solid",
          components: solidIcons,
          count: Object.keys(solidIcons).length
        }
      ]
    };
  },
  computed: {
    countIconsByTab() {
      if (this.tabSelected === "Outline") {
        return Object.keys(outlineIcons).length;
      }
      if (this.tabSelected === "Solid") {
        return Object.keys(solidIcons).length;
      }
      if (this.tabSelected === "All") {
        return (
          Object.keys(outlineIcons).length + Object.keys(solidIcons).length
        );
      }
    }
  },
  methods: {
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
    selectIcon(name, category) {
      this.iconSelected = name;
      this.categorySelected = category
    },
    changeTab(name) {
      this.tabSelected = name;
    },
    filterBySearch(components) {
      return Object.values(components).filter(component =>
        component.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style>
body {
  font: 14px "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.website-width {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
}
</style>
