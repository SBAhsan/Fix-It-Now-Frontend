

export const api = async (pathURL: string, options : RequestInit) => {
    try {

        const {headers, ...rest} = options;

        const res = await fetch(`${process.env.API_URL}${pathURL}`, {
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            ...rest
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