<script setup lang="ts">
import type { TableRow } from '../types';

defineProps<{
  title: string;
  rows: TableRow[];
}>();
</script>

<template>
  <div class="doc-panel">
    <h3>{{ title }}</h3>
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
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.default }}</td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
