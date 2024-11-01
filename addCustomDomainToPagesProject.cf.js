require('dotenv').config();
const axios = require('axios');

async function addCustomDomainToPages(subdomain) {
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const projectName = process.env.CLOUDFLARE_PROJECT_NAME;

    try {
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`,
            { name: subdomain },
            {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Custom domain ${subdomain} added successfully:`, response.data);
    } catch (error) {
        console.error('Error adding custom domain:', error.response ? error.response.data : error.message);
    }
}

// Call the function with the subdomain you want to add
addCustomDomainToPages('your-subdomain.yourdomain.com');
