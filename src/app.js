import Vue from "vue";

Vue.component("tabs", {
  template: `
        <div>
          <div class="tabs">
              <ul class="flex border-b">
                  <li class="mr-1"
                     :class="{ '-mb-px' : tab.isActive }" 
                     v-for="tab in tabs">
                    <a class="bg-white inline-block py-2 px-4 text-blue-500 font-semibold" 
                       :class="{ 'border-l border-t border-r rounded-t text-blue-800' : tab.isActive }"  
                       :href="tab.href"
                        @click="changeSelected(tab)">
                        {{  tab.name }}
                    </a>
                  </li>
              </ul>
          </div>
          <div class="tab-details">
              <slot></slot>
          </div>
        </div>
  `,

  data() {
    return {
      tabs: [],
    };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    changeSelected(requestTab) {
       this.tabs.forEach(tab => {
         tab.isActive = (tab.name == requestTab.name)
        }); 
    }
  },
});

Vue.component("tab", {
  template: `
  <div v-show="isActive" class="mt-4">
    <slot></slot>
  </div>  
  `,

  props: {
    name: { required: true },
    selected: { default: false },
  },

  data() {
    return {
      isActive: false
    }
  },

  mounted () {
    this.isActive = this.selected;
  },

  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-'); 
    }
  },
});

new Vue({
  el: "#app",
});
