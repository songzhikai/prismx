const prismx = {
  state: {
    reportState: 'new', //new edit preview
    reportMetaData: {}, //报表元数据
    pivot: { rows: [], columns: [], values: [] }, //rows:[{id: '', type: '', column: '', label: '', desc: ''}]
    pivotData: []
  },
  mutations: {
    setPivot(state, pivot) {
      state.pivot = pivot
    }
  }
}

export default prismx
