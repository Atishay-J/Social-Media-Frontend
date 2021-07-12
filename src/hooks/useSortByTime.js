const useSortByTime = (data) => {
  console.log("Data in Sort By Time ", data);

  const sortedData = data
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return sortedData;
};
export default useSortByTime;
