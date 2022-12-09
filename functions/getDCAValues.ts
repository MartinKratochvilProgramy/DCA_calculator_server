export default function getDCAValues(
  relativeChange: number[], 
  startAmount: number, 
  incrementAmount: number, 
): number[] {

    const DCAValues: number[] = [startAmount];
  
    for (let i = 0; i < relativeChange.length; i++) {
      DCAValues[DCAValues.length - 1] += incrementAmount;
      
      DCAValues.push(relativeChange[i] * DCAValues[DCAValues.length - 1]);
    }
    
    return DCAValues;
  }

