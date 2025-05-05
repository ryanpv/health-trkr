export const fetchQuests = async(accessToken: string) => {
  try {
    const response = await fetch(`${ process.env.EXPO_PUBLIC_DEV_SERVER }/quests`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ accessToken }`,
        "Content-type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch requests")
    }

    return response.json();
  } catch (error: unknown) {
    console.log("fetchQuests error: ", error)
  }
}