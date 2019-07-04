export const isNTC = (phoneNumber: string) => {
    const number = phoneNumber.trim();
    if(number.startsWith("984") || number.startsWith("985") || number.startsWith("986")){
        return true;
    }
    return false;
}

export const isNCELL = (phoneNumber: string) => {
    const number = phoneNumber.trim();

    if(number.startsWith("980") || number.startsWith("981") || number.startsWith("982")){
        return true;
    }
    return false;
}

export const isSmartCell = (phoneNumber: string) => {
    const number = phoneNumber.trim();

    if(number.startsWith("961") || number.startsWith("980")){
        return true;
    }
    return false;
}

export const isUTL = (phoneNumber: string) => {
    const number = phoneNumber.trim();

    if(number.startsWith("972")){
        return true;
    }
    return false;
}