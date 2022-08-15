function formatDate(databaseDate){
    if( typeof databaseDate == 'string'){
        const date = databaseDate.slice(0,10);
        const arr = date.split('-');
        return arr[2]+'/'+arr[1]+'/'+arr[0];
    }
};

export default formatDate;