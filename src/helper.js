export const prefix = "https://backend.gronthik.com/public/api/";

export function breakArrayIntoGroups(data, maxPerGroup) {
    var groups = [];
    for (var index = 0; index < data.length; index += maxPerGroup) {
        groups.push(data.slice(index, index + maxPerGroup));
    }
    return groups;
}

export function getNewPrice(price, discount) {
    let selling_price = price - (price * (discount / 100))
    return parseInt(selling_price);
}
