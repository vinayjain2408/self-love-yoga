import { getAuthReq } from './apiHandlers';

export const fetchPoolData = async (
  poolType,
  durationInMinutes,
  setPoolState,
  setIsFetching,
) => {
  const localTime = new Date();
  const gmtTimeBefore15Min = new Date(localTime.getTime() - 15 * 60000);
  const gmtEndTime = new Date(
    localTime.getTime() + durationInMinutes * 60000 + 15 * 60000,
  );
  // setIsFetching(true);
  try {
    const response = await getAuthReq(
      `/pools/all?poolType=${poolType}&startTime=${gmtTimeBefore15Min.toISOString()}&endTime=${gmtEndTime.toISOString()}`,
    );

    if (response?.status) {
      const now = new Date();
      const currentLocalDate = now.toISOString().split('T')[0];

      const filteredData = response.data
        .map((item) => ({
          ...item,
          localSlotStart: new Date(item.slotStart),
        }))
        .filter(
          (item) =>
            item.localSlotStart.toISOString().split('T')[0] ===
            currentLocalDate,
        );

      setPoolState(filteredData);
    } else {
      console.log('Error in All API', response?.error);
    }
  } catch (e) {
    console.error('Error fetching history:', e);
  } finally {
    setIsFetching(false);
  }
};
