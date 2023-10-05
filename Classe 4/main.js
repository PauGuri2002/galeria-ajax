function createCalculator() {
    let c = {
        a: 0,
        b: 0,
        read: () => {
            a = parseFloat(prompt("Enter first number: "));
            b = parseFloat(prompt("Enter second number: "));
        },
        sum: () => {
            return a + b;
        },
        div: () => {
            return (b == 0) ? "Cannot divide by 0" : a / b;
        }
    }

    return c;
}

let calculator = createCalculator();
calculator.read();
alert("The sum is: " + calculator.sum());
alert("The division is: " + calculator.div());