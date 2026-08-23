export const api = async (pathURL: string, options) => {
    try {
        const res = await fetch(`${process.env.API_URL}${pathURL}`, {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        });

        if(!res.ok) {
            return {
                success: false,
                message: "Invalid login credentials"
            }
        }

        const resData = await res.json();

        return {
            success: true,
            data: resData.data
        }
    } catch (error) {
        return {
            success: false,
            message: "Server Error",
            error: error
        }
    }
}