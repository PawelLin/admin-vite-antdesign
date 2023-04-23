<script lang="ts">
export default {
    name: 'DemoForm',
}
</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import http from '@/libs/axios'
import { useCommon } from '@/libs/hooks'
import { Form } from './model'
import { TYPE_LIST } from './enums'

const form: Form = reactive({
    id: undefined,
    name: '',
    type: '',
    address: '',
})
const loading = ref(false)
const { routerPushTip } = useCommon()
const onFinish = () => {
    loading.value = true
    http.post('/demo/add', form)
        .then(() => {
            routerPushTip({ name: 'DemoList' }, '提交成功')
        })
        .catch(() => ({}))
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <a-card>
        <a-form
            :model="form"
            :label-col="{ style: { width: '80px' } }"
            :wrapper-col="{ xl: { span: 6 } }"
            @finish="onFinish"
        >
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入' }]">
                <a-input v-model:value="form.name" allowClear autocomplete="off" />
            </a-form-item>
            <a-form-item label="类型" name="type" :rules="[{ required: true, message: '请选择' }]">
                <a-select v-model:value="form.type" allowClear>
                    <a-select-option v-for="{ key, value } in TYPE_LIST" :value="key" :key="key">
                        {{ value }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="地址" name="address" :rules="[{ required: true, message: '请输入' }]">
                <a-input v-model:value="form.address" autocomplete="off" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" :loading="loading">提交</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
