<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
<!--    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="search">
        <a-row :gutter="24">
          <a-col>
            <a-form-item label="学员名称">
              <a-input v-model="queryParam.name_like" placeholder="请输入学员名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="邮箱">
              <a-input v-model="queryParam.email_like" placeholder="请输入邮箱"></a-input>
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
    </div>-->
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
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
          class="j-table-force-nowrap"
          @change="handleTableChange">

      </a-table>
    </div>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import {mixinDevice} from '@/utils/mixin'
import {ListMixin} from '@/mixins/ListMixin'

export default {
  name: 'LessonUserList',
  mixins: [ListMixin, mixinDevice],
  components: {},
  props: {
    lessonId: {
      type: String,
    },
  },
  data() {
    return {
      description: '课程报名列表',
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
          title: '学员名称',
          align: 'center',
          fixed: 'left',
          dataIndex: 'username'
        },
        {
          title: '邮箱',
          align: 'center',
          dataIndex: 'email'
        },
        {
          title: '报名时间',
          align: 'center',
          dataIndex: 'createTime',
        },
        /*
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          fixed: 'right',
          scopedSlots: {customRender: 'action'},
        }*/
      ],
      baseURL: process.env.VUE_APP_API_URL,
      url: {
        list: "/manager/gls/lesson/sinUplist",
      },
      dictOptions: {},

      isorter: {
        column: 'createTime',
        order: 'desc'
      },

      verifyVisible: false,
      confirmLoading: false,
      verifyModel: {
        id: null,
        name: null,
        verifyStatus: 0,
        verifyMessage: null,
      },
      rules: {
        verifyStatus: [{required: true, message: '请选择审核状态!', trigger: 'change'}],
      },

      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    }
  },
  created() {
    this.queryParam = {
      lessonId: this.lessonId
    }
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
    searchReset() {
      this.queryParam = {
        lessonId: this.lessonId
      }
      this.loadData(1);
    },
    initDictConfig() {
      //初始化字典配置
    }
  }
}
</script>
<style scoped>
@import '~@/assets/less/common.less';


.a-down {
  display: block;
  margin-right: 10px;
}
</style>

