/**
 * 天气图标列表参考：https://www.hko.gov.hk/textonly/v2/explain/wxicon_e.htm
 */

// 通用的时间记录接口
interface TimeRange {
  startTime: string; // Format: YYYY-MM-DD'T'hh:mm:ssZ
  endTime: string; // Format: YYYY-MM-DD'T'hh:mm:ssZ
}

// 降雨数据接口
interface RainfallData {
  unit: string;
  place: string;
  max: number;
  main: 'TRUE' | 'FALSE';
}

// 闪电数据接口
interface LightningData {
  place: string;
  occur: boolean;
}

// 紫外线指数数据接口
interface UVIndexData {
  place: string;
  value: number;
  desc: string;
  message?: string;
}

// 温度数据接口
interface TemperatureData {
  place: string;
  value: number;
  unit: string;
}

// 湿度数据接口
interface HumidityData {
  unit: string;
  value: number;
  place: string;
}

/**
 * 当前天气报告响应接口
 * 基于 REQ_0002 规范
 */
export interface ImakeRhrreadResponse {
  // 降雨信息
  rainfall?: {
    data: RainfallData[];
  } & TimeRange;

  // 闪电信息
  lightning?: {
    data: LightningData[];
  } & TimeRange;

  // 天气图标
  icon: number[];
  iconUpdateTime: string;

  // 紫外线指数
  uvindex?: {
    data: UVIndexData[];
    recordDesc: string;
  };

  // 更新时间
  updateTime: string;

  // 警告信息
  warningMessage: string | string[];

  // 暴雨提醒
  rainstormReminder?: string;

  // 特别天气提示
  specialWxTips?: string;

  // 热带气旋信息
  tcmessage?: string | string[];

  // 温度信息
  temperature: {
    data: TemperatureData[];
    recordTime: string;
  };

  // 湿度信息
  humidity: {
    data: HumidityData[];
    recordTime: string;
  };

  // 从午夜到上午9点的最低温度
  mintempFrom00To09?: string;

  // 从午夜到中午的累积降雨量
  rainfallFrom00To12?: string;

  // 上月降雨量
  rainfallLastMonth?: string;

  // 从1月到上月的累积降雨量
  rainfallJanuaryToLastMonth?: string;
}
