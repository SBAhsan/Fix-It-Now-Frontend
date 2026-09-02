export const api = async (pathURL: string, options: RequestInit) => {
  try {
    const { headers, ...rest } = options;

    console.log(`The requested path: ${process.env.API_URL}${pathURL}`);

    const res = await fetch(`${process.env.API_URL}${pathURL}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...rest,
    });

    // if(!res.ok) {
    //     return {
    //         success: false,
    //         message: "Invalid login credentials"
    //     }
    // }

    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      console.log("Real backend error:", res.status, errBody);
      return {
        success: false,
        message: errBody?.message ?? "Invalid login credentials",
      };
    }

    const resData = await res.json();

    return {
      success: true,
      data: resData.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server Error",
      error: error,
    };
  }
};
