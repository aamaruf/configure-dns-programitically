require('dotenv').config();
const axios = require('axios');

async function createCnameRecord() {
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const cnameContent = process.env.CNAME_CONTENT;
    const subdomainString = 'xyz';
    
    const cnameRecordData = {
        type: 'CNAME', // CNAME record type
        name: `${subdomainString}.${process.env.DOMAIN}`, // Subdomain for CDN
        content: cnameContent, // Target of the CNAME
        ttl: 3600, // Time to live in seconds
        proxied: true // Use Cloudflare proxy if desired
    };

    try {
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
            cnameRecordData,
            {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('CNAME record created:', response.data);
    } catch (error) {
        console.error('Error creating CNAME record:', error.response.data);
    }
}

createCnameRecord();
