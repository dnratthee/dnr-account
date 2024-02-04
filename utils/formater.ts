const number = new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
});

let plusDate = function (date, d) {
    return new Date(date.setDate(date.getDate() + d));
};

let phone = function (n) {
    if (n.length !== 0) {
        if (n.length === 10 || n.length === 12) {
            var cleaned = ('' + n).replace(/\D/g, '')
            n = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            n = n[1] + '-' + n[2] + '-' + n[3]
        } else if (n.length === 9 || n.length === 11) {
            var cleaned = ('' + n).replace(/\D/g, '')
            n = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/)
            n = n[1] + '-' + n[2] + '-' + n[3]
        }
    }
    return n
}

export { number, plusDate, phone }

