import { post, get } from "@/utils/request";

export const getRooms = (data) => {
  return get("/rooms/list", data);
};

export const getVipRooms = () => {
  return get("/home/vips");
};

export const getPrivateOrder = (data) => {
  return get("/orders/privates", data);
};

export const getVipRoomsWinner = (data) => {
  return get("/orders/order-room-statistics", data);
};

export function getBanner(data) {
  return get("/home/banners", data);
}

export function getNotics(data) {
  return get("/home/notices", data);
}

export const getRoomDetail = (data) => {
  return get("/rooms/detail", data);
};

export const orderGood = (data) => {
  return post("/orders/create", data);
};

export const getOrderDetail = (data) => {
  return get("/orders/detail", data);
};

export const getJoiningOrder = (data) => {
  return get("/orders/joinning-list", data);
};

export const getRequestMember = (data) => {
  return get("/orders/members", data);
};

export const adjustMember = (data) => {
  return post("/orders/adjust-member", data);
};

export const getPrivateRoom = (data) => {
  return get("/orders/self-private-order", data);
};

export const joinRoom = (data) => {
  return post("/orders/join", data);
};

export function getLanguages(params) {
  return get("/home/languages", params);
}

export function getNotice() {
  return get("/home/notices");
}

export function getTimeZone() {
  return get("/user/time");
}

export function getOrders(params) {
  return get("/orders/list", params);
}

export function getlotteryList(params) {
  return get("/luck/top-winner", params);
}

export function getlotteryChance(params) {
  return get("/luck/spin-chance", params);
}

export const getLuckyRoomCoupons = (data) => {
  return get("/luck/order-coupons", data);
};

export const getLuckyRoomDetail = (data) => {
  return get("/rooms/luck-goods", data);
};

export function getlotterySegments(params) {
  return get("/luck/segments", params);
}

export function spinLucky(params) {
  return post("/luck/create-order", params);
}

export function getRebteData(params) {
  return get("/finance/team-statistics", params);
}

export function getEarningData(params) {
  return get("/finance/activity-reward", params);
}

export function getRoomCategories() {
  return get("/rooms/category");
}
