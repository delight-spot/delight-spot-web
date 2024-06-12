function translateKindMenu(word?: string) {
  if (!word) return;
  const dictionary: Record<string, string> = {
    ect: '기타',
    cafe: '카페',
    food: '상점',
  };

  return dictionary[word];
}

function translateRatingTitle(word?: string) {
  if (!word) return;
  const obj: Record<string, string> = {
    taste_rating: '맛',
    atmosphere_rating: '분위기',
    kindness_rating: '친절함',
    clean_rating: '깔끔함',
    parking_rating: '주차 공간',
    restroom_rating: '화장실',
  };

  return obj[word];
}

export { translateKindMenu, translateRatingTitle };
