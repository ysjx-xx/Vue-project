import { request } from "./request";
export function getGoodsData(iid){
    return request({
        url:"/detail",
        params:{
            iid
        }
    })
}
export class GoodsDetails{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title
        this.desc=itemInfo.desc
        this.oldPrice=itemInfo.oldPrice
        this.newPrice=itemInfo.price
        this.discount=itemInfo.discountDesc
        this.columns=columns
        this.services=services
        this.realPrice=itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }

  export class GoodsParam {
    constructor(info, rule) {
      //images可能没有值,做一个判断
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }





  

