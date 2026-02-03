import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// VEHICLE LOOKUP API - Scrapes biluppgifter.se
// =============================================================================

async function scrapeVehicleData(regNumber: string) {
    const cleanReg = regNumber.toUpperCase().replace(/\s/g, '').toLowerCase();
    const url = `https://biluppgifter.se/fordon/${cleanReg}`;

    console.log(`Fetching vehicle data from: ${url}`);

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            console.error(`Biluppgifter returned status: ${response.status}`);
            return null;
        }

        const html = await response.text();

        // Parse the HTML to extract vehicle data
        const vehicleData = parseVehicleHtml(html);

        if (!vehicleData.make && !vehicleData.model) {
            console.error('Could not parse vehicle data from HTML');
            return null;
        }

        return vehicleData;

    } catch (error) {
        console.error('Scrape error:', error);
        return null;
    }
}

function parseVehicleHtml(html: string): { make: string; model: string; year: string; color: string; fuel: string } {
    const data = {
        make: '',
        model: '',
        year: '',
        color: '',
        fuel: '',
    };

    // Try multiple patterns to extract data

    // Pattern 1: Look for the vehicle title (usually contains make and model)
    // Format: "BMW M4 Competition 2023" or similar in <h1> or title
    const titleMatch = html.match(/<h1[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)</i) ||
        html.match(/<title>([^<|]+)/i);

    if (titleMatch) {
        const titleText = titleMatch[1].trim();
        // Extract year if present (4 digits)
        const yearFromTitle = titleText.match(/\b(19|20)\d{2}\b/);
        if (yearFromTitle) {
            data.year = yearFromTitle[0];
        }
    }

    // Pattern 2: Look for structured data in the page
    // Biluppgifter often uses data-* attributes or specific class names

    // Look for "Märke" / "Fabrikat"
    const makePatterns = [
        /Märke<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /Fabrikat<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /"brand"[^>]*>([^<]+)</i,
        /itemprop="brand"[^>]*>([^<]+)</i,
        /data-make="([^"]+)"/i,
        /<span[^>]*class="[^"]*make[^"]*"[^>]*>([^<]+)</i,
    ];

    for (const pattern of makePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
            data.make = match[1].trim();
            break;
        }
    }

    // Look for "Modell" / "Handelsbenämning"
    const modelPatterns = [
        /Modell<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /Handelsbenämning<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /"model"[^>]*>([^<]+)</i,
        /itemprop="model"[^>]*>([^<]+)</i,
        /data-model="([^"]+)"/i,
        /<span[^>]*class="[^"]*model[^"]*"[^>]*>([^<]+)</i,
    ];

    for (const pattern of modelPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
            data.model = match[1].trim();
            break;
        }
    }

    // Look for "Årsmodell"
    const yearPatterns = [
        /Årsmodell<\/[^>]+>\s*<[^>]+>(\d{4})/i,
        /Tillverkningsår<\/[^>]+>\s*<[^>]+>(\d{4})/i,
        /data-year="(\d{4})"/i,
        /"modelYear"[^>]*>(\d{4})/i,
    ];

    for (const pattern of yearPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
            data.year = match[1].trim();
            break;
        }
    }

    // Look for color
    const colorPatterns = [
        /Färg<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /Karossfärg<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /data-color="([^"]+)"/i,
    ];

    for (const pattern of colorPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
            data.color = match[1].trim();
            break;
        }
    }

    // Look for fuel type
    const fuelPatterns = [
        /Drivmedel<\/[^>]+>\s*<[^>]+>([^<]+)/i,
        /Bränsle<\/[^>]+>\s*<[^>]+>([^<]+)/i,
    ];

    for (const pattern of fuelPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
            data.fuel = match[1].trim();
            break;
        }
    }

    // Fallback: Try to extract from JSON-LD structured data
    const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (jsonLdMatch) {
        try {
            const jsonData = JSON.parse(jsonLdMatch[1]);
            if (jsonData['@type'] === 'Car' || jsonData['@type'] === 'Vehicle') {
                data.make = data.make || jsonData.brand?.name || jsonData.manufacturer?.name || '';
                data.model = data.model || jsonData.model || jsonData.name || '';
                data.year = data.year || jsonData.modelDate || jsonData.productionDate || '';
                data.color = data.color || jsonData.color || '';
            }
        } catch (e) {
            // JSON parse failed, ignore
        }
    }

    // Additional fallback: Look for common patterns in vehicle info tables
    const tableRowMatch = html.match(/<tr[^>]*>[\s\S]*?<td[^>]*>([^<]*(?:Märke|Fabrikat)[^<]*)<\/td>[\s\S]*?<td[^>]*>([^<]+)<\/td>/gi);
    if (tableRowMatch && !data.make) {
        for (const row of tableRowMatch) {
            if (row.toLowerCase().includes('märke') || row.toLowerCase().includes('fabrikat')) {
                const valueMatch = row.match(/<td[^>]*>([^<]+)<\/td>\s*$/i);
                if (valueMatch) data.make = valueMatch[1].trim();
            }
        }
    }

    return data;
}

// Demo fallback data
const DEMO_VEHICLES: Record<string, { make: string; model: string; year: string; color?: string }> = {
    'PPZ54A': { make: 'BMW', model: 'M4 Competition', year: '2023', color: 'Svart' },
    'ABC123': { make: 'Volvo', model: 'XC90 T8', year: '2024', color: 'Vit' },
    'XYZ789': { make: 'Porsche', model: '911 Carrera S', year: '2022', color: 'GT Silver' },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const regNumber = searchParams.get('reg');

    if (!regNumber) {
        return NextResponse.json(
            { error: 'Registreringsnummer krävs' },
            { status: 400 }
        );
    }

    // Validate Swedish registration number format (ABC123 or ABC12A)
    const cleanReg = regNumber.toUpperCase().replace(/\s/g, '');
    const regPattern = /^[A-Z]{3}[0-9]{2}[A-Z0-9]$/;

    if (!regPattern.test(cleanReg)) {
        return NextResponse.json(
            { error: 'Ogiltigt format. Använd format: ABC123' },
            { status: 400 }
        );
    }

    // Try to scrape biluppgifter.se
    const scrapedData = await scrapeVehicleData(cleanReg);

    if (scrapedData && (scrapedData.make || scrapedData.model)) {
        return NextResponse.json({
            success: true,
            source: 'biluppgifter.se',
            data: {
                regNumber: cleanReg,
                make: scrapedData.make,
                model: scrapedData.model,
                year: scrapedData.year,
                color: scrapedData.color,
                fuel: scrapedData.fuel,
            }
        });
    }

    // Fallback to demo data
    const demoVehicle = DEMO_VEHICLES[cleanReg];
    if (demoVehicle) {
        return NextResponse.json({
            success: true,
            source: 'demo',
            demo: true,
            data: {
                regNumber: cleanReg,
                ...demoVehicle,
            }
        });
    }

    return NextResponse.json(
        { error: 'Kunde inte hämta fordonsdata. Kontrollera regnumret.' },
        { status: 404 }
    );
}
