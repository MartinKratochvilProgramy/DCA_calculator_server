export default function getDCAValues(
  relativeChange: number[],
  startAmount: number,
  incrementAmount: number,
): number[] {

  const DCAValues: number[] = [startAmount];

  for (let i = 0; i < relativeChange.length; i++) {
    if (i > 0) {
      DCAValues[DCAValues.length - 1] += incrementAmount;
    }

    DCAValues.push(parseFloat((relativeChange[i] * DCAValues[DCAValues.length - 1]).toFixed(3)));
  }

  return DCAValues;
}

