//NOTE: First method: recursive
const sum_to_n_a = (n) => {
  if (n <= 1) return n;
  return n + sum_to_n_a(n - 1);
};

//NOTE: Second method: while loop
const sum_to_n_b = (n) => {
  let result = 0;
  while (n > 0) {
    result += n;
    n -= 1;
  }
  return result;
};

//NOTE: Third method: math formula
const sum_to_n_c = (n) => {
  return (n * (n + 1)) / 2;
};
