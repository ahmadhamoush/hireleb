/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URL,
    CLOUD_NAME: process.env.CLOUD,
    API_KEY: process.env.CLOUD_API,
    API_SECRET: process.env.CLOUD_SECRET,
    AUTH_SECRET: process.env.SECRET_AUTH
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'media.istockphoto.com',
      'cloudcfo.ph',
      'img.freepik.com',
      'entrepreneurhandbook.co.uk',
      'www.zambianguardian.com',
      'us.123rf.com',
      'global-uploads.webflow.com',
      'www.forbes.com',
      'www.elegantthemes.com',
      'assets-global.website-files.com',
      'www.techrepublic.com',
      'www.mend.io',
      'www.buildingsiot.com',
      'www.xpand-it.com',
      'project-management.com',
      'leverageedublog.s3.ap-south-1.amazonaws.com',
      'encrypted-tbn0.gstatic.com',
      'coodesh.com',
      'builtin.com',
      'eddy.com',
      'd3kqdc25i4tl0t.cloudfront.net',
      'apacentrepreneur.com',
      'www.revechat.com',
      'www.siliconrepublic.com',
      'www.legalzoom.com',
      'dme.studio',
      'www.science.org',
      'e0.pxfuel.com',
      'greatcontent.com',
      'thumbs.dreamstime.com',
      'ahaslides.com',
      'www.rappler.com',
      'assets.entrepreneur.com',
      'languageanimated.com',
      'bootestech.in',
      'codedesign.org',
      'sloanreview.mit.edu',
      'www.clippingworld.com',
      '99designs-blog.imgix.net',
      'www.synergostech.com',
      'i2.wp.com',
      'blog.qbixanalytics.com',
      'www.edubridgeindia.com',
      'dynamics.folio3.com',
      'cdn.elearningindustry.com',
      'quickbooks.intuit.com',
      'online.imt-pm.com',
      'www.projectmanager.com',
    ]
    ,
  },
}

module.exports = nextConfig
