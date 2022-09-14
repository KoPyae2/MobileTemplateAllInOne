
export default {
  state() {
    return {
      user: {},
      token: "",
      langId: 1,
      lang: "en",
      vip_detail: [],
      other_invite_code: "",
      login_type: 2,
      login_method: {},
      order: {
        order_number: "",
        own_order: false,
      },
      bank:{
        address:'',
        mainnet:''
      },
      ownLanguage:null,
      from:'account',
      systemConfig: {},
    };
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    },
    SET_OWN_LANG(state, data) {
      state.ownLanguage = data;
    },
    SET_LANG(state, data) {
      state.lang = data;
    },
    SET_LANGID(state, data) {
      state.langId = data;
    },
    SET_LOGIN_TYPE(state, data) {
      state.login_type = data;
    },
    SET_LOGIN_METHOD(state, data) {
      state.login_method = data;
    },
    SET_VIPINFO(state, data) {
      state.vip_detail = data;
    },
    SET_ORDER_ID(state, data) {
      state.order = data;
    },
    SET_OTHER_CODE(state, data) {
      state.other_invite_code = data;
    },
    SET_BANK(state, data) {
      state.bank = data;
    },
    SET_FROM(state, data) {
      state.from = data;
    },
    SET_SYSTEM_CONFIG(state, data) {
      state.systemConfig = data;
    },
  },
  actions: {
    getUserInfo({ commit }, data) {
      // getUserDetail().then((res) => {
      //   if (res.code === 0) {
      //     commit("SET_USER", res.data);
      //   }
      // });
    },
    setLang({ commit }, data) {
      commit("SET_LANG", data);
    },
    setOwnLang({ commit }, data) {
      commit("SET_OWN_LANG", data);
    },
    setLoginType({ commit }, data) {
      commit("SET_LOGIN_TYPE", data);
    },
    setLoginMethod({ commit }, data) {
      commit("SET_LOGIN_METHOD", data);
    },
    setOrderID({ commit }, data) {
      commit("SET_ORDER_ID", data);
    },
    setBank({ commit },data){
      commit("SET_BANK",data);
    }
  },
};
