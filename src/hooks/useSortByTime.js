const useSortByTime = (data) => {
  let sortedData = [];

  if (data) {
    sortedData = data
      ?.slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return sortedData;
  }
  return sortedData;
};
export default useSortByTime;
