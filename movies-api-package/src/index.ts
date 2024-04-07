export function add(a: number, b: number): number {
  return a + b;
}

console.log(add(3, 5)); //output: 8

// export async function fetchData(apiKey: string): Promise<any> {
//   const response = await fetch(
//     `https://api.example.com/data?api_key=${apiKey}`
//   );
//   const data = await response.json();
//   return data;
// }
