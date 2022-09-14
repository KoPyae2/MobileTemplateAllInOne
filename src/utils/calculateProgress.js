export function calculateProgress(a, b)  {
      let x = (a / b) * 100;
      if (x >= 100) {
        x = 100;
      }
      if (x % 1 != 0) {
        return x.toFixed(2);
      } else {
        return x;
      }
    };