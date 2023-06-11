function validateBilletes(data) {
    let errors = {};

    if (data.totalBilletes20 % 20000 !== 0) errors.totalBilletes20 = "Cantidad incorrecta de 20";
    if (data.totalBilletes10 % 10000 !== 0) errors.totalBilletes10 = "Cantidad incorrecta de 10";
    if (data.totalBilletes5 % 5000 !== 0) errors.totalBilletes5 = "Cantidad incorrecta de 5";
    if (data.totalBilletes2 % 2000 !== 0) errors.totalBilletes2 = "Cantidad incorrecta de 2";
    if (data.totalBilletes1 % 1000 !== 0) errors.totalBilletes1 = "Cantidad incorrecta de 1";

    return errors;
}

export default validateBilletes;