const generateData = (limit = 1000, offset = 0, suffix = '') => {
  const data = [];
  for(let i = offset + 1; i <= limit + offset; i++) {
    const group = i % 2 === 0 ? 'tr' : 'ts'
    const id = `${i}${suffix ? `-${suffix}` : ''}`;
    data.push(
      {
        "id": id,
        "name": `Item index ${id}`,
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