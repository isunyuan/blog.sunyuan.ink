import dayjs from 'dayjs'

export const FORMAT_DATE = 'YYYY/MM/DD' as const
export const FORMAT_YEAR = 'YYYY' as const

type DateFormatType = typeof FORMAT_DATE | typeof FORMAT_YEAR

/**
 * 日期格式化
 * @param date
 * @param format 格式化模板，默认 YYYY/MM/DD
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: dayjs.ConfigType, format: DateFormatType = FORMAT_DATE): string => {
	return dayjs(date).format(format)
}
