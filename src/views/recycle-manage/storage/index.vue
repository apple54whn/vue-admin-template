<template>
  <div class="app-container">
    <el-tabs v-model="editableTabsValue" type="card" @edit="handleTabsEdit">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
        <component :is="item.component" @addComponent="addComponent" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import info from './info'
import add from './add'
import edit from './edit'

export default {
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '入库管理',
          name: '1',
          component: info,
          closable: false
        }
      ],
      tabIndex: 2
    }
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
    addComponent(value) {
      if (value === '2') {
        this.editableTabs.splice(1, 1, {
          title: '新增入库单',
          name: '2',
          component: add,
          closable: true
        })
      } else if (value === '3') {
        this.editableTabs.splice(1, 1, {
          title: '编辑入库单',
          name: '3',
          component: edit,
          closable: true
        })
      }
      this.editableTabsValue = value
    }
  }
}
</script>

<style>
</style>
