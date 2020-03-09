<template>
  <div id="app">
    <div class="container">
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          v-model="keyword"
          :placeholder="`Search in ${icons.length} icons...`"
        />
      </div>
      <div class="icons">
        <div
          class="icon"
          v-tippy="{ interactive: true }"
          :title="example"
          v-for="icon in filteredIcons"
          @click="handleClickIcon(icon)"
          :key="icon"
        >
          <component :is="iconComponents[icon]" class="icon-svg"></component>
          <span>{{ icon }}</span>
        </div>
      </div>
      <div class="sizing">
        <h2>Sizing</h2>
        <div class="sizes">
          <div
            class="size"
            v-for="size in exampleSizes"
            v-tippy="{ interactive: true }"
            @click="handleClickSize(size)"
            :key="size"
            :title="sizeExample(size)"
          >
            <div class="size-label">
              {{ size }}{{ size === "1x" ? " (default)" : "" }}
            </div>
            <div class="size-icon">
              <!-- <archive-icon :size="size"></archive-icon> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import kebab from "lodash.kebabcase";
import example from "./example.md";

export default {
  props: {
    iconComponents: {},
    path: {
        type: String
    }
  },
  data() {
    return {
      icons: [...Object.keys(this.iconComponents)],
      keyword: "",
      hoverIcon: "",
      hoverSize: "",
      
      exampleSizes: ["24", "1x", "1.5x", "2x", "3x", "4x"]
    };
  },
  computed: {
    filteredIcons() {
      const keyword = this.keyword.trim().toLowerCase();
      if (!keyword) return this.icons;

      return this.icons.filter(name => {
        return name.toLowerCase().indexOf(keyword) > -1;
      });
    },
    example() {
      return example
        .replace(/ICON/g, this.hoverIcon)
        .replace(/DIR/g, this.path)
        .replace(/kebab-icon/g, kebab(this.hoverIcon));
    }
  },
  methods: {
    handleClickIcon(icon) {
      this.hoverIcon = icon;
    },
    handleClickSize(size) {
      this.hoverSize = size;
    },
    sizeExample(size) {
      return example
        .replace("1.5x", size)
        .replace(/ICON/g, "ArchiveIcon")
        .replace(/kebab-icon/g, "archive-icon");
    }
  }
};
</script>


<style scoped>
.header {
  background: linear-gradient(90deg, #5733ea, #4894ff 70%, #a5bcff);
  padding: 40px 0;
}

.desc {
  color: white;
  font-weight: 500;
}

.hero-heading {
  color: #7dffc3;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  background: -webkit-linear-gradient(135deg, #fff9b0, #7dffc3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icons {
  display: flex;
  flex-wrap: wrap;
}

.icon {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 25%;
  border-radius: 3px;
  cursor: pointer;
}

.icon:hover {
  background: #f1f5ff;
}

.icon-svg {
  margin-right: 10px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.search-input {
  padding: 10px;
  outline: none;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
}

.search-input:focus {
  border-color: #ccc;
}

.footer {
  margin: 40px 0;
  font-size: 1rem;
}

.sizing {
  text-align: center;
}

.sizes {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.size {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
}

.size-label {
  font-size: 1.5em;
  font-weight: lighter;
  color: rgba(0, 0, 0, 0.36);
  margin-bottom: 0.5em;
}

.size-icon {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
}

.size:hover {
  background: #f1f5ff;
}

@media screen and (max-width: 768px) {
  .icon {
    width: 100%;
  }
}
</style>
