Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value'
    },
    subText: {
      type: String,
      value: ''
    },
    inputTextOne: {
      type: String,
      value: ''
    },
    inputTextTwo: {
      type: String,
      value: ''
    },
    inputNameOne: {
      type: String,
      value: ''
    },
    inputNameTwo: {
      type: String,
      value: ''
    },
    confirmName: {
      type: String,
      value: ''

    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    name: "宝贝",
    welcomeTxt: "请输入欢迎语",
    nameTemp: '',
    welcomeTxtTemp: '',
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    nameInput: function (e) {
      console.log('输入名称');
      this.setData({ nameTemp: e.detail.value })
    },
    welcomeInput: function (e) {
      this.setData({ welcomeTxtTemp: e.detail.value })
    },
    // 确认
    confirm: function (e) {
      console.log('确认事件触发');
      var nameTemp = this.data.nameTemp;
      var welcomeTxtTemp = this.data.welcomeTxtTemp;
      if (!nameTemp) { nameTemp = '宝贝' }
      if (!welcomeTxtTemp) { welcomeTxtTemp = '请输入欢迎语' }
      this.setData({
        hiddenmodalput: true,
        name: nameTemp,
        welcomeTxt: welcomeTxtTemp
      });
      this.triggerEvent('confirm',{})
    }
  }
})