<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  BaAlert,
  BaAvatar,
  BaBadge,
  BaBreadcrumb,
  BaButton,
  BaCard,
  BaCheckbox,
  BaDivider,
  BaEmpty,
  BaInput,
  BaProgress,
  BaRadio,
  BaSelect,
  BaSkeleton,
  BaStat,
  BaSteps,
  BaSwitch,
  BaTabs,
  BaTag,
  BaTextarea,
  BaTimeline
} from '../index';

type TableRow = {
  name: string;
  type: string;
  default: string;
  description: string;
};

type DocSection = 'guide' | 'components';
type DocCategory = 'guide' | 'form' | 'display' | 'layout' | 'feedback' | 'navigation';
type PagePath =
  | '/guide/getting-started'
  | '/components/input'
  | '/components/textarea'
  | '/components/select'
  | '/components/checkbox'
  | '/components/radio'
  | '/components/switch'
  | '/components/button'
  | '/components/badge'
  | '/components/tag'
  | '/components/avatar'
  | '/components/card'
  | '/components/divider'
  | '/components/alert'
  | '/components/progress'
  | '/components/skeleton'
  | '/components/empty'
  | '/components/stat'
  | '/components/breadcrumb'
  | '/components/tabs'
  | '/components/steps'
  | '/components/timeline';

type DocPage = {
  title: string;
  path: PagePath;
  section: DocSection;
  category: DocCategory;
  summary: string;
  keywords: string[];
};

type ComponentDoc = {
  description: string;
  usageCode: string;
  props: TableRow[];
  events?: TableRow[];
  slots?: TableRow[];
};

const fallbackPath: PagePath = '/guide/getting-started';

const amount = ref('12888.50');
const note = ref('适合录入合同备注');
const detail = ref('这是一段支持自动高度、字数统计和清空按钮的多行输入示例。');
const city = ref<'hangzhou' | 'shanghai' | 'shenzhen' | ''>('hangzhou');
const priority = ref<'normal' | 'urgent' | 'vip' | ''>('vip');
const agreement = ref(true);
const subscribe = ref(false);
const contactMethod = ref<'wechat' | 'phone' | 'email'>('wechat');
const planType = ref<'starter' | 'growth' | 'pro'>('growth');
const notifications = ref(true);
const smartAmount = ref(false);
const betaTagVisible = ref(true);
const loading = ref(false);
const activeTab = ref<'overview' | 'orders' | 'assets'>('overview');
const searchQuery = ref('');

const npmUrl = 'https://www.npmjs.com/package/beautiful-animation';
const githubUrl = 'https://github.com/tianchuanjian/beautiful-animation';

const cityOptions = [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' }
] as const;

const priorityOptions = [
  { label: '普通', value: 'normal' },
  { label: '加急', value: 'urgent' },
  { label: 'VIP', value: 'vip' }
] as const;

const breadcrumbItems = [
  { label: '控制台', href: '#/guide/getting-started' },
  { label: '订单中心', href: '#/components/card' },
  { label: '订单详情' }
];

const tabItems = [
  { label: '概览', value: 'overview', badge: 3 },
  { label: '订单', value: 'orders' },
  { label: '资产', value: 'assets', disabled: false }
] as const;

const timelineItems = [
  { title: '需求确认', description: '确认金额模式、文档站和 npm 发布方式。', time: '09:30', status: 'success' },
  { title: '基础组件搭建', description: '先完成输入类和动作类组件。', time: '11:10', status: 'success' },
  { title: '选择类补齐', description: '继续扩展 checkbox、radio、switch、select。', time: '14:20', status: 'warning' },
  { title: '展示类扩展', description: '补齐 badge、tag、avatar、stat 等展示基础件。', time: '进行中', status: 'default' }
] as const;

const stepItems = [
  { title: '设计 token', description: '先收敛色彩、圆角、阴影和动效时长。' },
  { title: '基础组件', description: '优先完善高频输入、选择和动作类组件。' },
  { title: '文档站', description: '把示例、API、路由导航和搜索都接上。' },
  { title: '发布集成', description: 'npm、GitHub Pages、Actions 一起打通。' }
] as const;

const pages: DocPage[] = [
  {
    title: '快速开始',
    path: '/guide/getting-started',
    section: 'guide',
    category: 'guide',
    summary: '安装、全量注册、按需引入、样式入口与整体设计方向。',
    keywords: ['install', 'use', 'guide', 'theme', 'motion']
  },
  {
    title: 'BaInput',
    path: '/components/input',
    section: 'components',
    category: 'form',
    summary: '普通输入与金额输入，支持千分位显示、失焦补零和清空交互。',
    keywords: ['input', 'amount', 'form']
  },
  {
    title: 'BaTextarea',
    path: '/components/textarea',
    section: 'components',
    category: 'form',
    summary: '多行输入，支持自动高度、字数统计和清空能力。',
    keywords: ['textarea', 'autosize', 'form']
  },
  {
    title: 'BaSelect',
    path: '/components/select',
    section: 'components',
    category: 'form',
    summary: '轻量选择器，适合和输入类一起组成更完整的表单体验。',
    keywords: ['select', 'option', 'form']
  },
  {
    title: 'BaCheckbox',
    path: '/components/checkbox',
    section: 'components',
    category: 'form',
    summary: '适合协议勾选与偏好选择，带有柔和弹性反馈和渐变高亮。',
    keywords: ['checkbox', 'agreement', 'form']
  },
  {
    title: 'BaRadio',
    path: '/components/radio',
    section: 'components',
    category: 'form',
    summary: '适合单选决策场景，适用于支付、渠道和方案选择。',
    keywords: ['radio', 'choice', 'form']
  },
  {
    title: 'BaSwitch',
    path: '/components/switch',
    section: 'components',
    category: 'form',
    summary: '适合开关型配置，支持文案态切换与流畅滑块动画。',
    keywords: ['switch', 'toggle', 'form']
  },
  {
    title: 'BaButton',
    path: '/components/button',
    section: 'components',
    category: 'display',
    summary: '多种视觉风格与加载态，适合作为页面的主要动作入口。',
    keywords: ['button', 'action', 'display']
  },
  {
    title: 'BaBadge',
    path: '/components/badge',
    section: 'components',
    category: 'display',
    summary: '用于消息数、状态点和小尺寸提醒，适合放在卡片与标签旁边。',
    keywords: ['badge', 'count', 'display']
  },
  {
    title: 'BaTag',
    path: '/components/tag',
    section: 'components',
    category: 'display',
    summary: '用于轻量状态和标签展示，支持圆角、关闭动作与呼吸脉冲动画。',
    keywords: ['tag', 'label', 'display']
  },
  {
    title: 'BaAvatar',
    path: '/components/avatar',
    section: 'components',
    category: 'display',
    summary: '头像组件，支持图片、缩写、形状切换和在线状态点。',
    keywords: ['avatar', 'user', 'display']
  },
  {
    title: 'BaCard',
    path: '/components/card',
    section: 'components',
    category: 'layout',
    summary: '内容容器基础件，适合承载统计、列表和组合式内容。',
    keywords: ['card', 'panel', 'layout']
  },
  {
    title: 'BaDivider',
    path: '/components/divider',
    section: 'components',
    category: 'layout',
    summary: '分隔块级内容或行内信息，支持横向、纵向和带文案样式。',
    keywords: ['divider', 'layout', 'separator']
  },
  {
    title: 'BaAlert',
    path: '/components/alert',
    section: 'components',
    category: 'feedback',
    summary: '反馈提示组件，适合成功、警告、错误和信息类场景。',
    keywords: ['alert', 'feedback', 'message']
  },
  {
    title: 'BaProgress',
    path: '/components/progress',
    section: 'components',
    category: 'feedback',
    summary: '用于上传、流程和任务完成度展示，支持状态色和条纹。',
    keywords: ['progress', 'feedback', 'percent']
  },
  {
    title: 'BaSkeleton',
    path: '/components/skeleton',
    section: 'components',
    category: 'feedback',
    summary: '骨架屏占位，适合列表和卡片内容加载前的过渡状态。',
    keywords: ['skeleton', 'loading', 'feedback']
  },
  {
    title: 'BaEmpty',
    path: '/components/empty',
    section: 'components',
    category: 'feedback',
    summary: '空状态展示，适合列表无数据、搜索无结果和初始化页面。',
    keywords: ['empty', 'feedback', 'placeholder']
  },
  {
    title: 'BaStat',
    path: '/components/stat',
    section: 'components',
    category: 'display',
    summary: '数字统计卡片，适合仪表盘、运营数据和看板场景。',
    keywords: ['stat', 'metric', 'display']
  },
  {
    title: 'BaBreadcrumb',
    path: '/components/breadcrumb',
    section: 'components',
    category: 'navigation',
    summary: '层级导航组件，适合后台页、详情页和面包屑路径展示。',
    keywords: ['breadcrumb', 'navigation', 'path']
  },
  {
    title: 'BaTabs',
    path: '/components/tabs',
    section: 'components',
    category: 'navigation',
    summary: '标签页切换组件，支持 badge 和内容区域联动。',
    keywords: ['tabs', 'navigation', 'switch']
  },
  {
    title: 'BaSteps',
    path: '/components/steps',
    section: 'components',
    category: 'navigation',
    summary: '步骤条组件，适合流程化任务、下单和配置向导。',
    keywords: ['steps', 'process', 'navigation']
  },
  {
    title: 'BaTimeline',
    path: '/components/timeline',
    section: 'components',
    category: 'navigation',
    summary: '时间轴组件，适合操作日志、事件轨迹和进度记录。',
    keywords: ['timeline', 'activity', 'navigation']
  }
];

const categoryLabels: Record<DocCategory, string> = {
  guide: 'Guide',
  form: 'Form',
  display: 'Display',
  layout: 'Layout',
  feedback: 'Feedback',
  navigation: 'Navigation'
};

function createImportCode(componentName: string, lines: string[] = []) {
  const imports = lines.length ? `\n${lines.join('\n')}` : '';
  return `<script setup lang="ts">\nimport { ${componentName} } from 'beautiful-animation';\nimport 'beautiful-animation/style.css';${imports}\n<\/script>`;
}

const componentDocs: Record<Exclude<PagePath, '/guide/getting-started'>, ComponentDoc> = {
  '/components/input': {
    description: '普通输入和金额输入合并在一个组件里，金额模式支持千分位显示、失焦补零与清空交互。',
    usageCode: `<script setup lang="ts">\nimport { ref } from 'vue';\nimport { BaInput } from 'beautiful-animation';\nimport 'beautiful-animation/style.css';\n\nconst amount = ref('12888.50');\n<\/script>\n\n<template>\n  <BaInput\n    v-model="amount"\n    mode="amount"\n    :decimal-places="2"\n    :use-thousand-separator="true"\n    clearable\n  />\n</template>`,
    props: [
      { name: 'modelValue', type: 'string | number | null', default: "''", description: '绑定值。金额模式下回传不带千分位逗号的字符串。' },
      { name: 'mode', type: "'text' | 'amount'", default: "'text'", description: '输入模式。amount 会限制为数字与小数点。' },
      { name: 'decimalPlaces', type: 'number', default: '2', description: '金额模式下保留的小数位数。' },
      { name: 'useThousandSeparator', type: 'boolean', default: 'false', description: '显示层是否格式化千分位。' },
      { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清空按钮。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: string) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: string) => void', default: '-', description: '值变化时触发。' },
      { name: 'clear', type: '() => void', default: '-', description: '点击清空按钮触发。' }
    ]
  },
  '/components/textarea': {
    description: '适合备注、说明等多行输入场景，支持自动高度、字数统计和清空交互。',
    usageCode: createImportCode('BaTextarea', ["import { ref } from 'vue';", "const detail = ref('');"]),
    props: [
      { name: 'modelValue', type: 'string | null', default: "''", description: '绑定值。' },
      { name: 'autosize', type: 'boolean', default: 'false', description: '是否根据内容自动增高。' },
      { name: 'maxLength', type: 'number', default: '-', description: '最大输入长度。' },
      { name: 'showCount', type: 'boolean', default: 'false', description: '是否显示字数统计。' },
      { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清空按钮。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: string) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: string) => void', default: '-', description: '内容变化时触发。' },
      { name: 'clear', type: '() => void', default: '-', description: '点击清空按钮触发。' }
    ]
  },
  '/components/select': {
    description: '轻量选择器，适合和输入类一起组成更完整的表单体验。',
    usageCode: createImportCode('BaSelect', ["import { ref } from 'vue';", "const city = ref('hangzhou');"]),
    props: [
      { name: 'modelValue', type: 'string | number | null', default: 'null', description: '当前选中的值。' },
      { name: 'options', type: 'SelectOption[]', default: '[]', description: '选项数组。' },
      { name: 'placeholder', type: 'string', default: "'请选择'", description: '空值时的占位选项。' },
      { name: 'status', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: '状态样式。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: string | number | \"\") => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: string | number | \"\") => void', default: '-', description: '选项变化时触发。' }
    ]
  },
  '/components/checkbox': {
    description: '适合协议勾选和偏好选择，选中时有柔和提亮和勾选弹出动画。',
    usageCode: createImportCode('BaCheckbox', ["import { ref } from 'vue';", 'const agreement = ref(true);']),
    props: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: '是否选中。' },
      { name: 'label', type: 'string', default: "''", description: '主文案。' },
      { name: 'description', type: 'string', default: "''", description: '辅助说明文案。' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: '半选态外观。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: boolean) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: boolean) => void', default: '-', description: '点击切换时触发。' }
    ]
  },
  '/components/radio': {
    description: '适合单选决策场景，适用于支付方式、方案选择和渠道切换这类互斥决策。',
    usageCode: createImportCode('BaRadio', ["import { ref } from 'vue';", "const contactMethod = ref('wechat');"]),
    props: [
      { name: 'modelValue', type: 'string | number | boolean | null', default: 'null', description: '当前选中的值。' },
      { name: 'value', type: 'string | number | boolean', default: 'true', description: '当前单选项对应的值。' },
      { name: 'label', type: 'string', default: "''", description: '主文案。' },
      { name: 'description', type: 'string', default: "''", description: '辅助说明文案。' },
      { name: 'name', type: 'string', default: "''", description: '原生 radio name。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: string | number | boolean) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: string | number | boolean) => void', default: '-', description: '点击切换时触发。' }
    ]
  },
  '/components/switch': {
    description: '适合开关型配置，滑块切换带有顺滑位移和轻微抬升，视觉上更像产品级设置项。',
    usageCode: createImportCode('BaSwitch', ["import { ref } from 'vue';", 'const notifications = ref(true);']),
    props: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: '当前开关状态。' },
      { name: 'checkedText / uncheckedText', type: 'string', default: "'On' / 'Off'", description: '开关两侧的状态文案。' },
      { name: 'loading', type: 'boolean', default: 'false', description: '是否显示加载态。' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '禁用态。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: boolean) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: boolean) => void', default: '-', description: '点击切换时触发。' }
    ]
  },
  '/components/button': {
    description: '提供多种视觉风格与加载态，适合作为整个库里的基础动作按钮。',
    usageCode: createImportCode('BaButton', ["import { ref } from 'vue';", 'const loading = ref(false);']),
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: '按钮视觉风格。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '按钮尺寸。' },
      { name: 'loading', type: 'boolean', default: 'false', description: '加载态。' },
      { name: 'block', type: 'boolean', default: 'false', description: '是否撑满容器宽度。' },
      { name: 'round', type: 'boolean', default: 'false', description: '是否胶囊圆角。' }
    ],
    events: [
      { name: 'click', type: '(event: MouseEvent) => void', default: '-', description: '点击时触发。' }
    ],
    slots: [
      { name: 'default', type: '-', default: '-', description: '按钮正文。' },
      { name: 'prefix', type: '-', default: '-', description: '前置图标位。' },
      { name: 'suffix', type: '-', default: '-', description: '后置图标位。' }
    ]
  },
  '/components/badge': {
    description: '用于消息数、状态点和小尺寸提醒，适合放在卡片与标签旁边。',
    usageCode: createImportCode('BaBadge'),
    props: [
      { name: 'value', type: 'string | number', default: "''", description: '显示内容。' },
      { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'ghost'", default: "'primary'", description: '视觉风格。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' },
      { name: 'dot', type: 'boolean', default: 'false', description: '是否只显示状态点。' },
      { name: 'pulse', type: 'boolean', default: 'false', description: '是否显示脉冲动画。' }
    ]
  },
  '/components/tag': {
    description: '适合轻量状态和标签展示，支持关闭动作、圆角胶囊和呼吸脉冲动画。',
    usageCode: createImportCode('BaTag', ["import { ref } from 'vue';', 'const visible = ref(true);"]),
    props: [
      { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'ghost'", default: "'primary'", description: '标签视觉风格。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '标签尺寸。' },
      { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮。' },
      { name: 'round', type: 'boolean', default: 'false', description: '是否为胶囊圆角。' },
      { name: 'pulse', type: 'boolean', default: 'false', description: '是否开启脉冲动画。' }
    ],
    events: [
      { name: 'click', type: '(event: MouseEvent) => void', default: '-', description: '点击标签时触发。' },
      { name: 'close', type: '(event: MouseEvent) => void', default: '-', description: '点击关闭按钮时触发。' }
    ]
  },
  '/components/avatar': {
    description: '头像组件，支持图片、缩写、形状切换和在线状态点。',
    usageCode: createImportCode('BaAvatar'),
    props: [
      { name: 'src', type: 'string', default: "''", description: '头像图片地址。' },
      { name: 'initials', type: 'string', default: "''", description: '无图片时显示的缩写。' },
      { name: 'shape', type: "'circle' | 'rounded' | 'square'", default: "'circle'", description: '头像形状。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '头像尺寸。' },
      { name: 'status', type: "'none' | 'online' | 'busy' | 'offline'", default: "'none'", description: '状态点。' }
    ]
  },
  '/components/card': {
    description: '内容容器基础件，适合承载统计、列表和组合式内容。',
    usageCode: createImportCode('BaCard'),
    props: [
      { name: 'title', type: 'string', default: "''", description: '标题。' },
      { name: 'description', type: 'string', default: "''", description: '副标题说明。' },
      { name: 'shadow', type: "'always' | 'hover' | 'never'", default: "'hover'", description: '阴影模式。' },
      { name: 'padding', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '内边距尺寸。' },
      { name: 'interactive', type: 'boolean', default: 'false', description: '是否强调可交互悬浮效果。' }
    ],
    slots: [
      { name: 'header', type: '-', default: '-', description: '自定义头部区域。' },
      { name: 'default', type: '-', default: '-', description: '卡片主体内容。' },
      { name: 'footer', type: '-', default: '-', description: '底部操作区。' }
    ]
  },
  '/components/divider': {
    description: '分隔块级内容或行内信息，支持横向、纵向和带文案样式。',
    usageCode: createImportCode('BaDivider'),
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '分隔方向。' },
      { name: 'dashed', type: 'boolean', default: 'false', description: '是否使用虚线样式。' },
      { name: 'contentPosition', type: "'start' | 'center' | 'end'", default: "'center'", description: '文案位置。' }
    ],
    slots: [
      { name: 'default', type: '-', default: '-', description: '中间文案内容。' }
    ]
  },
  '/components/alert': {
    description: '反馈提示组件，适合成功、警告、错误和信息类场景。',
    usageCode: createImportCode('BaAlert'),
    props: [
      { name: 'title', type: 'string', default: "''", description: '标题。' },
      { name: 'description', type: 'string', default: "''", description: '说明内容。' },
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: '反馈状态。' },
      { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮。' }
    ],
    events: [
      { name: 'close', type: '() => void', default: '-', description: '关闭时触发。' }
    ],
    slots: [
      { name: 'default', type: '-', default: '-', description: '正文内容。' }
    ]
  },
  '/components/progress': {
    description: '用于上传、流程和任务完成度展示，支持状态色和条纹。',
    usageCode: createImportCode('BaProgress'),
    props: [
      { name: 'modelValue', type: 'number', default: '0', description: '进度值，范围 0 到 100。' },
      { name: 'status', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: '状态样式。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '进度条尺寸。' },
      { name: 'striped', type: 'boolean', default: 'false', description: '是否显示条纹。' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: '是否显示百分比标签。' }
    ]
  },
  '/components/skeleton': {
    description: '骨架屏占位，适合列表和卡片内容加载前的过渡状态。',
    usageCode: createImportCode('BaSkeleton'),
    props: [
      { name: 'rows', type: 'number', default: '3', description: '文本占位行数。' },
      { name: 'animated', type: 'boolean', default: 'true', description: '是否开启流动动画。' },
      { name: 'avatar', type: 'boolean', default: 'false', description: '是否显示头像占位。' }
    ]
  },
  '/components/empty': {
    description: '空状态展示，适合列表无数据、搜索无结果和初始化页面。',
    usageCode: createImportCode('BaEmpty'),
    props: [
      { name: 'title', type: 'string', default: "'暂无内容'", description: '标题。' },
      { name: 'description', type: 'string', default: "'当前还没有可展示的数据或结果。'", description: '说明文案。' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' }
    ],
    slots: [
      { name: 'default', type: '-', default: '-', description: '底部操作区域。' }
    ]
  },
  '/components/stat': {
    description: '数字统计卡片，适合仪表盘、运营数据和看板场景。',
    usageCode: createImportCode('BaStat'),
    props: [
      { name: 'label', type: 'string', default: "''", description: '指标标签。' },
      { name: 'value', type: 'string | number', default: "''", description: '指标值。' },
      { name: 'hint', type: 'string', default: "''", description: '辅助说明。' },
      { name: 'trend', type: "'up' | 'down' | 'neutral'", default: "'neutral'", description: '趋势状态。' }
    ],
    slots: [
      { name: 'icon', type: '-', default: '-', description: '左侧图标位。' }
    ]
  },
  '/components/breadcrumb': {
    description: '层级导航组件，适合后台页、详情页和面包屑路径展示。',
    usageCode: createImportCode('BaBreadcrumb'),
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', default: '[]', description: '路径项数组。' },
      { name: 'separator', type: 'string', default: "'/'", description: '分隔符。' }
    ]
  },
  '/components/tabs': {
    description: '标签页切换组件，支持 badge 和内容区域联动。',
    usageCode: createImportCode('BaTabs', ["import { ref } from 'vue';", "const activeTab = ref('overview');"]),
    props: [
      { name: 'modelValue', type: 'string | number', default: "''", description: '当前激活的 tab 值。' },
      { name: 'items', type: 'TabItem[]', default: '[]', description: '标签项数组。' }
    ],
    events: [
      { name: 'update:modelValue', type: '(value: string | number) => void', default: '-', description: 'v-model 更新。' },
      { name: 'change', type: '(value: string | number) => void', default: '-', description: '切换标签时触发。' }
    ],
    slots: [
      { name: 'default', type: '{ item, value }', default: '-', description: '内容区域，提供当前 item 和 value。' }
    ]
  },
  '/components/steps': {
    description: '步骤条组件，适合流程化任务、下单和配置向导。',
    usageCode: createImportCode('BaSteps'),
    props: [
      { name: 'modelValue', type: 'number', default: '0', description: '当前步骤索引。' },
      { name: 'items', type: 'StepItem[]', default: '[]', description: '步骤数组。' }
    ]
  },
  '/components/timeline': {
    description: '时间轴组件，适合操作日志、事件轨迹和进度记录。',
    usageCode: createImportCode('BaTimeline'),
    props: [
      { name: 'items', type: 'TimelineItem[]', default: '[]', description: '时间轴项数组。' }
    ]
  }
};

const currentPath = ref<PagePath>(typeof window === 'undefined' ? fallbackPath : fallbackPath);

function normalizePath(hash: string) {
  const cleaned = hash.replace(/^#/, '').trim();

  if (!cleaned) {
    return fallbackPath;
  }

  const path = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return (pages.find((page) => page.path === path)?.path ?? fallbackPath) as PagePath;
}

function syncRoute() {
  currentPath.value = typeof window === 'undefined' ? fallbackPath : normalizePath(window.location.hash);
}

onMounted(() => {
  if (!window.location.hash) {
    window.location.hash = `#${fallbackPath}`;
  }

  syncRoute();
  window.addEventListener('hashchange', syncRoute);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncRoute);
});

const currentPageIndex = computed(() => pages.findIndex((page) => page.path === currentPath.value));
const currentPage = computed(() => pages[currentPageIndex.value] ?? pages[0]);
const currentComponentDoc = computed(() => {
  if (currentPage.value.path === '/guide/getting-started') {
    return null;
  }

  return componentDocs[currentPage.value.path as Exclude<PagePath, '/guide/getting-started'>];
});

const previousPage = computed(() => pages[currentPageIndex.value - 1] ?? null);
const nextPage = computed(() => pages[currentPageIndex.value + 1] ?? null);
const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase());

function matchesSearch(page: DocPage) {
  if (!normalizedSearch.value) {
    return true;
  }

  const haystack = [page.title, page.summary, ...page.keywords].join(' ').toLowerCase();
  return haystack.includes(normalizedSearch.value);
}

const filteredGuidePages = computed(() => pages.filter((page) => page.category === 'guide' && matchesSearch(page)));
const filteredFormPages = computed(() => pages.filter((page) => page.category === 'form' && matchesSearch(page)));
const filteredDisplayPages = computed(() => pages.filter((page) => page.category === 'display' && matchesSearch(page)));
const filteredLayoutPages = computed(() => pages.filter((page) => page.category === 'layout' && matchesSearch(page)));
const filteredFeedbackPages = computed(() => pages.filter((page) => page.category === 'feedback' && matchesSearch(page)));
const filteredNavigationPages = computed(() => pages.filter((page) => page.category === 'navigation' && matchesSearch(page)));
const filteredPageCount = computed(
  () =>
    filteredGuidePages.value.length +
    filteredFormPages.value.length +
    filteredDisplayPages.value.length +
    filteredLayoutPages.value.length +
    filteredFeedbackPages.value.length +
    filteredNavigationPages.value.length
);

function isActive(path: string) {
  return currentPage.value.path === path;
}

function pageHref(path: string) {
  return `#${path}`;
}

function categoryText(page: DocPage) {
  return categoryLabels[page.category];
}

function closeBetaTag() {
  betaTagVisible.value = false;
}

function resetBetaTag() {
  betaTagVisible.value = true;
}
</script>

<template>
  <div class="docs-shell">
    <aside class="docs-sidebar">
      <div class="brand-card">
        <div class="brand-mark">BA</div>
        <div>
          <div class="brand-name">beautiful-animation</div>
          <div class="brand-subtitle">Vue 3 组件库文档</div>
        </div>
      </div>

      <div class="docs-search">
        <label class="docs-search__label" for="docs-search">搜索</label>
        <input
          id="docs-search"
          v-model="searchQuery"
          class="docs-search__input"
          type="text"
          placeholder="搜索组件 / 关键词"
        />
        <p class="docs-search__meta">{{ filteredPageCount }} 个结果</p>
      </div>

      <div class="docs-sidebar__content">
        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Guide</p>
          <nav v-if="filteredGuidePages.length" class="docs-nav">
            <a
              v-for="page in filteredGuidePages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Form</p>
          <nav v-if="filteredFormPages.length" class="docs-nav">
            <a
              v-for="page in filteredFormPages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Display</p>
          <nav v-if="filteredDisplayPages.length" class="docs-nav">
            <a
              v-for="page in filteredDisplayPages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Layout</p>
          <nav v-if="filteredLayoutPages.length" class="docs-nav">
            <a
              v-for="page in filteredLayoutPages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Feedback</p>
          <nav v-if="filteredFeedbackPages.length" class="docs-nav">
            <a
              v-for="page in filteredFeedbackPages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div class="docs-nav-group">
          <p class="docs-nav-group__title">Navigation</p>
          <nav v-if="filteredNavigationPages.length" class="docs-nav">
            <a
              v-for="page in filteredNavigationPages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div v-if="filteredPageCount === 0" class="docs-empty-state">
          <strong>没有匹配结果</strong>
          <p>试试输入 `select`、`progress`、`tabs` 或 `timeline`。</p>
        </div>

        <div class="sidebar-note">
          <strong>当前方向</strong>
          <p>组件数已经超过 20，后续继续沿着统一 token、顺滑动画和紧凑文档目录往前补强。</p>
        </div>
      </div>
    </aside>

    <main class="docs-main">
      <section class="hero-card">
        <div class="hero-toolbar">
          <span class="hero-toolbar__label">Release Links</span>

          <div class="hero-toolbar__actions">
            <a class="hero-link hero-link--npm" :href="npmUrl" target="_blank" rel="noreferrer">npm</a>
            <a class="hero-link hero-link--github" :href="githubUrl" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <p class="eyebrow">Component Library</p>
        <h1>{{ currentPage.title }}</h1>
        <p class="hero-copy">{{ currentPage.summary }}</p>

        <div class="hero-metrics">
          <div>
            <span>当前页面</span>
            <strong>{{ currentPageIndex + 1 }}/{{ pages.length }}</strong>
          </div>
          <div>
            <span>组件总数</span>
            <strong>21</strong>
          </div>
          <div>
            <span>分类</span>
            <strong>{{ categoryText(currentPage) }}</strong>
          </div>
        </div>
      </section>

      <section v-if="currentPage.path === '/guide/getting-started'" class="docs-section">
        <div class="section-grid">
          <div class="doc-panel">
            <h3>安装与注册</h3>
            <pre class="code-block"><code>{{ quickStartCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>使用方式</h3>
            <ul class="bullet-list">
              <li>全量注册：`app.use(BeautifulAnimation)`</li>
              <li>按需引入：`import { BaInput, BaSelect, BaCheckbox, BaRadio, BaSwitch } from 'beautiful-animation'`</li>
              <li>样式入口：`import 'beautiful-animation/style.css'`</li>
            </ul>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>当前已完成的组件</h3>
            <ul class="bullet-list">
              <li>Form：BaInput、BaTextarea、BaSelect、BaCheckbox、BaRadio、BaSwitch</li>
              <li>Display：BaButton、BaBadge、BaTag、BaAvatar、BaStat</li>
              <li>Layout：BaCard、BaDivider</li>
              <li>Feedback：BaAlert、BaProgress、BaSkeleton、BaEmpty</li>
              <li>Navigation：BaBreadcrumb、BaTabs、BaSteps、BaTimeline</li>
            </ul>
          </div>

          <div class="doc-panel">
            <h3>设计预期</h3>
            <ul class="bullet-list">
              <li>风格尽量通过全局 token 控制，后续统一换主题时不需要逐个组件拆改。</li>
              <li>交互反馈保持顺滑，有轻微浮起、弹性位移和柔和高光，而不是生硬切换。</li>
              <li>文档继续保持紧凑目录和路由模式，新增组件默认并入搜索和上下页切换。</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-else class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">Component</p>
            <h2>{{ currentPage.title }}</h2>
          </div>
          <p class="section-desc">{{ currentComponentDoc?.description }}</p>
        </div>

        <div class="demo-card">
          <div v-if="currentPage.path === '/components/input'" class="demo-preview">
            <BaInput
              v-model="amount"
              label="合同金额"
              mode="amount"
              :decimal-places="2"
              :use-thousand-separator="true"
              prefix="¥"
              hint="展示层自动带千分位，传出的值不带逗号"
              clearable
            />
            <BaInput
              v-model="note"
              label="备注"
              placeholder="请输入补充信息"
              suffix="选填"
              clearable
            />
          </div>

          <div v-else-if="currentPage.path === '/components/textarea'" class="demo-preview">
            <BaTextarea
              v-model="detail"
              label="详细描述"
              hint="自动根据内容撑开高度，适合表单备注场景"
              :max-length="120"
              show-count
              autosize
              clearable
            />
          </div>

          <div v-else-if="currentPage.path === '/components/select'" class="demo-preview">
            <BaSelect
              v-model="city"
              label="城市"
              hint="适合下拉选择较少的预设项"
              :options="[...cityOptions]"
            />
            <BaSelect
              v-model="priority"
              label="优先级"
              status="warning"
              :options="[...priorityOptions]"
            />
          </div>

          <div v-else-if="currentPage.path === '/components/checkbox'" class="demo-preview">
            <BaCheckbox
              v-model="agreement"
              label="已阅读并同意服务协议"
              description="适合下单、注册、签约等需要明确确认的场景"
            />
            <BaCheckbox
              v-model="subscribe"
              label="订阅产品更新"
              description="适合营销通知、功能上新提醒等轻量偏好选择"
            />
            <BaCheckbox
              :model-value="true"
              label="部分选择中"
              description="通过 indeterminate 表示当前存在部分选中状态"
              indeterminate
            />
          </div>

          <div v-else-if="currentPage.path === '/components/radio'" class="demo-preview">
            <BaRadio
              v-model="contactMethod"
              name="contact"
              value="wechat"
              label="微信联系"
              description="适合即时沟通和快速确认"
            />
            <BaRadio
              v-model="contactMethod"
              name="contact"
              value="phone"
              label="电话联系"
              description="适合加急订单和高优先级沟通"
            />
            <BaRadio
              v-model="contactMethod"
              name="contact"
              value="email"
              label="邮件联系"
              description="适合留档确认和正式通知"
            />
          </div>

          <div v-else-if="currentPage.path === '/components/switch'" class="demo-preview">
            <BaSwitch
              v-model="notifications"
              label="消息提醒"
              hint="控制订单进度、库存变动等实时通知"
              checked-text="开启"
              unchecked-text="关闭"
            />
            <BaSwitch
              v-model="smartAmount"
              label="金额智能格式化"
              hint="自动补零、千分位显示和更顺手的金额输入反馈"
              checked-text="启用"
              unchecked-text="停用"
            />
            <BaSwitch
              :model-value="true"
              label="同步中"
              hint="配置正在保存时可以使用 loading 展示进行中态"
              checked-text="同步中"
              unchecked-text="待同步"
              loading
            />
          </div>

          <div v-else-if="currentPage.path === '/components/button'" class="demo-preview demo-preview--buttons">
            <BaButton variant="primary" @click="loading = !loading">Primary</BaButton>
            <BaButton variant="secondary">Secondary</BaButton>
            <BaButton variant="ghost">Ghost</BaButton>
            <BaButton variant="danger">Danger</BaButton>
            <BaButton :loading="loading" block>Loading Demo</BaButton>
          </div>

          <div v-else-if="currentPage.path === '/components/badge'" class="demo-preview demo-preview--tags">
            <BaBadge value="8" />
            <BaBadge variant="success" value="New" />
            <BaBadge variant="warning" value="99+" />
            <BaBadge variant="danger" dot pulse />
            <BaBadge variant="ghost" value="Draft" />
          </div>

          <div v-else-if="currentPage.path === '/components/tag'" class="demo-preview demo-preview--tags">
            <BaTag variant="primary">Primary</BaTag>
            <BaTag variant="success" pulse>Success</BaTag>
            <BaTag variant="warning">Warning</BaTag>
            <BaTag variant="danger">Danger</BaTag>
            <BaTag variant="ghost" round>Ghost Round</BaTag>
            <BaTag v-if="betaTagVisible" closable pulse @close="closeBetaTag">Beta Access</BaTag>
            <BaButton v-else variant="secondary" size="sm" @click="resetBetaTag">恢复 Beta Tag</BaButton>
          </div>

          <div v-else-if="currentPage.path === '/components/avatar'" class="demo-preview demo-preview--tags">
            <BaAvatar initials="BA" />
            <BaAvatar initials="TC" shape="rounded" status="online" />
            <BaAvatar initials="CJ" shape="square" size="lg" status="busy" />
          </div>

          <div v-else-if="currentPage.path === '/components/card'" class="demo-preview">
            <BaCard title="签约项目" description="适合展示摘要、状态和操作入口" interactive>
              <p>把表单、统计和操作按钮组合放进卡片里，会更接近后台产品的真实使用场景。</p>
              <template #footer>
                <BaButton size="sm">查看详情</BaButton>
              </template>
            </BaCard>
          </div>

          <div v-else-if="currentPage.path === '/components/divider'" class="demo-preview">
            <BaDivider>Section</BaDivider>
            <div class="demo-preview demo-preview--tags">
              <span>概览</span>
              <BaDivider direction="vertical" dashed />
              <span>数据</span>
              <BaDivider direction="vertical" dashed />
              <span>设置</span>
            </div>
          </div>

          <div v-else-if="currentPage.path === '/components/alert'" class="demo-preview">
            <BaAlert title="信息提示" description="这是一条适合说明当前页面状态的信息提示。" />
            <BaAlert variant="success" title="保存成功" description="你的组件样式已经同步到文档站。" />
            <BaAlert variant="warning" title="注意" description="发布前请再确认包名和 README 内容。" closable />
            <BaAlert variant="error" title="构建失败" description="请检查类型定义或导出入口是否完整。" />
          </div>

          <div v-else-if="currentPage.path === '/components/progress'" class="demo-preview">
            <BaProgress :model-value="28" />
            <BaProgress :model-value="64" status="success" striped />
            <BaProgress :model-value="82" status="warning" />
            <BaProgress :model-value="94" status="error" size="lg" />
          </div>

          <div v-else-if="currentPage.path === '/components/skeleton'" class="demo-preview">
            <BaSkeleton avatar :rows="4" />
            <BaSkeleton :rows="3" />
          </div>

          <div v-else-if="currentPage.path === '/components/empty'" class="demo-preview">
            <BaEmpty title="暂无订单数据" description="当前筛选条件下还没有可展示的订单记录。">
              <BaButton size="sm">新建订单</BaButton>
            </BaEmpty>
          </div>

          <div v-else-if="currentPage.path === '/components/stat'" class="demo-preview demo-preview--tags">
            <BaStat label="今日成交额" value="128,900" hint="+12.8% compared to yesterday" trend="up" />
            <BaStat label="退款订单" value="18" hint="Need review" trend="down" />
            <BaStat label="待发货" value="86" hint="Stable" trend="neutral" />
          </div>

          <div v-else-if="currentPage.path === '/components/breadcrumb'" class="demo-preview">
            <BaBreadcrumb :items="[...breadcrumbItems]" />
          </div>

          <div v-else-if="currentPage.path === '/components/tabs'" class="demo-preview">
            <BaTabs v-model="activeTab" :items="[...tabItems]">
              <template #default="{ value }">
                <p v-if="value === 'overview'">这里适合放总览数据、关键指标和顶部摘要。</p>
                <p v-else-if="value === 'orders'">这里适合放订单列表、筛选器和批量操作入口。</p>
                <p v-else>这里适合放文件、图片或素材资产等内容。</p>
              </template>
            </BaTabs>
          </div>

          <div v-else-if="currentPage.path === '/components/steps'" class="demo-preview">
            <BaSteps :model-value="2" :items="[...stepItems]" />
          </div>

          <div v-else-if="currentPage.path === '/components/timeline'" class="demo-preview">
            <BaTimeline :items="[...timelineItems]" />
          </div>

          <div class="demo-meta">
            <div>
              <span>当前路由</span>
              <strong>{{ currentPage.path }}</strong>
            </div>
            <div>
              <span>搜索可达</span>
              <strong>Yes</strong>
            </div>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>引入示例</h3>
            <pre class="code-block"><code>{{ currentComponentDoc?.usageCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>Props</h3>
            <table class="api-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>默认</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in currentComponentDoc?.props" :key="row.name">
                  <td>{{ row.name }}</td>
                  <td>{{ row.type }}</td>
                  <td>{{ row.default }}</td>
                  <td>{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="currentComponentDoc?.events?.length" class="doc-panel">
          <h3>Events</h3>
          <table class="api-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in currentComponentDoc.events" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.type }}</td>
                <td>{{ row.default }}</td>
                <td>{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="currentComponentDoc?.slots?.length" class="doc-panel">
          <h3>Slots</h3>
          <table class="api-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in currentComponentDoc.slots" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.type }}</td>
                <td>{{ row.default }}</td>
                <td>{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <nav class="docs-pager">
        <a v-if="previousPage" class="docs-pager__item" :href="pageHref(previousPage.path)">
          <span class="docs-pager__label">上一个</span>
          <strong>{{ previousPage.title }}</strong>
        </a>
        <span v-else class="docs-pager__item docs-pager__item--empty"></span>

        <a v-if="nextPage" class="docs-pager__item docs-pager__item--next" :href="pageHref(nextPage.path)">
          <span class="docs-pager__label">下一个</span>
          <strong>{{ nextPage.title }}</strong>
        </a>
      </nav>
    </main>
  </div>
</template>
