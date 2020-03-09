<template>
  <div>
    <div
      class="pb-6"
      :class="{
        'text-gray-900 bg-white': !isDark,
        'text-white bg-gray-800': isDark
      }"
    >
      <div class="flex items-center justify-end bg-gray-800 pt-4">
        <span
          :class="{ 'bg-gray-200': !isDark, 'bg-indigo-600': isDark }"
          class="relative inline-block flex-no-shrink h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
          role="checkbox"
          tabindex="0"
          @click="toggleTheme()"
          @keydown.space.prevent="toggleTheme()"
          :aria-checked="isDark.toString()"
        >
          <span
            aria-hidden="true"
            :class="{ 'translate-x-5': isDark, 'translate-x-0': !isDark }"
            class="relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
          >
            <span
              :class="{
                'opacity-0 ease-out duration-100': isDark,
                'opacity-100 ease-in duration-200': !isDark
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <SunIcon class="h-3 w-3 text-indigo-600" />
            </span>
            <span
              :class="{
                'opacity-100 ease-in duration-200': isDark,
                'opacity-0 ease-out duration-100': !isDark
              }"
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            >
              <MoonIcon class="h-3 w-3 text-indigo-600" />
            </span>
          </span>
        </span>

        <a href="https://github.com/matschik/vue-hero-icons">
          <svg
            class="h-8 text-white hover:text-blue-500 fill-current ml-8 mr-10"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Star me on Github</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            /></svg
        ></a>
      </div>
      <div class="flex justify-center font-medium bg-gray-800 text-white pb-12">
        <div class="flex flex-col text-center">
          <div class="text-3xl font-semibold">Hero icons for Vue.js</div>
          <div class="text-gray-300">
            <p class="mt-3 ">
              A set of free MIT-licensed high-quality SVG icons as Vue
              functional components.
            </p>
            <p class="mt-2">
              Icons sourced from
              <a
                class="text-blue-500"
                href="https://github.com/refactoringui/heroicons"
                >@refactoringui/heroicons</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="my-4 flex justify-center">
        <nav>
          <button
            v-for="tab in tabs"
            :key="tab"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-indigo-600 focus:bg-indigo-50"
            :class="{
              'text-indigo-700 bg-indigo-100': tabSelected === tab
            }"
            @click="changeTab(tab)"
          >
            {{ tab }}
          </button>
        </nav>
      </div>
      <div class="website-width">
        <div class="my-4 flex justify-center">
          <Npm
            v-if="tabSelected === 'Outline'"
            name="@vue-hero-icons/outline"
            :dark="isDark"
          />
          <Npm
            v-if="tabSelected === 'Solid'"
            name="@vue-hero-icons/solid"
            :dark="isDark"
          />
          <Npm
            v-if="tabSelected === 'All'"
            name="@vue-hero-icons/outline @vue-hero-icons/solid"
            :dark="isDark"
          />
        </div>
        <form class="relative rounded-md shadow-sm" autocomplete="off">
          <label for="search" class="sr-only">Search</label>
          <input
            id="search"
            v-model="search"
            class="form-input block w-full sm:text-sm sm:leading-5"
            :placeholder="`Search ${countIconsByTab} icons...`"
          />
        </form>

        <div class="mt-4">
          <div v-for="(iconSet, index) in iconSets" :key="index">
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
                      'bg-gray-700': isDark,
                      'text-gray-700': !isDark,
                      'border-2 border-blue-500':
                        iconSelected === iconComponent.name
                    }"
                    @click="
                      selectIcon(iconComponent.name, iconSet.tab.toLowerCase())
                    "
                  >
                    <div class="flex justify-center">
                      <component :is="iconComponent" size="2.3x" />
                    </div>
                    <p
                      class="flex justify-center mt-3"
                      :class="{
                        'text-gray-400': isDark,
                        'text-gray-600': !isDark
                      }"
                    >
                      {{ iconComponent.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IconPreview
        :iconSelected="iconSelected"
        :categorySelected="categorySelected"
        @close="resetSelectedIcon"
      />
    </div>
    <div
      class="pb-32 font-medium bg-gray-800 pt-8 text-white flex justify-center"
    >
      <p>
        © 2020 Brought by
        <a class="text-blue-500" href="https://github.com/matschik">Matschik</a>
      </p>
    </div>
  </div>
</template>

<script>
import Npm from "./Npm.vue";
import IconPreview from "./IconPreview.vue";
import * as outlineIcons from "../packages/outline";
import * as solidIcons from "../packages/solid";

const { SearchIcon, MoonIcon, SunIcon } = outlineIcons;

export default {
  components: { Npm, IconPreview, SearchIcon, MoonIcon, SunIcon },
  data() {
    return {
      theme: "light",
      isDark: false,
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
      this.isDark = !this.isDark;
    },
    selectIcon(name, category) {
      this.iconSelected = name;
      this.categorySelected = category;
    },
    changeTab(name) {
      this.resetSelectedIcon();
      this.tabSelected = name;
    },
    filterBySearch(components) {
      return Object.values(components).filter(component =>
        component.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    resetSelectedIcon() {
      this.iconSelected = "";
      this.categorySelected = "";
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
