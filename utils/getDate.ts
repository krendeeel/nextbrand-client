export const getDate = (date: Date) => {
    const day = (new Date(date).getDate() >= 10) ? new Date(date).getDate() : `0${new Date(date).getDate()}`;
    const month = ((new Date(date).getMonth() + 1) >= 10) ? new Date(date).getMonth() + 1 : `0${new Date(date).getMonth() + 1}`;
    const year = new Date(date).getFullYear();
    const min = (new Date(date).getMinutes() >= 10) ? new Date(date).getMinutes() : `0${new Date(date).getMinutes()}`;
    const hours = (new Date(date).getHours() >= 10) ? new Date(date).getHours() : `0${new Date(date).getHours()}`;
    return `${hours}:${min} - ${day}.${month}.${year}`;
};

