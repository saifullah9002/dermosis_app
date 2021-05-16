
/**
 * Delete item from array by value
 * @param {array[]} array
 * @param {object} element
 * @returns {array[]}
 */
const remove = (array, element) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === element) {
            array.splice(i, 1);
        }
    }

    return array;
};

module.exports = { remove };
