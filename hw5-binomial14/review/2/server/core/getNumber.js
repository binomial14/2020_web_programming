let number;

const getNumber = (forceRestart = false) => {
    if (number === undefined || forceRestart)
        number = Math.floor(Math.random() * 100) + 1;
    return number;
}

export default getNumber;
