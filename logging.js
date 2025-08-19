export async function Log(logId, stack, level, packageName, message) {
    const logData = {
        logId, 
        stack, // Function or call stack
        level, // INFO | WARN | ERROR | DEBUG
        packageName, // Module/feature name
        message, // Log description
        timestamp: new Date().toISOString() // optional
    };

    try {
        // API call to your logging server / test endpoint
        await fetch("http://20.244.56.144/evaluation-service/log",{
            method: "POST",
            headers: { "Content-Type": "application/json" ,
                "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW1hbHNhbmppYmFuaTEwQGdtYWlsLmNvbSIsImV4cCI6MTc1NTU4MzQ3MCwiaWF0IjoxNzU1NTgyNTcwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzk2M2U3NjQtMmI0My00NGY3LWJjYmYtNzM3YjNiODE3YTA2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FuamliYW5pIHNhbWFsIiwic3ViIjoiMDA5MWYwYjQtYTFlZS00ZWE4LTgyNjYtMmI2N2YyZjdjOTQzIn0sImVtYWlsIjoic2FtYWxzYW5qaWJhbmkxMEBnbWFpbC5jb20iLCJuYW1lIjoic2FuamliYW5pIHNhbWFsIiwicm9sbE5vIjoiMTE2MDAzMjIwNTAiLCJhY2Nlc3NDb2RlIjoiVXdWZkp6IiwiY2xpZW50SUQiOiIwMDkxZjBiNC1hMWVlLTRlYTgtODI2Ni0yYjY3ZjJmN2M5NDMiLCJjbGllbnRTZWNyZXQiOiJVa0FuRXlUUXJQRG1RZGZmIn0.9AdoZBYhtqY7lbSKm6fTeq8g7yWaE3dM8-IqHiXCtyU"
            },
            body: JSON.stringify(logData),
        });

        console.log("Log sent:", logData);
    } catch (error) {
        console.error("Failed to send log:", error);
    }
}


