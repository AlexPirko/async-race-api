export function randomizeColor(): string {
    const colorCharStr = '0123456789ABCDEF';
    const colorLength = 6;
    let color = '';

    for (let i = 0; i < colorLength; i++) {
        color += colorCharStr[Math.floor(Math.random() * colorCharStr.length)];
    }

    return color;
}
