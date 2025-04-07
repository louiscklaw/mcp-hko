import { ImakeFlwResponse } from '../types/ImakeFlwResponse.js';

/**
 * 格式化天气预报响应数据
 * @param response 天气预报响应数据
 * @returns 格式化后的字符串
 */
export function formatFlwResponse(response: ImakeFlwResponse): string {
  const parts: string[] = [];

  // 添加一般天气情况
  if (response.generalSituation) {
    parts.push(`一般天气情况：\n${response.generalSituation}`);
  }

  // 添加热带气旋信息
  if (response.tcInfo) {
    parts.push(`热带气旋信息：\n${response.tcInfo}`);
  }

  // 添加火险警告
  if (response.fireDangerWarning) {
    parts.push(`火险警告：\n${response.fireDangerWarning}`);
  }

  // 添加预报时段
  if (response.forecastPeriod) {
    parts.push(`预报时段：\n${response.forecastPeriod}`);
  }

  // 添加天气预报
  if (response.forecastDesc) {
    parts.push(`天气预报：\n${response.forecastDesc}`);
  }

  // 添加展望
  if (response.outlook) {
    parts.push(`展望：\n${response.outlook}`);
  }

  // 添加更新时间
  if (response.updateTime) {
    parts.push(`更新时间：\n${response.updateTime}`);
  }

  // 使用 '---' 连接所有部分
  return parts.filter(Boolean).join('\n---\n');
}
