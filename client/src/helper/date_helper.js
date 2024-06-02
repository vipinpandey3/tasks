import dayjs from 'dayjs';

export function FormateDate(dateValue) {
    const formattedDate = dateValue.format('YYYY-MM-DD HH:mm:ss');
    return formattedDate
}

export function getCurrentDate() {
    return dayjs().format('YYYY-MM-DD')

}
