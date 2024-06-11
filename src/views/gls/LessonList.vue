<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="search">
        <a-row :gutter="24">
          <a-col>
            <a-form-item label="课程名称">
              <a-input v-model="queryParam.name_like" placeholder="请输入课程名称"></a-input>
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
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
          <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
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
    </div>

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
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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


        <span slot="nameLink" slot-scope="text, record">
            <a :href="`http://82.157.136.170:9100/meeting_web/${record.id}`" target="_blank">{{ text }}</a>
          </span>

        <span slot="timeFormat" slot-scope="text, record">
            {{ text ? text.replace(/:\d\d$/, '') : '' }}
          </span>

        <span slot="signUpListText" slot-scope="text,record">
            <a @click="showSignUpList(record)">报名列表</a>
          </span>

      </a-table>
    </div>

    <lesson-modal ref="modalForm" @ok="modalFormOk"></lesson-modal>


    <lesson-user-list-modal ref="lessonUserList"></lesson-user-list-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import {mixinDevice} from '@/utils/mixin'
import {ListMixin} from '@/mixins/ListMixin'
import LessonModal from './modules/LessonModal'
import LessonUserListModal from './modules/LessonUserListModal'

export default {
  name: 'LessonList',
  mixins: [ListMixin, mixinDevice],
  components: {
    LessonModal, LessonUserListModal
  },
  data() {
    return {
      description: '课程表列表页',
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
          title: '课程名称',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: {customRender: 'nameLink'},
        },
        {
          title: '开始时间',
          align: 'center',
          dataIndex: 'startTime',
          scopedSlots: {customRender: 'timeFormat'},
        },
        {
          title: '结束时间',
          align: 'center',
          dataIndex: 'endTime',
          scopedSlots: {customRender: 'timeFormat'},
        },
        {
          title: '报名开始时间',
          align: 'center',
          dataIndex: 'signUpStartTime',
          scopedSlots: {customRender: 'timeFormat'},
        },
        {
          title: '报名结束时间',
          align: 'center',
          dataIndex: 'signUpEndTime',
          scopedSlots: {customRender: 'timeFormat'},
        },
        {
          title: '报名列表',
          align: 'center',
          dataIndex: 'signUpList',
          scopedSlots: {customRender: 'signUpListText'},
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          fixed: 'right',
          scopedSlots: {customRender: 'action'},
        }
      ],
      baseURL: process.env.VUE_APP_API_URL,
      url: {
        list: "/manager/gls/lesson/list",
        delete: "/manager/gls/lesson/delete",
        deleteBatch: "/manager/gls/lesson/deleteBatch",
        exportXlsUrl: "/manager/gls/lesson/exportXls",
        importExcelUrl: "/manager/gls/lesson/importExcel",
      },
      dictOptions: {},
    }
  },
  created() {
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    },
  },
  methods: {
    search() {
      this.searchQuery();
    },
    initDictConfig() {
      //初始化字典配置
    },


    showSignUpList(record) {
      this.$refs.lessonUserList.show(record);
    }
  }
}
</script>
<style scoped>
@import '~@/assets/less/common.less';
</style>

