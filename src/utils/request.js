import axios from "./axios";

import { cloneDeep, omit, assign } from "lodash-es";

export function get(apiUrl, params) {
  let paramsData = {};
  if (params && params.page && params.pageSize) {
    const data = cloneDeep(params);
    const pager = {
      page: data.page,
      pageSize: data.pageSize,
    };
    const pagerParams = { pager: JSON.stringify(pager) };

    const remainderParams = omit(data, ["page", "pageSize", "options"]);
    paramsData = assign(pagerParams, data.options, remainderParams);
  } else {
    paramsData = params;
  }
  return axios.get(apiUrl, { params: paramsData });
}

export function post(apiUrl, params) {
  let postData = {};
  if (params && params.page && params.pageSize) {
    const data = cloneDeep(params);
    const pager = {
      page: data.page,
      pageSize: data.pageSize,
    };
    const pagerParams = { pager: pager };

    const remainderParams = omit(data, ["page", "pageSize", "options"]);
    postData = assign(pagerParams, { options: data.options }, remainderParams);
  } else {
    postData = params;
  }
  return axios.post(apiUrl, postData);
}

export function $put(apiUrl, params) {
  return axios.put(apiUrl, params);
}

export function $delete(apiUrl, params) {
  return axios.delete(apiUrl, { data: params });
}
