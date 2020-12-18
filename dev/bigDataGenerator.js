const generateData = (limit = 1000) => {
  const data = [];
  for(let i = 1; i <= limit; i++) {
    const group = i % 2 === 0 ? 'tr' : 'ts'
    data.push(
      {
        "id": i,
        "name": `Item index ${i}`,
        "timezone":"America/New_York",
        "platform":"native",
        "created_at":"2020-01-23T10:18:24.610Z",
        "updated_at":"2020-01-23T10:18:24.610Z",
        "uniqueName":"RevContent",
        group
      }
    );
  }
  return data;
}

export { generateData }