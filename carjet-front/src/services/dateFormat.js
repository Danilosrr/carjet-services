function formatDate(databaseDate){
    const newDate = new Date(`${databaseDate}`);
    const date = {
        day: newDate.getDay(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
        hour: newDate.getHours(),
        minute: newDate.getMinutes()
    };

    return `${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute}`
};

export default formatDate;