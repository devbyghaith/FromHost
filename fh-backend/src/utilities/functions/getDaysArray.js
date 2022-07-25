module.exports = function(start, end) {
    for(var array=[], date=new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)){
        array.push(new Date(date));
    };

    return array;
};