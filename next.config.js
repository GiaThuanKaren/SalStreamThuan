/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
// module.exports = {
//   images: {
//     domains: ['image.tmdb.org/t/p'],

//   },
// }
module.exports = {
  images: {
    domains: ['image.tmdb.org']
  }

}
module.exports = nextConfig
