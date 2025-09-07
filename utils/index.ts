export async function fetchCars() {
    const headers = {
        'x-rapidapi-key': '977330b660msh3db84e92b13350ep1cff40jsnb4e0771c6bc5',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch ('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
        headers: headers,
    });

    const result = await response.json();

    return result;
}