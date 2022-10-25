import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		list: JSON.parse(uni.getStorageSync('carts') || '[]')
	},
	getters: {
		num(state) {
			return state.list.filter(item => item.flag).reduce((i, e) => i += e.num, 0)
		},
		sum(state) {
			return state.list.filter(item => item.flag).reduce((i, e) => i += e.num * e.price, 0)
		}
	},
	mutations: {
		saveCarts(state) {
			uni.setStorageSync('carts', JSON.stringify(state.list))
		},
		addobj(state, obj) {

			let i = state.list.findIndex(item => item.id == obj.id)
			console.log(i);
			if (i == -1) {
				state.list.push(obj)
			} else {
				state.list[i].num++
			}
			this.commit('saveCarts')
		},
		delobj(state, i) {
			state.list.splice(i, 1)
			this.commit('saveCarts')
		},
		addnum(state, i) {
			state.list[i].num++
			this.commit('saveCarts')
		},
		delnum(state, i) {
			state.list[i].num--
			this.commit('saveCarts')
		},
		setFlag(state, i) {
			state.list[i].flag = !state.list[i].flag
			this.commit('saveCarts')
		},
		setqx(state,val){
			state.list.forEach(item=>item.flag=val)
			this.commit('saveCarts')
		}
		
	},
	actions: {},
	modules: {}
})
