import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const API_BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        return response;
      }
      
      // If not ok, read the error and throw
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    } catch (error) {
      console.error(`Attempt ${i + 1}/${retries} failed:`, error);
      lastError = error as Error;
      
      if (i < retries - 1) {
        await sleep(RETRY_DELAY_MS * (i + 1)); // Exponential backoff
      }
    }
  }
  
  throw lastError || new Error('All retry attempts failed');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('DATA_GOV_API_KEY');
    if (!apiKey) {
      throw new Error('DATA_GOV_API_KEY is not configured');
    }

    const url = new URL(req.url);
    const limit = url.searchParams.get('limit') || '100';
    const offset = url.searchParams.get('offset') || '0';
    const state = url.searchParams.get('state') || '';
    const district = url.searchParams.get('district') || '';

    // Build API URL with filters
    let apiUrl = `${API_BASE_URL}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`;
    
    if (state) {
      apiUrl += `&filters[state]=${encodeURIComponent(state)}`;
    }
    if (district) {
      apiUrl += `&filters[district]=${encodeURIComponent(district)}`;
    }

    console.log(`Fetching from Agmarknet API with limit=${limit}, offset=${offset}, state=${state}, district=${district}`);

    const response = await fetchWithRetry(apiUrl);
    const data = await response.json();
    
    console.log(`Fetched ${data.records?.length || 0} records, total: ${data.total}`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in agmarknet-proxy:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
