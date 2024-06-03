import { firstValueFrom } from 'rxjs';

export async function getCoordinates(
  address: string,
  httpService,
): Promise<any> {
  const geoapifyApiKey = process.env.GEOAPIFYAPIKEY;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`;

  try {
    const response = await firstValueFrom(httpService.get(url));
    const data = response['data'];
    const features = data['features'][0];
    return features['geometry']['coordinates'];
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error('Error fetching coordinates');
  }
}
