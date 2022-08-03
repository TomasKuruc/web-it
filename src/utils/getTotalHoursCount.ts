export const getTotalHoursCount = (array: number[]): number => {
    return array.reduce((partialSum, a) => partialSum + a, 0)
}