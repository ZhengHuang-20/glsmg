<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="search">
        <a-row :gutter="24">
          <a-col>
            <a-form-item label="用户昵称">
              <a-input v-model="queryParam.nickname_like" placeholder="请输入用户昵称"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="用户手机号">
              <a-input v-model="queryParam.phone_like" placeholder="请输入用户手机号"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="开始时间">
              <s-date v-model="queryParam.createTime_begin" date-format="YYYY-MM-DD" style="width:100%"
                      placeholder="请选择开始时间"></s-date>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="结束时间">
              <s-date v-model="queryParam.createTime_end" date-format="YYYY-MM-DD" style="width:100%"
                      placeholder="请选择结束时间"></s-date>
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
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
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

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="text" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="videoImgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getAvatarView(text)" height="25px" alt=""
               style="max-width:80px;font-size: 12px;font-style: italic;"/>
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
        <span slot="third" slot-scope="text, record">
            <span @click="queryDetail(record)"><a href="javascript:;">查看</a></span>
          </span>
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

    <uc-user-modal ref="modalForm" @ok="modalFormOk"></uc-user-modal>
    <user-third-list-modal ref="thirdmodal"></user-third-list-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import {mixinDevice} from '@/utils/mixin'
import {ListMixin} from '@/mixins/ListMixin'
import UcUserModal from './modules/UcUserModal'
import JSelectDepart from '@/components/sbcbiz/JSelectDepart'
import UserThirdListModal from './modules/UserThirdListModal'

export default {
  name: 'UcUserList',
  mixins: [ListMixin, mixinDevice],
  components: {
    UcUserModal,
    JSelectDepart,
    UserThirdListModal
  },
  data() {
    return {
      description: '前端用户管理页面',
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
          title: '用户id',
          align: "center",
          dataIndex: 'id',
          fixed: 'left',
        },
        {
          title: '用户名',
          align: "center",
          dataIndex: 'username',
          fixed: 'left',
        },
        {
          title: '用户昵称',
          align: "center",
          dataIndex: 'nickname',
        },
        /*{
          title: '用户来源',
          align: "center",
          dataIndex: 'sceneSource',
        },*/
        // {
        //   title:'用户头像',
        //   align:"center",
        //   dataIndex: 'avatar',
        //   scopedSlots: { customRender: 'imgSlot' }
        // },

          /*    @ApiModelProperty(value = "邮箱")
    private String email;

    @ApiModelProperty(value = "")
    private String region;

    @ApiModelProperty(value = "")
    private String ;

    @ApiModelProperty(value = "")
    private String glsRole;

    @ApiModelProperty(value = "小组负责人")
    private String glsGroupPrincipal;

    @ApiModelProperty(value = "辅导老师姓名")
    private String glsTutor;*/

        {
          title: '邮箱',
          align: "center",
          dataIndex: 'email',
        },
        {
          title: '所在地区',
          align: "center",
          dataIndex: 'region',
        },
        {
          title: '所属小组',
          align: "center",
          dataIndex: 'glsGroup',
        },
        {
          title: '角色',
          align: "center",
          dataIndex: 'glsRole',
        },
        {
          title: '小组负责人',
          align: "center",
          dataIndex: 'glsGroupPrincipal',
        },
        {
          title: '辅导老师姓名',
          align: "center",
          dataIndex: 'glsTutor',
        },

        /*{
          title: '用户手机号',
          align: "center",
          dataIndex: 'phone',
        },*/
        /*{
          title: '性别',
          align: "center",
          dataIndex: 'sex_dictText',
        },
        {
          title: '手机区域号',
          align: "center",
          dataIndex: 'phoneCode',
        },*/
        {
          title: '注册时间',
          align: "center",
          dataIndex: 'createTime',
        },
        /*{
          title: '第三方账号',
          align: "center",
          dataIndex: '',
          scopedSlots: {customRender: 'third'},
        },*/
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",

          fixed: 'right',
          scopedSlots: {customRender: 'action'},
        }
      ],
      baseURL: process.env.VUE_APP_API_BASE_URL,
      url: {
        list: "/manager/uc/user/list",
        delete: "/manager/uc/user/delete",
        deleteBatch: "/manager/uc/user/deleteBatch",
        exportXlsUrl: "/manager/uc/user/exportXls",
        importExcelUrl: "/manager/uc/user/importExcel",
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
    queryDetail(record) {
      this.$refs.thirdmodal.add(record);
      this.$refs.thirdmodal.title = "第三方平台查看";
      this.$refs.thirdmodal.disableSubmit = false;
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username);
    },
    search() {
      this.searchQuery();
    },
    initDictConfig() {
    },
    getAvatarView: function (avatar) {
      return avatar + '?x-oss-process=video/snapshot,t_1000,m_fast'
    },
  }
}
</script>
<style scoped>
@import '~@/assets/less/common.less';
</style>
