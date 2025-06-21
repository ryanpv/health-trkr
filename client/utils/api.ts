export const fetchQuests = async(accessToken: string | undefined) => {
  try {
    const response = await fetch(`${ process.env.EXPO_PUBLIC_DEV_SERVER }/quests`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ accessToken }`      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch requests")
    }

    return response.json();
  } catch (error: unknown) {
    console.log("fetchQuests error: ", error)
  }
}

export const fetchRewards = async(accessToken: string | undefined) => {
  try {
    const response = await fetch(`${ process.env.EXPO_PUBLIC_DEV_SERVER }/rewards`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${ accessToken }`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user rewards.")
    }

    return response.json();
  } catch (error: unknown) {
    console.log("Unable to retrieve rewards: ", error)
  }
}