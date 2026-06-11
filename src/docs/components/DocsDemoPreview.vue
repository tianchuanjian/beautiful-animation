<script setup lang="ts">
import { ref } from 'vue';
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
  BaPopover,
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
} from '../../index';
import type { ComponentPagePath } from '../types';

defineProps<{
  pagePath: ComponentPagePath;
}>();

const amount = ref('12888.50');
const note = ref('适合录入合同备注');
const detail = ref('这是一段支持自动高度、字数统计和清空按钮的多行输入示例。');
const city = ref<'hangzhou' | 'shanghai' | 'shenzhen' | ''>('hangzhou');
const priority = ref<'normal' | 'urgent' | 'vip' | ''>('vip');
const agreement = ref(true);
const subscribe = ref(false);
const contactMethod = ref<'wechat' | 'phone' | 'email'>('wechat');
const notifications = ref(true);
const smartAmount = ref(false);
const betaTagVisible = ref(true);
const loading = ref(false);
const popoverVisible = ref(false);
const activeTab = ref<'overview' | 'orders' | 'assets'>('overview');

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

function closeBetaTag() {
  betaTagVisible.value = false;
}

function resetBetaTag() {
  betaTagVisible.value = true;
}
</script>

<template>
  <div class="demo-card">
    <div v-if="pagePath === '/components/input'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/textarea'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/select'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/popover'" class="demo-preview">
      <BaPopover v-model="popoverVisible" placement="bottom-start">
        <template #trigger="{ toggle }">
          <BaButton variant="secondary" @click="toggle">打开弹层</BaButton>
        </template>

        <div class="doc-panel" style="width: 280px; margin: 0;">
          <h3>弹层卡片</h3>
          <p>适合用于 select 的菜单所在层，也可以扩展到过滤器、快捷操作和状态提示。</p>
        </div>
      </BaPopover>
    </div>

    <div v-else-if="pagePath === '/components/checkbox'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/radio'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/switch'" class="demo-preview">
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

    <div v-else-if="pagePath === '/components/button'" class="demo-preview demo-preview--buttons">
      <BaButton variant="primary" @click="loading = !loading">Primary</BaButton>
      <BaButton variant="secondary">Secondary</BaButton>
      <BaButton variant="ghost">Ghost</BaButton>
      <BaButton variant="danger">Danger</BaButton>
      <BaButton :loading="loading" block>Loading Demo</BaButton>
    </div>

    <div v-else-if="pagePath === '/components/badge'" class="demo-preview demo-preview--tags">
      <BaBadge value="8" />
      <BaBadge variant="success" value="New" />
      <BaBadge variant="warning" value="99+" />
      <BaBadge variant="danger" dot pulse />
      <BaBadge variant="ghost" value="Draft" />
    </div>

    <div v-else-if="pagePath === '/components/tag'" class="demo-preview demo-preview--tags">
      <BaTag variant="primary">Primary</BaTag>
      <BaTag variant="success" pulse>Success</BaTag>
      <BaTag variant="warning">Warning</BaTag>
      <BaTag variant="danger">Danger</BaTag>
      <BaTag variant="ghost" round>Ghost Round</BaTag>
      <BaTag v-if="betaTagVisible" closable pulse @close="closeBetaTag">Beta Access</BaTag>
      <BaButton v-else variant="secondary" size="sm" @click="resetBetaTag">恢复 Beta Tag</BaButton>
    </div>

    <div v-else-if="pagePath === '/components/avatar'" class="demo-preview demo-preview--tags">
      <BaAvatar initials="BA" />
      <BaAvatar initials="TC" shape="rounded" status="online" />
      <BaAvatar initials="CJ" shape="square" size="lg" status="busy" />
    </div>

    <div v-else-if="pagePath === '/components/card'" class="demo-preview">
      <BaCard title="签约项目" description="适合展示摘要、状态和操作入口" interactive>
        <p>把表单、统计和操作按钮组合放进卡片里，会更接近后台产品的真实使用场景。</p>
        <template #footer>
          <BaButton size="sm">查看详情</BaButton>
        </template>
      </BaCard>
    </div>

    <div v-else-if="pagePath === '/components/divider'" class="demo-preview">
      <BaDivider>Section</BaDivider>
      <div class="demo-preview demo-preview--tags">
        <span>概览</span>
        <BaDivider direction="vertical" dashed />
        <span>数据</span>
        <BaDivider direction="vertical" dashed />
        <span>设置</span>
      </div>
    </div>

    <div v-else-if="pagePath === '/components/alert'" class="demo-preview">
      <BaAlert title="信息提示" description="这是一条适合说明当前页面状态的信息提示。" />
      <BaAlert variant="success" title="保存成功" description="你的组件样式已经同步到文档站。" />
      <BaAlert variant="warning" title="注意" description="发布前请再确认包名和 README 内容。" closable />
      <BaAlert variant="error" title="构建失败" description="请检查类型定义或导出入口是否完整。" />
    </div>

    <div v-else-if="pagePath === '/components/progress'" class="demo-preview">
      <BaProgress :model-value="28" />
      <BaProgress :model-value="64" status="success" striped />
      <BaProgress :model-value="82" status="warning" />
      <BaProgress :model-value="94" status="error" size="lg" />
    </div>

    <div v-else-if="pagePath === '/components/skeleton'" class="demo-preview">
      <BaSkeleton avatar :rows="4" />
      <BaSkeleton :rows="3" />
    </div>

    <div v-else-if="pagePath === '/components/empty'" class="demo-preview">
      <BaEmpty title="暂无订单数据" description="当前筛选条件下还没有可展示的订单记录。">
        <BaButton size="sm">新建订单</BaButton>
      </BaEmpty>
    </div>

    <div v-else-if="pagePath === '/components/stat'" class="demo-preview demo-preview--tags">
      <BaStat label="今日成交额" value="128,900" hint="+12.8% compared to yesterday" trend="up" />
      <BaStat label="退款订单" value="18" hint="Need review" trend="down" />
      <BaStat label="待发货" value="86" hint="Stable" trend="neutral" />
    </div>

    <div v-else-if="pagePath === '/components/breadcrumb'" class="demo-preview">
      <BaBreadcrumb :items="[...breadcrumbItems]" />
    </div>

    <div v-else-if="pagePath === '/components/tabs'" class="demo-preview">
      <BaTabs v-model="activeTab" :items="[...tabItems]">
        <template #default="{ value }">
          <p v-if="value === 'overview'">这里适合放总览数据、关键指标和顶部摘要。</p>
          <p v-else-if="value === 'orders'">这里适合放订单列表、筛选器和批量操作入口。</p>
          <p v-else>这里适合放文件、图片或素材资产等内容。</p>
        </template>
      </BaTabs>
    </div>

    <div v-else-if="pagePath === '/components/steps'" class="demo-preview">
      <BaSteps :model-value="2" :items="[...stepItems]" />
    </div>

    <div v-else-if="pagePath === '/components/timeline'" class="demo-preview">
      <BaTimeline :items="[...timelineItems]" />
    </div>

    <div class="demo-meta">
      <div>
        <span>当前路由</span>
        <strong>{{ pagePath }}</strong>
      </div>
      <div>
        <span>搜索可达</span>
        <strong>Yes</strong>
      </div>
    </div>
  </div>
</template>
