export const fetchFromAPI = async (url) => {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    // Using CORS proxy to bypass CORS restrictions in development
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = 'https://www.googleapis.com/youtube/v3';
    const fullUrl = `${corsProxy}${baseUrl}/${url}&key=${apiKey}`;
    
    console.log('=== API Request ===');
    console.log('URL:', url);
    console.log('Full Request:', fullUrl.replace(apiKey, '***'));
    console.log('API Key:', apiKey?.substring(0, 10) + '***');
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error('❌ API Error - Status:', response.status);
      const errorData = await response.json().catch(() => ({}));
      console.error('Error Response:', errorData);
      
      // Check for quota errors
      if (errorData.error?.errors?.[0]?.reason === 'quotaExceeded') {
        console.error('⚠️ QUOTA EXCEEDED - Free tier limit reached.');
        throw new Error('API Quota Exceeded - Free tier limit reached');
      }
      
      throw new Error(`API returned status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    console.log('=== API Response ===');
    console.log('Status:', response.status);
    console.log('Full Response:', data);
    console.log('Response Keys:', Object.keys(data));
    
    if (data.items && data.items.length > 0) {
      console.log('✅ Items count:', data.items.length);
      console.log('First item structure:', Object.keys(data.items[0]));
    } else {
      console.warn('⚠️ No items in response. Full data:', JSON.stringify(data, null, 2));
    }
    
    return data;
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
    return { items: [] };
  }
};