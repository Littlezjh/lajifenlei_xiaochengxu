// components/history-item/history-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iamgePath: {
      type: String,
      value: ''
    },
    kind: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    },
    iconPath: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  attached: function() {
    console.log('component attached!');
  },

  detached: function() {
    console.log('component dettached!');
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})