const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '55cb2a422e0d2201ce94253c5310bc01',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;