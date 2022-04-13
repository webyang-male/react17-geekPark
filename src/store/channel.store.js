import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class channelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }
  //频道列表数据获取
  loadChannelList = async () => {
    const res = await http.get("/channels"); //获取频道列表
    this.channelList = res.data.channels;
  };
}
export default channelStore;
