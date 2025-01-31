import dayjs from 'dayjs';

export function formatDate(date: Date) {
  return dayjs(date).format('YYYY년 MM월 DD일');
}
