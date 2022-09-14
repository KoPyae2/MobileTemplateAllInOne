const formatDateWithSecond = (dtime) => {
  let date = dtime.replace(/-/g, '/');
  let d = new Date(date);
  let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  let month = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  var datestring =
    d.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  return datestring;
};

export default formatDateWithSecond;