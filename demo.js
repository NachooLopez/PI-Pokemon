const getApiData = () => {
  return axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    .then((r) => r.data)
    .then((d) =>
      d.map((e) => {
        return {
          name: e.name,
          id: e.id,
          image: e.image.url,
          temperament: e.temperament,
          weight: e.weight.metric,
          height: e.height.metric,
          life_span: e.life_span,
        };
      })
    );
};
