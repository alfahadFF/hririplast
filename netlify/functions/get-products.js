exports.handler = async function(event, context) {
    // رابط جوجل شيت المخفي في جهة السيرفر
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwFLfWB4sR675G4UUS9AsBfONkYVSxo9FPHnNOtDvvCVfEB1FS8rlID238c1CKm9hROq67t5_qjFdG/pub?gid=94108888&single=true&output=csv';

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
                'Cache-Control': 'public, max-age=300, s-maxage=300' // تخزين مؤقت لمدة 5 دقائق لتحسين السرعة
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
