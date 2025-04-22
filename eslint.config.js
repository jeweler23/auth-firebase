import antfu from '@antfu/eslint-config';
import pluginVitest from '@vitest/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';

export default antfu({
    type: 'app',
    plugins: {
      vue: pluginVue,
      pluginVitest,
    },
    stylistic: {
      semi: true,
      quotes: 'single',
      indent: 'tab',
      overrides: {
        'no-console': 'off',
        'no-return-await': ['error'],
        'node/prefer-global/process': ['error', 'always'],
        'style/indent': ['off'],
      },
    },
    typescript: true,

    jsonc: false,
    yaml: false,
    ignores: [
      '**/fixtures',
    ],
    vue: {
      overrides: {
        'vue/attributes-order': ['error', {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        }],
        'vue/order-in-components': ['error', {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError',
          ],
        }],
        'vue/block-order': ['error', {
          order: [['script', 'template'], 'style'],
        }],
        'vue/block-tag-newline': ['error', {
          singleline: 'consistent',
          multiline: 'always',
          maxEmptyLines: 0,
        }],
        'vue/component-api-style': ['error', ['script-setup', 'composition']],
        'vue/component-name-in-template-casing': ['error', 'kebab-case', {
          registeredComponentsOnly: true,
          ignores: [],
        }],
        'vue/custom-event-name-casing': ['error', 'camelCase', {
          ignores: [],
        }],
        'vue/define-macros-order': ['error', {
          order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/no-multiple-objects-in-class': 'error',
        'vue/no-ref-object-reactivity-loss': 'error',
        'vue/no-unused-refs': 'error',
      },
    },
  },

);
