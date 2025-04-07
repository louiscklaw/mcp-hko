export function formaRhrreadtResponse(response) {
  let district_temperatures = [];

  for (let i = 0; i < response.temperature.data.length; i++) {
    let temp = response.temperature.data[i];
    district_temperatures.push(
      `place:${temp.place}\nvalue:${temp.value}\nunit:${temp.unit}\ndescription:district temperature`,
    );
  }

  let humidity_data = response.humidity.data[0];
  let humidity_text = `place:${humidity_data.place}\nvalue:${humidity_data.value}\nunit:${humidity_data.unit}\ndescription:overall humidity of hong kong`;

  let result = [
    district_temperatures.join('\n---\n').trim(),
    humidity_text,
  ].join('\n---\n');

  return result;
}
