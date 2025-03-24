export async function GET() {
  return Response.json([
    { id: 1, name: "Cristiano Ronaldo", age: 39, position: "ST" },
    { id: 2, name: "Lionel Messi", age: 37, position: "CF" }
  ]);
}
