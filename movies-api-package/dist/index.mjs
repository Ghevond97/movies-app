var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
function fetchData(apiKey, signal) {
  return __async(this, null, function* () {
    const response = yield fetch(
      `
  https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
      { signal }
    );
    const data = yield response.json();
    return data;
  });
}
function fetchMoviesByKeyword(apiKey, signal, keyWord) {
  return __async(this, null, function* () {
    const response = yield fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${keyWord}&page=${1}&include_adult=false`,
      { signal }
    );
    const data = yield response.json();
    return data;
  });
}
export {
  fetchData,
  fetchMoviesByKeyword
};
//# sourceMappingURL=index.mjs.map