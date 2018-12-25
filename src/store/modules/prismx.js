const prismx = {
  state: {
    reportState: 'new', //new edit preview
    reportMetaData: {}, //报表元数据
    pivot: { rows: [], columns: [], values: [] }, //rows:[{id: '', type: '', column: '', label: '', desc: ''}]
    pivotData: [],
    storedFields: [] // 已收藏字段的id
  },
  mutations: {
    setPivot(state, pivot) {
      state.pivot = JSON.parse(JSON.stringify(pivot))
    },
    setStoredFields(state, storedFields) {
      state.storedFields = JSON.parse(JSON.stringify(storedFields))
    }
  }
}

export default prismx
