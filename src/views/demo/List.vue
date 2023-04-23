<script lang="ts">
export default {
    name: 'DemoList',
}
</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumnsType, TablePaginationConfig } from 'ant-design-vue'
import { SearchForm, Form } from './model'
import { TYPE_ENUMS, TYPE_LIST, TYPE_COLORS } from './enums'
import http from '@/libs/axios'
const form = reactive<SearchForm>({
    name: '',
    type: '',
    address: '',
})
const pagination: TablePaginationConfig = reactive({
    current: 1,
    total: 0,
    size: 'default',
    showTotal: (total: number) => `共${total}条`,
    position: ['bottomCenter'],
})
const columns = ref<TableColumnsType>([
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
])
const list = ref<Form[]>([])
const loading = ref(false)
const getList = (current = 1) => {
    loading.value = true
    http.post('/demo/list', { ...form, current })
        .then((res) => {
            const { data, page } = res.data
            list.value = data || []
            pagination.total = page.total
            pagination.current = current
        })
        .catch(() => ({}))
        .finally(() => {
            loading.value = false
        })
}
const router = useRouter()
const toDetail = (routeName: string) => {
    router.push({
        name: routeName,
    })
}
getList()
</script>

<template>
    <a-card>
        <a-form :model="form">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="名称" name="name">
                        <a-input v-model:value="form.name" allowClear autocomplete="off" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="类型" name="type">
                        <a-select v-model:value="form.type" allowClear>
                            <a-select-option v-for="{ key, value } in TYPE_LIST" :value="key" :key="key">
                                {{ value }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地址" name="address">
                        <a-input v-model:value="form.address" autocomplete="off" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-button @click="toDetail('DemoForm')" type="primary">
                        <template #icon><SearchOutlined /></template>
                        新增
                    </a-button>
                    <a-button @click="getList(1)" type="primary">
                        <template #icon><SearchOutlined /></template>
                        查询
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table
            :dataSource="list"
            :columns="columns"
            :pagination="pagination"
            :loading="loading"
            @change="getList($event.current)"
            bordered
            size="small"
            class="mt20 self-page"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                    <a-tag :color="TYPE_COLORS[record.type]">
                        {{ TYPE_ENUMS[record.type] }}
                    </a-tag>
                </template>
                <template v-else-if="column.key === 'address'">
                    <a :href="record.address" target="_blank">{{ record.address }}</a>
                </template>
            </template>
        </a-table>
    </a-card>
</template>
