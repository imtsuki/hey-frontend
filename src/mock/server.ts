import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      mission: Model,
    },

    seeds(server) {
      server.create('mission', {
        missionId: '1',
        title: '资讯网站前端改版',
        description:
          '1.前台首页布局优化调整，改为信息流模式；2.将其他页面风格与新首页的风格进行统一。详见附件需求文档',
        owner: 'tsuki',
        created: '',
      } as any);
      server.create('mission', {
        missionId: '2',
        title: '快手app数据采集',
        description: '根据提供快手账号采集APP视频，视频评论，直播弹幕。',
        owner: 'wmc',
        created: '',
      } as any);
      server.create('mission', {
        missionId: '3',
        title: '仪器仪表智能识别',
        description:
          '功能需求：1、阀门状态2、开关状态识别3、指示灯状态，部分获取闪烁频率（状态识别）4、液位识别5、仪表（数字和指针）识别',
        owner: 'tsparrot',
        created: '',
      } as any);
      server.create('mission', {
        missionId: '4',
        title: '大巴车通勤预定小程序开发',
        description: `主要功能需求：

        大巴车通勤预定小程序
        
        1、支持购买单次票
        
        2、支持购买包月票
        
        3、用户可以查看班车路线及实时位置
        
        4、可以按日按月导出每条线路的大巴车乘车订单数据
        
        5、参考APP:飞牛巴士`,
        owner: '',
        created: '',
      } as any);
      server.create('mission', {
        missionId: '5',
        title: '工具应用',
        description:
          '开发一款群控脚本，一键抢号（可设置一秒触发多少次），一键群控（控制一个安卓模拟器，其他模拟器跟随操作）等。',
        owner: '',
        created: '',
      } as any);
    },

    routes() {
      this.namespace = 'api';

      this.get('/missions', (schema: any) => {
        return schema.missions.all();
      });
    },
  });

  return server;
}
