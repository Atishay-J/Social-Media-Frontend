const useSortByTime = (data) => {
  const sortedData = data
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return sortedData;
};
export default useSortByTime;
