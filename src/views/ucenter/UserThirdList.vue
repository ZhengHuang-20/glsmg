<template>
    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="search">
          <a-row :gutter="24">

</a-row>
          <a-row>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="search" icon="search">查询</a-button>
                <!-- <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button> -->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 查询区域-END -->

      <!-- 操作按钮区域 -->
      <div class="table-operator">
        <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
            <a-button type="primary" icon="import">导入</a-button>
        </a-upload> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
        </a-dropdown>
      </div>

      <!-- table区域-begin -->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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

          <template slot="htmlSlot" slot-scope="text">
            <div v-html="text"></div>
          </template>
          <template slot="imgSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
            <img v-else :src="text" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
          </template>
          <template slot="videoImgSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
            <img v-else :src="getAvatarView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
          </template>
          <template slot="fileSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
            <a-button
              v-else
              :ghost="true"
              type="primary"
              icon="download"
              size="small"
              @click="downloadFile(text)">
              下载
            </a-button>
          </template>
          <span slot="action" slot-scope="text, record">
            <a @click="handleDetail(record)">详情</a>
          </span>


        </a-table>
      </div>
      <uc-user-third-modal ref="modalForm" @ok="modalFormOk"></uc-user-third-modal>
      </a-card>
  </template>

  <script>

    import '@/assets/less/TableExpand.less'
    import { mixinDevice } from '@/utils/mixin'
    import { ListMixin } from '@/mixins/ListMixin'
    import UcUserThirdModal from './modules/UcUserThirdModal'

    export default {
      name: 'UserThirdList',
      mixins:[ListMixin, mixinDevice],
      components: {
        UcUserThirdModal
      },
      data () {
        return {
          description: '第三方平台理页面',
          // 表头
          columns: [
            {
              title: '#',
              dataIndex: '',
              key:'rowIndex',
              width:60,
              align:"center",
              fixed: 'left',
              customRender:function (t,r,index) {
                return parseInt(index)+1;
              }
            },
            {
              title:'平台名称',
              align:"center",
              dataIndex: 'type_dictText',
            },
            {
              title:'openId',
              align:"center",
              dataIndex: 'openId',
            },
            {
              title:'unionId',
              align:"center",
              dataIndex: 'unionId',
            },
            {
              title: '操作',
              dataIndex: 'action',
              align:"center",
              scopedSlots: { customRender: 'action' },
            }
          ],
          baseURL: process.env.VUE_APP_API_BASE_URL,
          url: {
            list: "/manager/uc/userthird/list",
            delete: "/manager/uc/userthird/delete",
            deleteBatch: "/manager/uc/userthird/deleteBatch",
            exportXlsUrl: "/manager/uc/userthird/exportXls",
            importExcelUrl: "/manager/uc/userthird/importExcel",
          },
          dictOptions:{},
          superFieldList:[],
        }
      },
      created() {
        this.disableMixinCreated = true;
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        },
      },
      methods: {
        search(){
          this.searchQuery();
        },
        query(id){
          this.queryParam.userId = id;
          this.searchQuery();
        },
      }
    }
  </script>
  <style scoped>
    @import '~@/assets/less/common.less';
  </style>
