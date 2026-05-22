import { DateFormatProps, TimeFormatProps } from "@/src/types/formatters"

export function formatDate({date, dateTimeFormat, dayFormat, monthFormat}: DateFormatProps) {
    return new Intl.DateTimeFormat(dateTimeFormat, {
        day: dayFormat,
        month: monthFormat
    }).format(date)
}

export function formatTimestamp({time, dateTimeFormat, hourFormat, minuteFormat}: TimeFormatProps)
{
    return new Intl.DateTimeFormat(dateTimeFormat,
    {
        hour: hourFormat,
        minute: minuteFormat
    })
    .format(time)
}