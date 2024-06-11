<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="search">
        <a-row :gutter="24">
          <a-col>
            <a-form-item label="文件名称">
              <a-input v-model="queryParam.fileName_like" placeholder="请输入文件名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="完整路径">
              <a-input v-model="queryParam.path_like" placeholder="请输入完整路径"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="文件类型">
              <a-input v-model="queryParam.type_like" placeholder="请输入文件类型"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="search" icon="search">查询</a-button>
                <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <!--    <div class="table-operator">
          <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
          &lt;!&ndash; <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
              <a-button type="primary" icon="import">导入</a-button>
          </a-upload> &ndash;&gt;
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel">
                <a-icon type="delete"/>
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </div>-->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;" v-show="selectedRowKeys.length>0">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
          style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :scroll="{x:true}"
          class="j-table-force-nowrap"
          @change="handleTableChange">
          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a-dropdown>
              <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="handleDetail(record)">详情</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>

      </a-table>
    </div>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import {mixinDevice} from '@/utils/mixin'
import {ListMixin} from '@/mixins/ListMixin'

export default {
  name: 'OssFileList',
  mixins: [ListMixin, mixinDevice],
  components: {},
  data() {
    return {
      description: 'Oss File列表页',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          fixed: 'left',
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '文件名称',
          align: 'center',
          dataIndex: 'fileName'
        },
        /*{
          title: '文件地址',
          align: 'center',
          dataIndex: 'url'
        },*/
        {
          title: '完整路径',
          align: 'center',
          dataIndex: 'path'
        },
        {
          title: '文件类型',
          align: 'center',
          dataIndex: 'type'
        },
        {
          title: '文件大小',
          align: 'center',
          dataIndex: 'size'
        },
        /*{
          title: '已回执的',
          align: 'center',
          dataIndex: 'receipt'
        },*/
        /*{
          title: '存储方式 1:本地',
          align: 'center',
          dataIndex: 'storageMode'
        },*/
        {
          title: '创建日期',
          align: 'center',
          dataIndex: 'createTime'
        },
        /*{
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
        }*/
      ],
      baseURL: process.env.VUE_APP_API_BASE_URL,
      url: {
        list: "/sys/file/list",
        delete: "/sys/file/delete",
        deleteBatch: "/sys/file/deleteBatch",
        exportXlsUrl: "/sys/file/exportXls",
        importExcelUrl: "/sys/file/importExcel",
      },
      dictOptions: {},

      isorter: {
        column: 'createTime',
        order: 'desc'
      }
    }
  },
  created() {
  },
  methods: {
    search() {
      this.searchQuery();
    },
    initDictConfig() {
      //初始化字典配置
    },
  }
}
</script>
<style scoped>
@import '~@/assets/less/common.less';
</style>

