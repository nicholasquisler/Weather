export const capWords = (array) => {
    array.split(" ");
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i][0].toUpperCase() + array[i].substr(1) + " ";
    }
    return array;
}