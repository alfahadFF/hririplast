exports.handler = async function(event, context) {
    // قراءة رابط الشيت من متغير البيئة المسجل في Netlify
    const GOOGLE_SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;

    // التحقق من وجود المتغير لتجنب الأخطاء
    if (!GOOGLE_SHEET_CSV_URL) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Environment variable GOOGLE_SHEET_CSV_URL is not configured.' })
        };
    }

    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to fetch data from source' })
            };
        }

        const csvData = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=300, s-maxage=300' // تخزين مؤقت لمدة 5 دقائق
            },
            body: csvData
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
